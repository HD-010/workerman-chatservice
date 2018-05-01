<?php
/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 主逻辑
 * 主要是处理 onMessage onClose 三个方法
 */

use \GatewayWorker\Lib\Gateway;
require_once 'MySQL/MysqlDB.php';


/**
 * @author yx010
 *  会话时分主次
 *  发起聊天为次guest
 *  接收信息为主service
 */
class Events
{
    /**
     * 当客户端连上时触发
     * @param int $client_id
     */
    public static function onConnect($client_id)
    {
        $_SESSION['id'] = time();
        Gateway::sendToCurrentClient(json_encode(array(
            "type" => "welcome",
            "id" => $_SESSION['id'],
            "client_id" => $client_id,
            "message" => "欢迎使用易享服务"
        )));
    }
    
   /**
    * 当服务器接收到消息时，服务器需要将消息转发给消息中指定的服务方，
    * 这里需要对发送出去的消息作一次角色变换处理，将服务方与访客的id对调。
    * 因为在服务器接收到消息之前的服务方，在服务器将消息发送出去后变成了访客……
    * 
    * 注：
    * 当服务器接收到消息时，需要判断服务方是否在线，如果不在线，则将消息以留言存储到数据库，
    * 等到服务方上线时，服务方的客户端到服务器请求留言记录
    * 
    * @param int $client_id
    * @param string $message
    */
   public static function onMessage($client_id, $message)
   {
        // 获取客户端请求
        $message_data = json_decode($message, true);
        print_r($message_data); 
        if(!$message_data)
        {
            return ;
        }
        
        self::{'message'.ucfirst($message_data['type'])}($client_id,$message_data);
   }
   
   /**
    * 当用户断开连接时
    * @param integer $client_id 用户id
    */
   public static function onClose($client_id)
   {
       // 广播 xxx 退出了
       GateWay::sendToAll(json_encode(array('type'=>'closed', 'id'=>$client_id)));
   }
   
   /**
    * 用户登录成功uid绑定事件
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageLogin($client_id,$message_data){
       //访客id用于绑定访客客户端id,当服务客户端发送信息给访客时，以访客id为准
       $guestId = $message_data['guestId'];
       
       $serviceId = $message_data['serviceId'];
       
       //$message = '{"type":"login","uid":"xxxxx"}'
       Gateway::bindUid($client_id, $guestId);
       echo 'success bindUid' . $guestId . '\r\n';
   }
   
   /**
    * 更新用户
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageUpdate($client_id,$message_data){
       // 转播给所有用户
       Gateway::sendToAll(json_encode(
           array(
               'type'     => 'update',
               'id'       => $_SESSION['id'],
               'angle'    => $message_data["angle"]+0,
               'momentum' => $message_data["momentum"]+0,
               'x'        => $message_data["x"]+0,
               'y'        => $message_data["y"]+0,
               'life'     => 1,
               'name'     => isset($message_data['name']) ? $message_data['name'] : 'Guest.'.$_SESSION['id'],
               'authorized'  => false,
           )
           ));
       return;
   }
   
   /**
    * 发送广播
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageMessage($client_id,$message_data){
       // 向大家说
       $new_message = array(
           'type'=>'message',
           'id'  =>$_SESSION['id'],
           'message'=>"回复消息：".$message_data['message'],
           'date' => date('m/d H:m:s')
       );
       return Gateway::sendToAll(json_encode($new_message));
   }
    
   
   /**
    * 发送群聊消息
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageMessageGroup($client_id,$message_data){
       //向群成员说
       $new_message = array(
           'type'=>'messageGroup',
           'id'  =>$_SESSION['id'],
           'message'=>$message_data['message'],
       );
       return Gateway::sendToAll(json_encode($new_message));
   }
   
   /**
    * 向指定uid发送消息
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageMessagePrivate($client_id,$message_data){
       //向指定uid说,注：这里需要将guestId，serviceId的值互换
       $guestId = $message_data['guestId'];
       $serviceId = $message_data['serviceId'];
       $new_message = array(
           'type'=>'messageTo',
           'id'  =>$_SESSION['id'],
           'guestId' => $serviceId,
           'serviceId' => $guestId,
           'message'=>$message_data['message'],
           'date' => date('m/d H:i:s',time()),
       );
       
       //添加附加参数
       if(isset($message_data['addParams'])){
           $new_message['addParams'] = $message_data['addParams'];
       }
       
       //如果服务端在线，就将信息发送给服务端。如果不在线，就将信息以留言保存到数据库
       if(!Gateway::isUidOnline($serviceId)){
           self::saveAsLeavingmessage($message_data);
       }else{
           return Gateway::sendToUid($serviceId, json_encode($new_message));
           
       }
   }
   
   /**
    * 将客户端发来的数据保存到数据库
    * @param string $client_id
    * @param array $message_data
    */
   public static function saveAsLeavingmessage($message_data){
       /**
        * 表创建语句：
        * CREATE TABLE `ec_leavingmessage` (
          `id` bigint(13) unsigned NOT NULL AUTO_INCREMENT,
          `historyId` varchar(16) NOT NULL COMMENT '历史记录对象id',
          `guestId` varchar(11) NOT NULL COMMENT '访客id',
          `serviceId` varchar(11) NOT NULL COMMENT '服务方id',
          `message` varchar(255) NOT NULL COMMENT '消息内容',
          `sendTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIME
        STAMP COMMENT '消息发送时间',
          `typeh` enum('receive','send') NOT NULL COMMENT '消息类型是收到还是发送',
          `isLooked` tinyint(1) NOT NULL DEFAULT '0' COMMENT '消息是否查看',
          `saveToHistory` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否需要转存为历史记录',
          PRIMARY KEY (`id`),
          KEY `historyId` (`historyId`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='留言对象表，主要逻辑：留言被查看后按需要转存历史记录表'
        * @var unknown
        */
       
       $o = [
            "TABLE" => 'ec_leavingmessage',
            "FIELDS"=>['historyId','guestId','serviceId','message','typeh','saveToHistory'],
            'VALUES'=>[
                [
                    'ecshp_'.$message_data['guestId'],     //historyId
                    $message_data['serviceId'],
                    $message_data['guestId'],
                    $message_data['message'],
                    'receive',
                    '0',
                ],
            ],
        ];
        
        //$res = MysqlDB::db()->insertCommond($o)->showQuery();
        $res = MysqlDB::db()->insertCommond($o)->exec();
   }
   
   /**
    * 将客户端返回的数据保存到数据库
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageSaveToDB($client_id,$message_data){
       
       /**
        * 表创建语句：
        * CREATE TABLE `ec_leavingmessage` (
          `id` bigint(13) unsigned NOT NULL AUTO_INCREMENT,
          `historyId` varchar(16) NOT NULL COMMENT '历史记录对象id',
          `guestId` varchar(11) NOT NULL COMMENT '访客id',
          `serviceId` varchar(11) NOT NULL COMMENT '服务方id',
          `message` varchar(255) NOT NULL COMMENT '消息内容',
          `sendTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIME
        STAMP COMMENT '消息发送时间',
          `typeh` enum('receive','send') NOT NULL COMMENT '消息类型是收到还是发送',
          `isLooked` tinyint(1) NOT NULL DEFAULT '0' COMMENT '消息是否查看',
          `saveToHistory` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否需要转存为历史记录',
          PRIMARY KEY (`id`),
          KEY `historyId` (`historyId`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='留言对象表，主要逻辑：留言被查看后按需要转存历史记录表'
        * @var unknown
        */
       //print_r($message_data);
       $o = [
            "TABLE" => 'ec_leavingmessage',
            "FIELDS"=>['historyId','guestId','serviceId','message','typeh','saveToHistory'],
            'VALUES'=>[
                [
                    $message_data['historyId'],
                    $message_data['guestId'],
                    $message_data['serviceId'],
                    $message_data['message'],
                    $message_data['typeh'],
                    $message_data['saveToHistory'],
                ],
            ],
        ];
        
        //$res = MysqlDB::db()->insertCommond($o)->showQuery();
        $res = MysqlDB::db()->insertCommond($o)->exec();
   }
   
   /**
    * 获取服务器上留言记录数量
    * $message_data 的数据格式：
    * array(
            [guestId] =>
            [serviceId] => Array
                (
                    [0] => 69826
                    [1] => 5245456
                    [2] => 52525456
                    [3] => 5278856
                    [4] => 5245456
                    [5] => 525456
                    [6] => 52542456
                    [7] => 5259656
                )
        
            [type] => downLeavingMessage
            [typeh] => receive
            [historyId] => ('ecshp_69826,ecshp_5245456,ecshp_52525456,ecshp_5278856,ecsh
        p_5245456,ecshp_525456,ecshp_52542456,ecshp_5259656')
            [message] =>
            [saveToHistory] => 0

		)
    */
   public static function messageDownLeavingTotal($client_id,$message_data){
       //该数据限制登录用户下载
       if(!$message_data['guestId']) return;
       
       $message_data['historyId'] = str_replace(',',"','",$message_data['historyId']);
       $qObjC = [
           [
               "ec_leavingmessage" => [
                   'count(*) as total',
                   'historyId'
               ],
           ],
           "WHERE" => [
               'historyId in '.$message_data['historyId'],
               'isLooked=0',
           ],
           "GROUP_BY" => [
               'historyId',
           ],
           "ORDER_BY" => [
               'sendTime asc',
           ],
       ];
       //应该下载的总记录数
       $total = MysqlDB::db()->selectCommond($qObjC)->query()->fetchAll();
       
       //print_r($message_data);
       
       $new_message = array(
           'type'=>'leavingTotal',
           'id'  =>$_SESSION['id'],
           'message'=>$total
       );
       
       return Gateway::sendToClient($client_id, json_encode($new_message));
   }
   
   /**
    * 获取服务器上留言记录
    */
   public static function messageDownLeaving($client_id,$message_data){
       //该数据限制登录用户下载
       if(!$message_data['guestId']) return;
        
       $message_data['historyId'] = str_replace(',',"','",$message_data['historyId']);
       $qObjC = [
           [
               "ec_leavingmessage" => [
                   'historyId',
                   'guestId',
                   'serviceId',
                   'message',
                   'typeh',
                   'saveToHistory',
                   'sendTime'
               ],
           ],
           "WHERE" => [
               "historyId='".$message_data['historyId']."'",
               'isLooked=0',
               "guestId='".$message_data['guestId']."'"
           ],
           
           "ORDER_BY" => [
               'sendTime asc',
           ],
           "LIMIT" => '0,100'
       ];
       
       
       $data = MysqlDB::db()->selectCommond($qObjC)->query()->fetchAll();
       
       //应该下载的总记录数，如果太大需要分批下载
       $new_message = array(
           'serviceId'=>$message_data['serviceId'],
           'historyId'=>$message_data['historyId'],
           'type'=>'leavingDown',
           'id'  =>$_SESSION['id'],
           'message'=>$data
       );
       
       //是这权限配置项，标识当前访客有没有保存历史的权限。如果没有，从数据库读取数据后，数据据会被删除。
       //如果有，则数会被转存到历史消息表
       $saveToHistory = $message_data['saveToHistory'];
       if(!$saveToHistory){
           $qObj = [
                "MAIN_TABLE" => 'ec_leavingmessage',     //tableName',
                "FETCH_TABLE" => [      //受影响的表
                    'ec_leavingmessage',
                ],
                "WHERE" => [
                   "historyId='".$message_data['historyId']."'",
                   'isLooked=0',
                   "guestId='".$message_data['guestId']."'"
                ],
                "LIMIT" => '',
            ];
           MysqlDB::db()->deleteCommond($qObj)->exec();
       }
       
       
       //print_r($new_message);
       return Gateway::sendToClient($client_id, json_encode($new_message));
   }
   
   
}

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
       print_r($message);
        // 获取客户端请求
        $message_data = json_decode($message, true);
        
        if(!$message_data)
        {
            return ;
        }
        
        self::{'message'.ucfirst($message_data['type'])}($client_id,$message_data);
        
        
        
        /* switch($message_data['type'])
        {
            case 'login':
                print_r($message_data);
                
                //访客id用于绑定访客客户端id,当服务客户端发送信息给访客时，以访客id为准
                $guestId = $message_data['guestId'];
                
                $serviceId = $message_data['serviceId'];
                
                //$message = '{"type":"login","uid":"xxxxx"}'
                Gateway::bindUid($client_id, $guestId);
                break;
            
            // 更新用户
            case 'update':
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
            
            // 公众演讲
            case 'message':
                // 向大家说
                $new_message = array(
                    'type'=>'message', 
                    'id'  =>$_SESSION['id'],
                    'message'=>"回复消息：".$message_data['message'],
                    'date' => date('m/d H:m:s')
                );
                return Gateway::sendToAll(json_encode($new_message));
            //群聊
            case 'messageGroup':
                //向群成员说
                $new_message = array(
                    'type'=>'messageGroup',
                    'id'  =>$_SESSION['id'],
                    'message'=>$message_data['message'],
                );
                return Gateway::sendToAll(json_encode($new_message));
            
            //私聊  
            case 'messagePrivate':
                //向指定uid说,注：这里需要将guestId，serviceId的值互换
                $guestId = $message_data['guestId'];
                $serviceId = $message_data['serviceId'];
                $new_message = array(
                    'type'=>'messageTo', 
                    'id'  =>$_SESSION['id'],
                    'guestId' => $serviceId,
                    'serviceId' => $guestId,
                    'message'=>$message_data['message'],
                );
                return Gateway::sendToUid($serviceId, json_encode($new_message));
        } */
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
       print_r($message_data);
       
       //访客id用于绑定访客客户端id,当服务客户端发送信息给访客时，以访客id为准
       $guestId = $message_data['guestId'];
       
       $serviceId = $message_data['serviceId'];
       
       //$message = '{"type":"login","uid":"xxxxx"}'
       Gateway::bindUid($client_id, $guestId);
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
       );
       return Gateway::sendToUid($serviceId, json_encode($new_message));
   }
   
   /**
    * 将客户端返回的数据保存到数据库
    * @param string $client_id
    * @param array $message_data
    */
   public static function messageSaveToDB($client_id,$message_data){
       echo "消息已经保存到数据库\r\n";
       print_r($message_data);
   }
   
   
}

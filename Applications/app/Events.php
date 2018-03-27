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
    * 有消息时
    * @param int $client_id
    * @param string $message
    */
   public static function onMessage($client_id, $message)
   {
        // 获取客户端请求
        $message_data = json_decode($message, true);
        
        if(!$message_data)
        {
            return ;
        }
        
        switch($message_data['type'])
        {
            case 'login':
                //$message = '{"type":"login","uid":"xxxxx"}'
                Gateway::bindUid($client_id, $message_data['uid']);
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
                    'type'=>'message',
                    'id'  =>$_SESSION['id'],
                    'message'=>$message_data['message'],
                );
                return Gateway::sendToAll(json_encode($new_message));
            
            //私聊  
            case 'messagePrivate':
                //向指定uid说
                $guset_dlient_id = $message_data['guestClientId'];
                echo $guset_dlient_id;
                $new_message = array(
                    'type'=>'messageTo', 
                    'id'  =>$_SESSION['id'],
                    'message'=>$message_data['message'],
                );
                return Gateway::sendToClient($guset_dlient_id, json_encode($new_message));
        }
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
}

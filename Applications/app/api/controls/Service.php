<?php
/**
 * 操作名称以action开头
 */
class Service extends Control
{

    /**
     * 返回echat界面
     * 在返回的视图中加载有客户端所需要的js模块
     * 在main.js入口中实例化app对象
     * 
     */
    public function actionIndex(){
        $this->renderAjax('eChat');
    }
    
    /**
     * 接口说明：
     * 名称：在线服务系统接口
     * 描述：
     * js代码接入<script type="text/javascript" src="http://127.0.0.1:8383/api/service/online?client=69826&service=10000&token=58555"></script>
     * 时，返回变量$javascript中的js代码。
     * 在$javascript代码中定义了
     * 客户id(访客): echat_client,客户id为访客登录的uid,或者访客未登录时随机生成
     * 服务id(商家): echat_service,是商家在echat中注册成功获得的用户身份唯一标识
     * 
     * 当用户通过js请求时，返回
     */
    public function actionOnline(){
        //访问权限控制，token是接入商身份标识。如果验证失败，则取消连接，返回空。
        $token = App::$request->get('token');
        if($token != 58555) return;
        
        //客户id
        $clientId = App::$request->get('client');
        //服务id
        $serviceId = App::$request->get('service');
        
        $javascript = 
<<<JSCODE
        $(document).ready(function(){
            var echat_client = $clientId;
            var echat_service = $serviceId;
            
            if(!echat_client){
                console.log('访客id不存在');
                return null;
            }
            if(!echat_service){
                console.log('服务id不存在');
                return null;
            }
                
            //将客户id(访客) 和 服务id(商家)储存在本地，当webSocket服务连接成功时
            //向服务器发送 客户id(访客) 和 服务id(商家) 用于关联访客和商家的会话
            sessionStorage.setItem('echat_client',echat_client);
            sessionStorage.setItem('echat_service',echat_service);
            $.ajax({
                url:"http://127.0.0.1:8383/api/service/index",
                dataType : 'jsonp',
                jsonp : 'jsonpcallback',
                type : 'GET',
                success:function(result){
                    console.log(result)
                    $('body').append(result);
                },
            });
                
        });
JSCODE;
        echo $javascript;
    }
}
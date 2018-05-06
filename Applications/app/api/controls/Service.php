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
        
        //验证token
        //if($token != 58555) return;
        if(!App::model('User')->checkToken()) return;
        
        //客户id
        $clientId = App::$request->get('client');
        //服务id
        $serviceId = App::$request->get('service');
        
        $echat_sys_params = [
            'commodifyInfo' =>[
                //图片的宽高比例
                'min_scale' => App::$request->get('min_scale',0),
                'max_scale' => App::$request->get('max_scale',0),
                //定义图片的宽度
                'min_width' => App::$request->get('min_width',1),
                'max_width' => App::$request->get('max_width',1),
            ]
        ];
        $echat_sys_params_json = json_encode($echat_sys_params);
        
        $javascript = 
<<<JSCODE
        $(document).ready(function(){
            
            var echat_client = $clientId;
            var echat_service = $serviceId;
            var echat_sys_params = JSON.stringify($echat_sys_params_json);
            console.log(echat_sys_params);
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
            sessionStorage.setItem('echat_sys_params',echat_sys_params);    
            $.ajax({
                url:"http://47.93.201.12:8383/api/service/index",
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
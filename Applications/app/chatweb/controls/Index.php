<?php
//require(App::params('@root').'/chatweb/models/User.php');

class Index extends Control
{

    /**
     * 易service服务界面说明
     * 接口：http://www.doman.com/chatweb/index/index
     * 例：http://127.0.0.1:8383/chatweb/index/index
     * 工作流程：
     * 当访问到接口时，先作用户验证。
     * 如果用户是游客，则重定向到登录页面，要求他登录
     * 用户是已经登录，则显示 易service 服务界面
     * 
     * 关于用户登录流程
     * 用户点击“登录”按钮触发点击事件，异步通过接口进行用户身份验证（http://passport.e01.ren/?
     * r=openapi/login&uname=uname&pswd=pswd&Verification=Verification&token=token）
     * 验证成功后，再提交表单数据到当前操作
     */
    function actionIndex(){
        //用户受权验证,注册用户受权信息
        App::model('User')->regUI();
        
        //如果用户是游客，则重定向到登录页面，要求他登录
        if(App::$user->isGuest()) {
            App::redirect('/chatweb/sing/in');
            return;
        }
        
        //初始化用户信息
        $userInfo = App::model('User')->init();
        //向用户信息集合中添加token
        App::$user->setItem('token', App::$request->post('token'));
        //T::print_pre(App::$user->getItem());
        
        //获取好友分组信息
        $friendsGroup = App::model('Friends')->getGroup();
        //T::print_pre($friendsGroup);
        
        //获取好友列表信息
        $friendsList = App::model('Friends')->getFriends();
        //T::print_pre($friendsList);
        
        $data = [
            'userInfo'=>$userInfo,
            'friendsGroup'=>$friendsGroup,
            'friendsList'=>$friendsList,
        ];
        //用户已经登录，则显示 易service 服务界面
        $this->render('eChat',$data);
        
    }
    
}
<?php
require(App::params('@root').'/chatweb/models/User.php');
class Index extends Control
{

    /**
     * 操作名称以action开头
     */
    function actionIndex(){
        //用户受权验证
        if(App::$user->isGuest()){
            App::redirect('/chatweb/sing/in');
        }
        
        
        $this->render('eChat');
        
    }
}
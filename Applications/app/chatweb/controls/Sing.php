<?php

/**
 * @author yx010
 * 用户登录注册相关类
 */
class Sing extends Control{
    
    //用户登录
    public function actionIn(){
        $this->render('loginIn');
    }
    
    //用户注册
    public function actionUp(){
        $this->render('newReg');
    }
}
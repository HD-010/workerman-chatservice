<?php
require(App::params('@root').'/chatweb/models/User.php');
class Index extends Control
{

    /**
     * 操作名称以action开头
     */
    function actionIndex(){
        App::redirect('/chatweb/sing/in');
        
        //$m = App::model('Data')->rightData();
        //$this->renderJson($m);

        //$res = App::model('Data')->updateData();
        //$res = App::model('Data')->insertData();
        $this->render('eChat');
        
    }
}
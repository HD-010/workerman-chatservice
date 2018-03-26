<?php

require(App::params('@root').'/api/models/Data.php');
class Login extends Control
{
    
    /**
     * 操作名称以action开头 
     */
    function actionReg(){
        
        //$m = App::model('Data')->rightData();
        //$this->renderJson($m);
        
        //$res = App::model('Data')->updateData();
        //$res = App::model('Data')->insertData();
        $this->render('eChat');
    }
}

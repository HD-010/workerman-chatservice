<?php
require_once(App::params('@root').'/api/models/Data.php');
class Index extends Control
{

    /**
     * 操作名称以action开头
     */
    function actionIndex(){

        //$m = App::model('Data')->rightData();
        //$this->renderJson($m);

        //$res = App::model('Data')->updateData();
        //$res = App::model('Data')->insertData();
        $this->render('eChat');
        
    }
}
<?php

require(App::params('@root').'/api/models/Data.php');
class Login extends Control
{
    function reg(){
        //$m = App::model('Data')->rightData();
        //$this->renderJson($m);
        
        //$res = App::model('Data')->updateData();
        $res = App::model('Data')->insertData();
    }
}

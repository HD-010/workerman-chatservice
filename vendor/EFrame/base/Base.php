<?php
// namespace EFrame\Base;

// use \EFrame\Base\Route;
// use \EFrame\Base\View;
// use \EFrame\Base\Control;
// use \EFrame\Base\Model;
// use \EFrame\Base\Block;

/**
 * @author yx010
 *
 */
class base{
    /**
     * 实例化一个route对象
     * @$config array 配置对象
     * @return unknown
     */
    public static function route($defaultRout){
        //$path
        if(!class_exists('Route')){
            require_once('Route.php');
        }
        
        return (new Route($defaultRout))->parseRoute()->getRoute();
    }
    /**
     * 实例化一个route对象
     * @$uri string 请求资源的uri
     * @return unknown
     */
    public static function redirectRoute($uri){
        //$path
        if(!class_exists('Route')){
            require_once('Route.php');
        }
        
        return (new Route($uri))->redirectRoute($uri)->getRoute();
    }
    
    /**
     * 实例化一个request对象
     * @return Request
     */
    public static function request(){
        if(!class_exists('Request')){
            require_once('Request.php');
        }
        
        return new Request();
    }
    
    
    /**
     * 实例化一个view对象
     * @param unknown $viewName
     * @return unknown
     */
    public static function view(){
        //$path
        if(!class_exists('View')){
            require_once('View.php');
        }
        return new View();
    }
    /**
     * 实例化一个control对象
     * @param unknown $controlName
     * @return unknown
     */
    public static function control(){
        if(!class_exists('Control')){
            require_once('Control.php');
        }
        
        $conName = App::control();
        //获取控制器路径
        $controlPath = App::params('@root').'/'.App::module().'/controls/'.$conName.'.php';
        
        if(is_file($controlPath)){
            require_once($controlPath);
            $control = new $conName;
            return $control;
        }
        
    }
    /**
     * 实例化一个Model对象
     * @param unknown $modelName
     * @return unknown
     */
    public static function model(){
        if(!class_exists('Model')){
            require_once('Model.php');
        }
        return new Model();
    }
    /**
     * 实例化一个block对象
     * @param unknown $blockName
     * @return unknown
     */
    public static function block(){
        //$path
        if(!class_exists('Block')){
            require_once('Block.php');
        }
        return new Block();
    }
    
    public static function authorize(){
        if(!class_exists('Authorize')){
            require_once 'Authorize.php';
        }
        return new Authorize();
    }
    
    /**
     * 返回数据库连接对象
     * @param $configName string 数据库连接配置名称，如“db|db2"等，由config中db配置 的键名决定
     */
    public static function DB($configName){
        //连接数据库的配置
        $dbConfig = App::config('DBconfig.'.$configName);
        $dsn = trim($dbConfig['dsn']);
        
        //数据库类型
        $dbConfig['type'] = substr($dsn,0,strpos($dsn,':'));
        
        return self::{$dbConfig['type']}($dbConfig);
    }
    
    /**
     * 实例化mysql_pdo连接对象
     * @param unknown $dbConfig
     * @return unknown
     */
    public static function mysql($dbConfig){
        //数据库类型名称，如：mysql
        $DBModel = ucfirst($dbConfig['type']).'DB';
        if(!class_exists($DBModel)){
            require_once($DBModel.'.php');
        }
        
        return new $DBModel($dbConfig);
    }
    
    
    
}

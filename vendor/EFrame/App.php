<?php
// namespace EFrame;

// use \EFrame\Base\base;
// use \EFrame\Helper\T;

require_once('base/Base.php');
require_once('Helper/T.php');


class App{
    public static $config;
    public static $params;
    public static $route;
    public static $request;
    public static $view;
    public static $control;
    public static $model;
    public static $block;
    public static $db;
    
    public function __construct($config){
        $params = $config['params'];
        unset($config['params']);
        
        //将应用中的参数合并到系统参数中
        self::$params = array_merge(
            require('common/params.php'),
            $params
        );
        
        //将应用中的配置合并到系统配置中
        self::$config = array_merge(
            require('common/config.php'),
            $config
        );
        
        self::$route = Base::route(self::$config['defaultRout']);

        self::$request = Base::request();
    }
    
    /**
     * 返回当前请求的模型名称
     * @return string
     */
    public static function module(){
        return self::$route['module'];
    }
    
    
    /**
     * 根据模块名称返回模块对象
     * @param unknown $modelName
     * 使用说明：
     *  require(App::params('@root').'/api/models/Data.php');

        class Login extends Control
        {
            function reg(){
                $m = App::model('Data')->rightData();
                $this->renderJson($m);
            }
        }
     */
    public static function model($modelName){
        self::$model->init($modelName);
        return self::$model->$modelName;
    }
    
    /**
     * 返回当前请求的控制器名称
     * @return string
     */
    public static function control(){
        //控制器名大写
        return ucfirst(self::$route['control']);
    }
    
    /**
     * 返回当前请求的动作名称
     * @return string
     */
    public static function action(){
        return self::$route['action'];
    }
    
    
    /**
     * 返回参数名称对应的值
     * @name string 参数名称
     */
    public static function params($name=null){
        if($name){
            return T::arrayValue($name, self::$params,null);
        }
        return self::$params;
    }
    
    
    /**
     * 返回参数名称对应的值
     * @name string 参数名称
     */
    public static function config($name=null){
        if($name){
            return T::arrayValue($name, self::$config,null);
        }
        return self::$config;
    }
    
    /**
     * 返回请求对象，对象中包括get post
     * @return Request
     */
    public static function request(){
        return self::$request;    
    }
    
    
    /**
     * 返回数据库连接对象
     * @param $configName string 数据库连接配置名称，如“db|db2"等，由config中db配置 的键名决定
     * 默认为 ： 'db'
     */
    public static function DB($configName='db'){
        if(!is_object(self::$db->$configName)){
            self::$db->$configName = Base::DB($configName);
        }
        return self::$db->$configName;
    }
    
    
    public function run(){
        self::$model = Base::model();
        
        self::$control = Base::control();
        
        self::$control->{self::action()}();
        
        self::$block = Base::block();
        
        //self::$view = Base::view();
    }
    
}
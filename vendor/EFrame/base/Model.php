<?php
// namespace EFrame\Base;

/**
 * @author yx010
 * Model调用示例：
 * 在控制器中实例化Data模型并用调用updateData()方法：
 * require(App::params('@root').'/api/models/Data.php');
 * $res = App::model('Data')->updateData();
 */
class Model{
    
    
    /**
     * 初如化一个用户model
     * return 初始化的model实例
     */
    public function init($className){
        if(!is_object(App::$model->$className)){
            require_once($controlPath = App::params('@root').'/'.App::module().'/models/'.$className.'.php');
            //如果该model不存在，则 实例化 并返回
            return App::$model->$className = new $className();
        }
        return App::$model->$className;
    }
   
}
<?php
// namespace EFrame\Base;

class Model{
    
    
    /**
     * 初如化一个用户model
     * return 初始化的model实例
     */
    public function init($className){
        if(!is_object(App::$model->$className)){
            //如果该model不存在，则 实例化 并返回
            return App::$model->$className = new $className();
        }
        return App::$model->$className;
    }
   
}
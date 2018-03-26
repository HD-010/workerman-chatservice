<?php
// namespace EFrame\Base;

class View{
    private $viewPath;
    private $layoutPath;
    
    /**
     * @param unknown $fileName
     * @param unknown $data 传到小部件的数据
     */
    public function renderWidget($fileName,$data=null){
        $widgetPath = App::params('@root').'/'.App::module().'/widgets/'.$fileName.'.php';
        if(is_file($widgetPath)){
            require($widgetPath);
        }
    }
    
    /**
     * 引入视图内容 
     */
    public function contents(){
        if(is_file($this->viewPath)){
            require($this->viewPath);
        }
    }
    
    /**
     * @param unknown $fileName
     * @param unknown $data 传到视图的数据
     */
    public function render($fileName,$data=null){
        $viewPath = App::params('@root').'/'.App::module().'/views/'.App::control().'/'.$fileName.'.php';
        $this->viewPath = $viewPath;
        
        $layoutPath = App::params('@root').'/'.App::module().'/views/layout/main.php';
        $this->layoutPath = $layoutPath;
        
        if(is_file($this->layoutPath)){
            require($this->layoutPath);
        }
    }
}
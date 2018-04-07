<?php
// namespace EFrame\Base;

/**
 * @author yx010
 * 该 类被控制器继承
 */
class View{
    private $viewPath;
    private $layoutPath;
    private $data;
    
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
     * 在布局文件中引入视图内容 
     * 例：
     * $this->contents();
     */
    public function contents(){
        $data = $this->data;
        if(is_file($this->viewPath)){
            require($this->viewPath);
        }
    }
    
    /**
     * 该方法将视图内容返回到布局
     * @param unknown $fileName
     * @param unknown $data 传到视图的数据
     */
    public function render($fileName,$data=null){
        $this->data = $data;
        
        //这里申明视图文件路径，将后在布局文件中通过调用$this->contents()方法载入视图文件
        $viewPath = App::params('@root').'/'.App::module().'/views/'.App::control().'/'.$fileName.'.php';
        $this->viewPath = $viewPath;
        
        //这里申明布局文件路径
        $layoutPath = App::params('@root').'/'.App::module().'/views/layout/main.php';
        $this->layoutPath = $layoutPath;
        
        //这里载入布局文件
        if(is_file($this->layoutPath)){
            require($this->layoutPath);
        }
    }
    
    /**
     * 渲染一个 视图名 并且不使用布局。
     */
    public function renderPartial($fileName,$data=null){
        //这里申明视图文件路径
        $viewPath = App::params('@root').'/'.App::module().'/views/'.App::control().'/'.$fileName.'.php';
        $this->viewPath = $viewPath;
        
        //这里载入视图文件
        if(is_file($this->viewPath)){
            require($this->viewPath);
        }
    }
    
    /**
     * 渲染一个 视图名 并且不使用布局， 并注入所有注册的JS/CSS脚本和文件，通常使用在响应AJAX网页请求的情况下
     */
    public function renderAjax($fileName,$data=null){
        
        //这里申明视图文件路径
        $viewPath = App::params('@root').'/'.App::module().'/views/'.App::control().'/'.$fileName.'.php';
        $this->viewPath = $viewPath;
        
        //这里载入视图文件
        if(!is_file($this->viewPath)) return;
        
        //打开缓冲区
        ob_start();
        
        require($this->viewPath);
        
        //从内存缓存中获取页面代码
        $content = ob_get_contents();
        //清除内存缓存
        ob_flush();
        
        
        //jsonp跨域处理
        if(!$jsonpcallback = App::$request->get('jsonpcallback')){
            echo $content;
        }
        echo $jsonpcallback."(".json_encode($content).")";
        
    }
    
}
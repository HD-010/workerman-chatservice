<?php
// namespace EFrame\Base;

// use \EFrame\Helper\T;

require_once(dirname(__DIR__).'/Helper/T.php');

class Route{
    public $defaultRout;        //默认路由
    public $requestUri;
    public $uri;                //请求uri数组（不带参数部分）
    
    public function __construct($defaultRoute){
        $this->defaultRout = $defaultRoute;
    }
    
    /**
     * 解析路由为模块、控制器、操作的对应关系的数组
     */
    public function parseRoute(){
        $this->uri = $this->setRequestUri()->parse()->route();
        return $this;
    }
    
    /**
     * 路由重定向，解析路由为模块、控制器、操作的对应关系的数组
     */
    public function redirectRoute($uri){
        $this->uri = $this->setRedirectUri($uri)->parse()->route();
        return $this;
    }
    
    /**
     * 返回解析得到的路由
     * @return string[]|boolean[]|\EFrame\Helper\unknown[]
     */
    public function getRoute(){
        return $this->uri;
    }
    
    /**
     * 设置uri
     * @return Route
     */
    public function setRequestUri(){
        $this->requestUri = $_SERVER['REQUEST_URI'];
        return $this;
    }
    
    /**
     * 设置重定向uri
     * @param unknown $uri
     * @return Route
     */
    public function setRedirectUri($uri){
        $this->requestUri = $uri;
        return $this;
    }
    
    /**
     * 解析uri字串为数组
     * 如果url如：http://127.0.0.1:8383/?a=b 请求，则使用默认路由
     * @return \EFrame\Base\Route
     */
    public function parse(){
        if(strlen($this->requestUri)){
            
            //标记问号出现的位置
            $delimiterPoint = strpos($this->requestUri, '?');
            
            //根据url中带参数和不带参数两种情况获取REQUEST_URI
            $route = strpos($this->requestUri, '?') === false ? $this->requestUri : substr($this->requestUri,0,strpos($this->requestUri, '?'));
            
            //如果url如：http://127.0.0.1:8383/?a=b 请求，则使用默认路由
            if($route == '/'){
                $route = $this->defaultRout;
            }
            $this->uri = explode('/', $route);
        }
        return $this;
    }
    
    /**
     * 将uri数组处理为模型、控制器、方法 的对应关系
     * 如果uri中存在index.php之类的文件名称，则 向后取三个元素分别作为模型名称，控制器名称，方法名称
     * 如果不存在index.php之类的文件名称，则取最后三个元素向分别作为模型名称，控制器名称，方法名称
     * 
     */
    public function route(){
        $index = $this->getIndex();
        $route = [];
        //如果不存在index.php之类的文件名称，则从索引为1的元素向后取
        $index = ($index == -1) ? count($this->uri) - 3 - 1 : $index;
        
        //如果uri中存在index.php之类的文件名称，则 向后取三个元素
        $route['module'] = T::arrayValue($index + 1, $this->uri,'home');
        $route['control'] = T::arrayValue($index + 2, $this->uri,'index');
        $route['action'] = T::arrayValue($index + 3, $this->uri,'index');
        
        //echo "<pre>".print_r($route,1)."</pre>";return;
        return $route;
    }
        
    /**
     * 查找默认主页文件名称对应的索引
     * 如果找到，就返回索引值，没有找到就返回 －1
     */
    public function getIndex(){
        for($i = 0; $i < count($this->uri); $i ++){
            if(strpos($this->uri[$i], '.')){
                return $i;
            }
        }
        return -1;
    }
}
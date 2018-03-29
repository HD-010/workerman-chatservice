<?php
/**
 * @author yx010
 *
 */
class Request {
    private $get;
    private $post;
    
    public function __construct() {
        $this->get = [];
        $this->post = [];
        if($this->validRequest()){
            $this->process();
        }
    }
    
    /**
     * 验证请求表达是否合法，合法返回1
     */
    public function validRequest(){
        $_SERVER['QUERY_STRING'];
        return 1;
    }
    
    /**
     * 请求表达解析
     */
    public function process(){
        $this->get = $_GET;
        $this->post = $_POST;
    }
    
    /**
     * 获取get的值
     * 如果传入的$param参数为空，返回请求的get对象
     * 如果传入的$param参数为存在的元素，返回对应的值
     * 如果传入的$param参数为不存在的元素，返回对应的值$default
     * 调用方式：
     * App::$request->get($param,$default)
     * 
     * @param unknown $param
     * @param unknown $default
     * @return string|boolean|unknown
     */
    public function get($param=null,$default=null){
        return !$param ? ($this->get) : (T::arrayValue($param, $this->get, $default));
    }
    
    /**
     * 获取post的值
     * 如果传入的$param参数为空，返回请求的post对象
     * 如果传入的$param参数为存在的元素，返回对应的值
     * 如果传入的$param参数为不存在的元素，返回对应的值$default
     * 调用方式：
     * App::$request->get($param,$default)
     * 
     * @param unknown $param
     * @param unknown $default
     * @return string|boolean|unknown
     */
    public function post($param=null,$default=null){
        return !$param ? ($this->post) : (T::arrayValue($param, $this->post, $default));
    }
}
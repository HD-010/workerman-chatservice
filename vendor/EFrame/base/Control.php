<?php
// namespace EFrame\Base;

class Control{
    public function render($data,$view=null){
        echo "<pre>".print_r($data)."</pre>";
    }
    
    
    /**
     * 将对象以json格式输出
     * @param unknown $data
     */
    public function renderJson($data){
        T::outJson($data);
    }
}

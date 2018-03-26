<?php
// namespace EFrame\Base;
require_once 'View.php';

class Control extends View{
    
    /**
     * 将对象以json格式输出
     * @param unknown $data
     */
    public function renderJson($data){
        T::outJson($data);
    }
}

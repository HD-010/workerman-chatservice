<?php
// namespace EFrame\Helper;

class T
{
    /**
     * 格式化输出输入内容
     * @param unknown $data
     */
    public static function print_pre($data){
        echo "<pre>".print_r($data,1)."</pre>";
    }
    
    /**
     * @author 弘德誉曦
     * 以链式键名获取多维数组的值
     * @param unknown $key
     * @param unknown $array
     * @param unknown $default
     * @return string|string|boolean|unknown
     */
    public static function arrayValue($key,$array,$default=null){
        $arr = $array;
        $keys = explode('.', $key);
        $error = '错误：不成以数组的形式访问字符串';
        $value = $default;
    
        if(!is_array($arr)) return $error;
        foreach ($keys as $val) {
            if (! is_array($arr)) {
                return $error;
            }
            $arr = array_key_exists($val, $arr) ? $arr[$val] : false;
            $value = $arr;
        }
        return $value ? $value : $default;
    }
    
    
    
    
    /**
     * 为数据添加status状态标识
     * @param unknown $data
     */
    public static function addStatus($data){
        if(empty($data)) return ['status' => 0];
        return array(
            'status' => 1,
            'data' => $data
        );
    }
    
    
    
    
    /**
     * 返回json数据格式
     * 
     * @param unknown $data
     * 
     * return json
     */
    public static function outJson($data){
         echo json_encode($data);
    }
    
    /**
     * @author 弘德誉曦
     * 查找多维数组中同一层级的所有相同键名的值
     *
     * @param string $key     查找的键名
     * @param array $array   被查找的多维数组
     * @param string $limter  字串分隔符
     * return string|array
     */
    public static function implodeArr($key,$array,$limter=null){
        $data = $limter ? '' : [];
        if(!is_array($array)) return "";
        foreach($array as $k => $v){
            if(!is_array($v)) return "";
            if(array_key_exists($key,$v)){
                if($limter){
                    $data .= $limter . $v[$key];
                }else{
                    $data[] = $v[$key];
                }
    
            }else{
                if($limter){
                    $data .= $this->implodeArr($key,$v,$limter);
                }else{
                    $data = array_merge($data,$this->implodeArr($key,$v,$limter));
                }
            }
        }
        return $data;
    }
}
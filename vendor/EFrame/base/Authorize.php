<?php
class Authorize{
    protected $isGuest;
    protected $userInfo;
    
    public function login($userInfo){
        if(!is_array($userInfo)) return;
        $this->userInfo = $userInfo;
        $this->isGuest = true;
    }
    
    /**
     * 判断用户是否访客（未登录），是则返回true
     * @return boolean
     */
    public function isGuest(){
        return $this->isGuest ? false : true;
    }
    
    /**
     * 获取登录用户的信息
     * @param string $key 是登录用户的身份信息，可以使用key1.key2....是形式获取健对应的值
     * @return un
     */
    public function userInfo($key=null){
        if(!is_array($this->userInfo)) $this->userInfo = [];
        if(!$key) return $this->userInfo;
        return T::arrayValue($key, $this->userInfo);
    }
    
    /**
     * 添加用户信息
     * @param unknown $key
     * @param unknown $value
     */
    public function setItem($key,$value){
        $this->userInfo[$key] = $value;
    }
    
    /**
     * 获取登录用户的信息
     * @param string $key 是登录用户的身份信息，可以使用key1.key2....是形式获取健对应的值
     * @return un
     */
    public function getItem($key=null){
        return $this->userInfo($key);
    }
}
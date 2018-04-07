<?php 
/**
 * @author yx010
 *  模块名称：用户信息模块
 */
class User{
    
    /**
     * 用户受权验证,注册用户受权信息
     */
    public function regUI(){
        if(App::$request->post('sing') === 'singIn'){
            if(!empty(App::$request->post())) App::$user->login(App::$request->post());
        }
    }
    
    
    /**
     * 初始化用户信息：
     * 如果用户首次登录，将用户信息写入user表，
     * 否则返回user表中service_id对应的整条记录，作为登录用户的全部个人信息
     */
    public function init(){
        $qObj = [
            [
                "ec_user" => [
                    "user_id",
                ],
            ],
            "WHERE" => [
                "user_id =" . App::$user->userInfo("userId"),
            ],
            "LIMIT" => "0,1"
        ];
        //查询数据表中是否存在当前用户的信息
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        //如果当前数据表中不存在当前用户的信息，则将当前用户的信息写入user表，创建新的用户信息。
        //如果存在则查出用户的完整信息，并返回。
        return empty($res) ? $this->createCount() : $this->showCount();
    }
    
    /**
     * 如果用户首次登录，将用户信息写入user表
     */
    public function createCount(){
        
        $qObj = [
            "TABLE" => 'ec_user',
            "FIELDS"=>['user_id','nick'],
            'VALUES'=>[
                [
                    App::$user->userInfo("userId"),
                    App::$user->userInfo("nick")
                ],
            ],
        ];
        
        $res = App::DB()->insertCommond($qObj)->exec()-res;
        return $res;
    }
    
    
    /**
     * 否则返回user表中service_id对应的整条记录，作为登录用户的全部个人信息
     */
    public function showCount(){
        $qObj = [
            [
                "ec_user" => [
                    "*",
                ],
            ],
            "WHERE" => [
                "user_id =" . App::$user->userInfo("userId"),
            ],
            "LIMIT" => "0,1"
        ];
        
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        return $res;
    }
}


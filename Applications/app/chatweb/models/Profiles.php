<?php
class Profiles
{
    /**
     * 更新用户资料
     */
    public function updateProfiles(){
        
        $qObj = [
            "MAIN_TABLE" => 'ec_user',     //tableName',
            "SET" => [      //受影响的表
                "nick='".App::$request->post('nick')."'",
                "sex='".App::$request->post('sex')."'",
                "birthday='".App::$request->post('birthday')."'"
            ],
            "WHERE" => [
                "user_id=".App::$request->post('userId'),
            ],
            "LIMIT" => "1"
        ];
        
        $res = App::DB()->updateCommond($qObj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
        
    }
    
    /**
     * 读取用户资料
     */
    public function readProfiles(){
        $where = [];
        if(App::$request->post('snid')){
            //用于筛选被查看用户的资料
            $where[] = "id='". App::$request->post('snid')."'";
        }else{
            //用于筛选当前登录用户的资料
            $where[] = "user_id='".App::$request->post('userId')."'";
        }
        
        $qObj = [
            [
                "ec_user" => [
                    "*",
                ],
            ],
            "WHERE" =>$where,
            "LIMIT" => '0,1'
        ];
    
    
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        return empty($res) ? 8500 : $res[0];
    }
}
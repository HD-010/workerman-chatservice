<?php
/**
 * @author yx010
 * 模块名称：好友信息模块
 */
class Friends{
    
    /**
     * 返回我的好友分组信息列表
     */
    public function getGroup(){
        $qObj = [
            [
                "ec_group" => [
                    '*'
                ],
            ],
            "WHERE" => [
                "user_id =" . App::$user->userInfo("userId"),
            ],
            "LIMIT" => "0,50"
        ];
        //查询数据表中是否存在当前用户的信息
        
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        
        return $res;
    }
    
    /**
     * 返回我的好友信息列表
     */
    public function getFriends(){
        $qObj = [
            [
                "ec_friends" => [
                    'id',
                    'friend_id',
                    'group_id'
                ],
                "ec_user" => [
                    'nick',
                    'sex'
                ],
            ],
            "WHERE" => [
                "ec_friends.user_id =" . App::$user->userInfo("userId"),
            ],
            "LEFT_JOIN" =>[
                "ec_user" => " ON ec_friends.friend_id=ec_user.user_id",
            ],
            "LIMIT" => "0,500"
        ];
        //查询数据表中是否存在当前用户的信息
//         $res = App::DB()->selectCommond($qObj)->showQuery();
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        
        return $res;
    }
    
    
    
}
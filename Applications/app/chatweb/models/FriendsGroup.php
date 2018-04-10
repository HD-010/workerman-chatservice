<?php 
/**
 * @author yx010
 * 当前类为好友分组管理类
 */
class FriendsGroup
{
    /**
     * 添加好友新的分组名称
     * 返回8500表示结果异常，200表示添加成功
     * @return number
     */
    public function addGroup(){
        //添加新分组前，查询数据库中是否有新的分组
        $Qobj = [
            [
                "ec_group" => [
                    "name",
                ],
            ],
            "WHERE" => [
                "name='" . App::$request->post('groupName') ."'",
                "user_id='".App::$request->post('userId')."'",
            ],
        
            "LIMIT" => '0,1'
        ];
        $res = App::DB()->selectCommond($Qobj)->query()->fetchAll();
        if(!empty($res)){
            return 8500;   //表示结果异常
        } 
        
        $Qobj = [
            "TABLE" => 'ec_group',
            "FIELDS"=>['name','user_id'],
            'VALUES'=>[
                [
                    App::$request->post('groupName'),
                    App::$request->post('userId')
                ],
            ],
        ];
        
        $res = App::DB()->insertCommond($Qobj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
    }
    
    /**
     * 修改好友分组名称
     */
    public function alterGroup(){
        
        //在修改好友分组名称前需要判断，不能修改系统分组名称“我的友好、黑名单”
        //这里根据ec_group中的id判断，以上两类属性系统变量不能修改
        if(App::$request->post('groupId') < 10){
            return $res = 1000;
        }
        
        $qObj = [
            "MAIN_TABLE" => 'ec_group',     //tableName',
            "SET" => [      //受影响的表
                "name='".App::$request->post('groupName')."'",
            ],
            "WHERE" => [
                "id=".App::$request->post('groupId'),
            ],
            "LIMIT" => ""
        ];
        
        $res = App::DB()->updateCommond($qObj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
        
        
    }
    
    /**
     * 删除好友分组
     */
    public function dropGroup(){
        //在删除好友分组名称前需要判断，分组下是否有好友，如果有则不能删除。只能删除一个空分组
        $Qobj = [
            [
                "ec_friends" => [
                    "group_id",
                ],
            ],
            "WHERE" => [
                "group_id=" . App::$request->post('snid'),
                
            ],
        
            "LIMIT" => '0,1'
        ];
        
        $res = App::DB()->selectCommond($Qobj)->query()->fetchAll();
        if(!empty($res)){
            return 8500;   //表示结果异常
        }
        
        
        
        $qObj = [
            "MAIN_TABLE" => 'ec_group',     //tableName',
        
            "WHERE" => [
                "id=".App::$request->post('snid'),
            ],
            "LIMIT" => ""
        ];
        
        $res = App::DB()->deleteCommond($qObj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
    }
    
    /**
     * 将好友移到指定分组
     */
    public function moveToGroup(){
        $qObj = [
            "MAIN_TABLE" => 'ec_friends',     //tableName',
            "SET" => [      //受影响的表
                "group_id='".App::$request->post('valId')."'",
            ],
            "WHERE" => [
                "id=".App::$request->post('snid'),
            ],
            "LIMIT" => ""
        ];
        
        $res = App::DB()->updateCommond($qObj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
    }
}
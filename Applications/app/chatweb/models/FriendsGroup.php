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
}
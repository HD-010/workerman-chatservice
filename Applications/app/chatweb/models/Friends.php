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
                "user_id in (0," . App::$user->userInfo("userId") . ")",
            ],
            "ORDER_BY" => [
                "weight asc",
            ],
            "LIMIT" => "0,100"
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
    
    /**
     * 根据表id删除好友
     */
    public function dropFriends(){
        $qObj = [
            "MAIN_TABLE" => 'ec_friends',     //tableName',
        
            "WHERE" => [
                "id=".App::$request->post('snid'),
            ],
            "LIMIT" => ""
        ];
        
        $res = App::DB()->deleteCommond($qObj)->exec()->res();
        return ($res > 0) ? 200 : 8500;
    }
    
    /**
     * 统计总的有多少条记录
     */
    public function countUsers(){
        //当前实现的是顺序加载方案，有意实现随机加载
        $searchCount = App::$request->post('searchCount');
        $searchSex = App::$request->post('searchSex');
        //$total = App::$request->post('total',0);
        
        $where = [];
        //系统属性：禁止查找用户自己的账号
        $where[] = 'user_id<>'.App::$request->post('user_id');
        
        //添加客户端输入的筛选条件
        if($searchCount){
            $where[] = "user_id='".$searchCount."'";
        }
        if($searchSex){
            $where[] = "sex='".$searchSex."'";
        }
        
        $qObj = [
            [
                "ec_user" => [
                    'count(*) as total'
                ],
            ],
            "WHERE" => $where,
        
            "LIMIT" => ""
        ];
        //查询数据表中是否存在当前用户的信息
        //$res = App::DB()->selectCommond($qObj)->showQuery();
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        
        return $res[0]['total'];
    }
    
    /**
     * 返回数据表中的任意一个符合条件的好友名单
     * 返回的每批名单不超过9条记录
     * 最初需求：返回点击菜单添加好友时发送的好友列表请求
     * @params $init array 获取列表的初始值
     */
    public function everyOneFriends($init){
        $pageSize = $init['pageSize'];
        //当前实现的是顺序加载方案，有意实现随机加载
        $searchCount = App::$request->post('searchCount');
        $searchSex = App::$request->post('searchSex');
        //$total = App::$request->post('total',0);
        $currentPage = App::$request->post('currentPage',0);
        $start = $currentPage * $pageSize;
        
        $where = [];
        //系统属性：禁止查找用户自己的账号
        $where[] = 'user_id<>'.App::$request->post('user_id');
        
        //添加客户端输入的筛选条件
        if($searchCount){
            $where[] = "user_id='".$searchCount."'";
        }
        if($searchSex){
            $where[] = "sex='".$searchSex."'";
        }
        
        
        $qObj = [
            [
                "ec_user" => [
                    'id',
                    'user_id',
                    'nick',
                    'sex'
                ],
            ],
            "WHERE" => $where,
            
            "LIMIT" => "$start,$pageSize"
        ];
        //查询数据表中是否存在当前用户的信息
        $res = App::DB()->selectCommond($qObj)->showQuery();
        file_put_contents("d:/log.txt", print_r($res,1));
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        $res = empty($res) ? 8500 : $res;
        
        return $res;
    }
    
    /**
     * 判断请求对象是否在当前用户好友列表中
     */
    public function friendIsExists(){
        $qObj = [
            [
                "ec_friends" => [
                    'friend_id'
                ],
            ],
            "WHERE" => [
                "friend_id=".App::$request->post('friend_id'),
                "user_id=".App::$request->post('user_id'),
            ],
            
            "LIMIT" => "0,1"
        ];
        //查询数据表中是否存在当前用户的信息
        //$res = App::DB()->selectCommond($qObj)->showQuery();
        $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
        $res = empty($res) ? 0 : 1;
        
        return $res;
    }
    
    /**
     * 添加好友
     */
    public function applyFriends(){
        $qObj = [
            "TABLE" => 'ec_friends',
            "FIELDS"=>['friend_id','user_id'],
            'VALUES'=>[
                [
                    App::$request->post('friend_id'),
                    App::$request->post('user_id'),
                ],
            ],
        ];
        
        $res = App::DB()->insertCommond($qObj)->exec()->res();

        return ($res > 0) ? ['message'=>'添加好友成功'] : 8500;
    }
    
}
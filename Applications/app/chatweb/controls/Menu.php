<?php
class Menu extends Control
{
    /**
     * 添加好友分组
     */
    public function actionAddGroup(){
        //对转递数据的身份进行认证:
        //根据用户id查询token进行对比，如果一致则认证通过
        /* if(App::$request->post('token') != App::$user->getItem('token')){
         $this->renderJson('error:4000');
         return;
         } */
    
        //身份认证通过后，将新增的分类名称写入数据表
        $res = App::model('FriendsGroup')->addGroup();
        $data = App::model('ErrorInfo')->type($res);
        $this->renderJson($data);
    }
    
    /**
     * 修改好友分组名称
     */
    public function actionAlterGroup(){
        //$data['token'] = App::$request->post('token');
        
        $res = App::model('FriendsGroup')->alterGroup();
        $data = App::model('ErrorInfo')->type($res);
        
        $this->renderJson($data);
    }
    
    /**
     * 根据表id删除好友
     */
    public function actionDropFriend(){
        //$data['token'] = App::$request->post('token');
        
        $res = App::model('Friends')->dropFriends();
        $data = App::model('ErrorInfo')->type($res);
        
        $this->renderJson($data);
    }
    
    /**
     * 删除分组
     */
    public function actionDropGroup(){
        //$data['token'] = App::$request->post('token');
        
        $res = App::model('FriendsGroup')->dropGroup();
        $data = App::model('ErrorInfo')->type($res);
        
        $this->renderJson($data);
    }
    
    /**
     * 添加到黑名单
     */
    public function actionAddToBack(){
        $this->renderJson("添加到黑名单");
    }
    
    /**
     * 将好友移到分组
     */
    public function actionMoveToGroup(){
        //$data['token'] = App::$request->post('token');
        
        $res = App::model('FriendsGroup')->moveToGroup();
        $data = App::model('ErrorInfo')->type($res);
        
        $this->renderJson($data);
    }
    
    /**
     * 返回点击菜单添加好友时发送的好友列表请求
     * ajax 发送数据格式：
     * //分页数据
		var data = {
			user_id:user.guestId(),
			pageSize: pageData.attr('pageSize'),
			currentPage: pageData.attr('currentPage'),
			total: pageData.attr('total'),
		};
     */
    public function actionLookFriends(){
        //$data['token'] = App::$request->post('token');
        
        //设置获取列表的初始值
        $init = [
            'pageSize' => 9,   //设置分页步长
        ];
        
        //统计总的有多少条记录
        $total = App::model('Friends')->countUsers();
        
        //获取用户名单
        $res = App::model('Friends')->everyOneFriends($init);
        $data = App::model('ErrorInfo')->type($res);
        
        //添加数据付加信息
        $data['addData'] = [
            'total'=>$total,
            'pageSize'=>$init['pageSize']
        ];
        
        $this->renderJson($data);
    }
    
    /**
     * 申请添加好友
     * 首先需要判断请求对象是否在当前用户好友列表中
     * 如果存在，则不再添加
     */
    public function actionApplyFriends(){
        //$data['token'] = App::$request->post('token');
        
        //判断请求对象是否在当前用户好友列表中
        if(App::model('Friends')->friendIsExists()){
            //好友已经存在于好友列表
            $data = [
                "message"=>"好友已经存在于好友列表"
            ];
            $data = App::model('ErrorInfo')->type($data);
            $this->renderJson($data);
            return;
        }
        
        $res = App::model('Friends')->applyFriends();
        $data = App::model('ErrorInfo')->type($res);
        
        
        $this->renderJson($data);
    }
}
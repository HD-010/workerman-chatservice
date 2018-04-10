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
}
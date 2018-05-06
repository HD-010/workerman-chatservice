<?php
class User
{
    /**
     * token验证
     * 将接收到的token与passport中对应记录的token进行对比，如果一至则验证通过
     * return boolen
     */
    public function checkToken(){
        $user_id = App::$request->get('service') ? App::$request->get('service') : App::$request->post('userId');
    
        $qObj = [
            [
                "user" => [
                    "TOKEN",
                ],
            ],
            "WHERE" => [
                "ID =" . $user_id,
            ],
            "LIMIT" => "0,1"
        ];
    
        //查询数据表中是否存在当前用户的信息
        $res = App::DB('passport')->selectCommond($qObj)->query()->fetchAll();
    
        $token = T::arrayValue('0.TOKEN', $res,false);
    
        if($token != App::$request->get('token')){
            echo T::outJson(App::model('ErrorInfo')->type(9000));
            return false;
        }else{
            return true;
        }
    }
}
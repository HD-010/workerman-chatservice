<?php
/**
 * 用户宝典model
 * @author yx010
 *
 */
class ServiceGuide
{
    public function update(){
        $qObj = [
            "MAIN_TABLE" => 'ec_serviceguide',     //tableName',
            "SET" => [      //受影响的表
                "search_key='".App::$request->post('key')."'",
                "contents='".App::$request->post('contents')."'",
                "mechan_id='".App::$request->post('mechanId','default')."'",
            ],
            "WHERE" => [
                "id=".App::$request->post('snid'),
            ],
            "LIMIT" => "1"
        ];
        $res = App::DB()->updateCommond($qObj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
    }
    
    public function insert(){
        $Qobj = [
            "TABLE" => 'ec_serviceguide',
            "FIELDS"=>['user_id','mechan_id','search_key','contents'],
            'VALUES'=>[
                [
                    App::$request->post('userId'),
                    App::$request->post('mechanId'),
                    App::$request->post('key'),
                    App::$request->post('contents'),
                ],
            ],
        ];
        
        $res = App::DB()->insertCommond($Qobj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
    }
}
<?php
/**
 * 用户宝典model
 * @author yx010
 *
 */
class ServiceGuide
{
    /**
     * 更新话术
     * @return number
     */
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
    
    
    /**
     * 向数据库添加话术
     * @return number
     */
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
    
    /**
     * 按关键字查询话术
     * @return number|number|unknown
     */
    public function readGuide(){
        $where = [];
        if(!App::$request->post('key')){
            return 8500;
        }
        
        $key = App::$request->post('key');
        //分词处理
        $conditions = $this->searchKeys($key);
            
        for($i = count($conditions), $match=false; $i > 0 && !$match; $i--){
            
            $qObj = [
                [
                    "ec_serviceguide" => [
                        "*",
                    ],
                ],
                "WHERE" =>[
                    "search_key like '" . $conditions[$i-1]."'",
                ],
                "LIMIT" => '0,10'
            ];
            //file_put_contents("d:/log4.txt",print_r($i,1),FILE_APPEND);
            
            $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
            //如果返回的结果集不为空，则不再往执行下一条sql查询
            if(!empty($res)){
                $match = true;
            }
        }
        
        return empty($res) ? 8500 : $res;
    }
    
    /**
     * 按关键字查询话术
     * @return number|number|unknown
     */
    public function quickReadGuide(){
        $where = [];
        if(!App::$request->post('key')){
            return 8500;
        }
        
        $key = App::$request->post('key');
        //分词处理
        $conditions = $this->searchKeys($key);
            
        for($i = count($conditions), $match=false; $i > 0 && !$match; $i--){
            
            $qObj = [
                [
                    "ec_serviceguide" => [
                        "*",
                    ],
                ],
                "WHERE" =>[
                    "search_key like '" . $conditions[$i-1]."'",
                ],
                "LIMIT" => '0,10'
            ];
            //file_put_contents("d:/log4.txt",print_r($i,1),FILE_APPEND);
            
            $res = App::DB()->selectCommond($qObj)->query()->fetchAll();
            //如果返回的结果集不为空，则不再往执行下一条sql查询
            if(!empty($res)){
                $match = true;
            }
        }
        
        return empty($res) ? 8500 : $res;
    }
    
    /**
     *　搜索分词处理　
     * @param unknown $key　搜索关键词(有空格)
     * @param array
     */
    public function searchKeys($key){
        $conditions = [];
        //将中文空格换成英文件空格
        $key = str_replace('　',' ',$key);
        $key = explode(' ',$key);
       
        $strTem = '';
        for($i = 0; $i < count($key); $i++){
            $strTem .= $key[$i].'%';
            $conditions[] = $strTem;
        }
        
        return $conditions;
    }
    
    public function delGuide(){
        $qObj = [
            "MAIN_TABLE" => 'ec_serviceguide',     //tableName',
        
            "WHERE" => [
                "id=".App::$request->post('snid'),
            ],
            "LIMIT" => "1"
        ];
        
        $res = App::DB()->deleteCommond($qObj)->exec()->res();
        
        return ($res > 0) ? 200 : 8500;
    }
    
}
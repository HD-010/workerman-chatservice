<?php

class Demo{
    public function selectData(){
        $o = [
            [
                "e01ren_development_events" => [
                    "*",
                ],
            ],

            "LIMIT" => '0,1'
        ];
        
        
        //$sql = App::DB()->queryR($o);
        $res = App::DB()->selectCommond($o)->query()->fetchAll();
        return $res;
    }
    
    /**
     * 测试删除数据 
     */
    public function deleteData(){
        $o = [
            "MAIN_TABLE" => 'table1',     //tableName',
            
            "WHERE" => [
                "relation1",
                "(relation3 or relation4)",
            ],
            
        ];
        $res = App::DB()->deleteCommond($o);
        
    }
    
    /**
     * 测试更新数据 
     */
    public function updateData(){
        $o = [
            "MAIN_TABLE" => 'tableName',     //tableName',
            "SET" => [      //受影响的表
                "SET1 = val1",
                "SET2 = val2",
            ],
            "WHERE" => [
                "relation1",
                "(relation3 or relation4)",
            ],
        ];
        
        $res = App::DB()->updateCommond($o);
        
    }
    /**
     * 测试插入数据 
     */
    public function insertData(){
        $o = [
            "TABLE" => 'tableName',
            "FIELDS"=>['name','lsld'],
            'VALUES'=>[
                ['uy','uy'],
                [4,9],
                ['werw','fg'],
            ],
        ];
        
        $res = App::DB()->insertCommond($o);
        
    }
}


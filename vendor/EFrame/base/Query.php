<?php

/**
 * @author yx010
 *  sql语句构造类
 *  该类由数据库连接类继
类使用案例：
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
    
    public function deleteData(){
        $o = [
            "MAIN_TABLE" => 'table1',     //tableName',
            
            "WHERE" => [
                "relation1",
                "(relation3 or relation4)",
            ],
            
        ];
        $res = App::DB()->deleteCommond($o)->exec()-res;
        
    }
    
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
        
        $res = App::DB()->updateCommond($o)->exec()-res;
        
    }
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
        
        $res = App::DB()->insertCommond($o)->exec()-res;
        
    }
 */
class Query{
    protected $QObj;        //请求对象
    protected $mainTb;      //联合查询的主表
    
    /**
     * 输出查询语句
     * 使用示例：
     * App::db()->insertCommond($o)->showQuery();
     */
    public function showQuery(){
        return $this->sql;
    }
    
    //========================select查询语句构造========================
    /**
     * 初始化select查询对象
     */
    public function queryRInit($qObj){
        $this->QObj = [
            [
                "tableName1" => [
                    //"fields1",
                ],
                "tableName2" => [
                    //"fields1",
                ],
            ],
            "WHERE" => [
                //"relation1",
                //"(relation3 or relation4)",
            ],
            "HAVING" => [
                //"relation1",
            ],
            "GROUP_BY" => [
                //"group1",
            ],
            "ORDER_BY" => [
                //"field1",
            ],
            "LEFT_JOIN" =>[
                //"tableName2" => " ON 'relation1'",
            ],
            "INNER_JOIN" =>[
                //"tableName2" => " ON 'relation1'",
            ],
            "LIMIT" => '0,25'
        ];
        
        $fd = isset($qObj[0]) ? $qObj[0] : '';
        if(is_array($fd) && !empty($fd)){
            unset($qObj[0]);
            unset($this->QObj[0]);
            $qobj = array_merge($this->QObj,$qObj);
            $qobj[0] = $fd;
            $this->QObj = $qobj;
        }
    }
    
    /*
     * 组织sql查询语句
     * $sql 结构
     *  $sql = 'select
         a.f1,a.f2,b.f1,b.f3,c.f1,c.f2
         from
         a
         left join b on a.f1=b.f1
         left join c on a.f1=c.f1
         where
         a.f1>0 and (b.f2>0 or c.f1=3)';
     */
    public function selectCommond($qObj){
        $this->queryRInit($qObj);
        
        $sql = 'select' . 
        $this->fieldsQC(). 
        ' from ' . 
        $this->mainTb .
        $this->leftJoin() .
        $this->where() .
        $this->groupBy() .
        $this->orderBy() .
        $this->limit(); 
        
        $this->sql = $this->mainTb ? $sql : '';
        
        return $this;
    }
    
    
    //=======================delete删除语句构造=========================
    
    /**
     * 初始化delet删除对象
     */
    public function queryDInit($qObj){
        $this->QObj = [
            "MAIN_TABLE" => '',     //tableName',
            "FETCH_TABLE" => [      //受影响的表
                //"table1",
                //"table2",
            ],
            "WHERE" => [
                //"relation1",
                //"(relation3 or relation4)",
            ],
            "HAVING" => [
                //"relation1",
            ],
            "LEFT_JOIN" =>[
                //"tableName2" => " ON 'relation1'",
            ],
            "INNER_JOIN" =>[
                //"tableName2" => " ON 'relation1'",
            ],
            "LIMIT" => '0,25'
        ];
        $qobj = array_merge($this->QObj,$qObj);
        $this->QObj = $qobj;
        $this->mainTb = $this->QObj['MAIN_TABLE'];
    }
    
    /*
     * 组织sql删除语句
     * $sql 结构
     * 需要删除的表的名称列在DELETE之后，连接条件所用的表列在FROM之后
     *  $sql = "delete 
       orders,items 
       from orders 
       left join otems on orders.orderid=items.orderid and orders.userid=items.userid 
       where orders.date<'2018/03/20';"
     */
    public function deleteCommond($qObj){
        $this->queryDInit($qObj);
        $sql = 'delete ' .
            $this->fetchTb().
            ' from ' .
            $this->mainTb .
            $this->leftJoin() .
            $this->where() .
            $this->limit();
            $this->sql = $this->mainTb ? $sql : '';
        
            return $this;
    }
    
    //=======================update更新语句构造=========================
    
    /**
     * 初始化update更新对象
     */
    public function queryUInit($qObj){
        $this->QObj = [
            "MAIN_TABLE" => '',     //tableName',
            "SET" => [      //受影响的表
                //"SET1",
                //"SET2",
            ],
            "WHERE" => [
                //"relation1",
                //"(relation3 or relation4)",
            ],
            "HAVING" => [
                //"relation1",
            ],
            "LEFT_JOIN" =>[
                //"tableName2" => " ON 'relation1'",
            ],
            "INNER_JOIN" =>[
                //"tableName2" => " ON 'relation1'",
            ],
            "LIMIT" => '0,25'
        ];
        $qobj = array_merge($this->QObj,$qObj);
        $this->QObj = $qobj;
        $this->mainTb = $this->QObj['MAIN_TABLE'];
    }
    
    /*
     * 组织sql更新语句
     * $sql 结构
     *  $sql = UPDATE 
        product p 
        INNER JOIN productPrice pp ON p.productId = pp.productId 
        SET pp.price = pp.price * 0.8, p.dateUpdate = CURDATE() 
        WHERE p.dateCreated < '2004-01-01'
     */
    public function updateCommond($qObj){
        $this->queryUInit($qObj);
        $sql = 'UPDATE ' .
            $this->mainTb .
            $this->leftJoin() .
            $this->set() .
            $this->where() .
            $this->limit();
    
            $this->sql = $this->mainTb ? $sql : '';
        //echo $sql;
            return $this;
    }
    
    
    //=======================insert语句构造=========================
    
    /**
     * 初始化insert更新对象
     */
    public function queryCInit($qObj){
        $this->QObj = [
         "TABLE" => 'tableName',
         "FIELDS"=>['fields1','fields2'],
         'VALUES'=>[
             ['value1','value2'],
             ['value1','value2'],
             ['value1','value2'],
         ],
     ];
        $qobj = array_merge($this->QObj,$qObj);
        $this->QObj = $qobj;
    }
    
   
    /*
     * 组织sql插入语句
     * $sql 结构
     *  $sql = 'INSERT INTO
        table
        (name,age)
        VALUES 
        (‘姚明’, 25), (‘比尔.盖茨’, 50), (‘火星人’, 600);
     */
    public function insertCommond($qObj){
        $this->queryCInit($qObj);
        $this->sql = 'INSERT INTO ' .
        $this->insertTable() .
        $this->insertFields() .
        $this->insertvalues();
        
        return $this;
    }
    
    
    //================================================
    
    
    
    /**
    $o = [
        $fields = [
            "tableName1" => [
                "fields1",
                "fields2",
                "fields3",
                ......
            ],
            "tableName2" => [
                "fields1",
                "fields2",
                "fields3",
                ......
            ],
            ......
        ],
     ]
     */
    public function fieldsQC(){
        $Q = $this->QObj[0];
        $mainTb = $fields = '';

        foreach($Q as $tb => $fdArr){
            if(!$mainTb && !empty($fdArr)){
                $mainTb = $tb;
            }
            
            if(is_array($fdArr) && !empty($fdArr)){
                $fields .= $this->fieldImplode($tb, $fdArr) . ',';
                //$fields = substr($delimit . implode($delimit,$fdArr),1);
                
            }else{
                $fields .= ' '.trim($fdArr) . ',';
            }
        }
        $this->mainTb = $mainTb;
        
        return substr($fields,0,-1);
    }
    
    
    /**
        $o = [
            "LEFT_JOIN" =>[
                "tableName2" => " ON 'relations'",
                "tableName3" => " ON 'relations'",
                "tableName4" => " ON 'relations'"
                ......
            ],
        ] 
     */
    public function leftJoin(){
        $relation = '';
        
        if(!array_key_exists('LEFT_JOIN',$this->QObj)) return '';
        $Q = $this->QObj["LEFT_JOIN"];
        if(!is_array($Q) || empty($Q)) return '';
        foreach($Q as $tb => $re){
            $relation .= " LEFT JOIN " . $tb . ' ' . trim($re);
        }
        return $relation;
    }
    
    /**
        $o=[    
            "WHERE" => [
                "relation1',
                "relation2',
                "(relation3 or relation4)',
                ......
            ],
        ]
     */
    public function where(){
        $where = ' WHERE ';
        $Q = $this->QObj["WHERE"];
        if(!is_array($Q) || empty($Q)) return '';
        $where .= implode(' and ', $Q);
        return $where;
    }
    
    /**
        $o=[
            "GROUP_BY" => [
                "group1",
                "group2",
                "group3",
                ......
            ],
        ]
     */
    public function groupBy(){
        $groupBy = ' GROUP BY ';
        $Q = $this->QObj["GROUP_BY"];
        if(!is_array($Q) || empty($Q)) return '';
        $groupBy .= implode(', ',$Q);
        return $groupBy;
    }
    
    /**
        $o=[
            "ORDER_BY" => [
                "field1",
                "field2",
                "field3",
                ......
            ],
        ]
     */
    public function orderBy(){
        $orderBy = ' ';
        $Q = $this->QObj["ORDER_BY"];
        if(!is_array($Q) || empty($Q)) return '';
        $orderBy .= ' ORDER BY ' . implode(' AND ORDER BY ',$Q);
        return $orderBy;
    }
    /**
        $o=[
            "LIMIT" => '0,1'
        ]
     */
    public function limit(){
        $limit = ' ';
        $Q = $this->QObj["LIMIT"];
        if(!is_string($Q) || strlen($Q) < 1) return '';
        $limit .= ' LIMIT ' . $Q;
        return $limit;
    }
    
    /**
     $o=[
         "FETCH_TABLE" => [      //受影响的表
            //"table1",
            //"table2",
        ],
     ]
     */
    public function fetchTb(){
        $fetchTb = '';
        $Q = $this->QObj["FETCH_TABLE"];
        if(empty($Q)) return '';
        $fetchTb .= implode(',',$Q);
        return $fetchTb;
    }
    
    /**
       $o=[
            "SET" => [      //受影响的表
                //"SET1",
                //"SET2",
            ],
       ]
     */
    public function set(){
        $set = ' set ';
        $Q = $this->QObj["SET"];
        if(empty($Q)) return '';
        $set .= implode(',',$Q);
        return $set;
    }
    
    /**
     $o=[
         "TABLE" => 'tableName',
         "FIELDS"=>['fields1','fields2'],
         'VALUES'=>[
             ['value1','value2'],
             ['value1','value2'],
             ['value1','value2'],
         ],
     ];
     * @return string
     */
    public function insertTable(){
        return $this->QObj['TABLE'];
    }
    
    /**
     $o=[
         "TABLE" => 'tableName',
         "FIELDS"=>['fields1','fields2'],
         'VALUES'=>[
             ['value1','value2'],
             ['value1','value2'],
             ['value1','value2'],
         ],
     ];
     * @return string
     */
    public function insertFields(){
        $fields = implode(',', $this->QObj['FIELDS']);
        return ' ('.$fields.')';
    }
    
    /**
     $o=[
         "TABLE" => 'tableName',
         "FIELDS"=>['fields1','fields2'],
         'VALUES'=>[
             ['value1','value2'],
             ['value1','value2'],
             ['value1','value2'],
         ],
     ];
     * @return string
     */
    public function insertvalues(){
        $fields = ' VALUES ';
        $fieldTem = [];
        for($i = 0; $i < count($this->QObj['VALUES']); $i++){
            $fieldTem[] = '('.$this->implode(',',$this->QObj['VALUES'][$i]).')';
        }
        $fields .= implode(',',$fieldTem);
    
        return $fields;
    }
    
    /**
     * 
     */
    public function implode($delimiter,$array){
        $str = '';
        
        //分隔符长度
        $delimiterLenth = strlen($delimiter);
        
        //指定添加单引号的数据类型
        $singleQuotation  = [
            'string',
            'NULL'
        ];
        
        foreach($array as $key => $val){
            if(in_array(gettype($val), $singleQuotation)){
                $str .= $delimiter.'\''.$val.'\'';
            }else{
                $str .= $delimiter.$val;
            }
        }
        
        return substr($str,$delimiterLenth);
    }
    
    
    /**
     * 字段数组中字段加表名拼接字串的专用方法
     * @param unknown $glue 表名
     * @param unknown $pieces 字段集合
     * @return string
     */
    public function fieldImplode($glue, $pieces){
        $str = $action = $param = '';
        for($i = 0; $i < count($pieces); $i++){
            $ops = false;
            $pos = strpos($pieces[$i],'(');
            if($pos !== false){
                //方法名称部分
                $action = substr($pieces[$i],0 ,$pos + 1);
                //参数部分
                $param = substr($pieces[$i],$pos + 1);
                //重组方法表，表名，字段名,如果是*，则不加表名
                if(strpos($param,'*') !== false){
                    $str .= ', '.$action.$param;
                }else{
                    $str .= ', '.$action.$glue.'.'.$param;
                }
    
            }else{
                $str .= ', '.$glue.'.'.$pieces[$i];
            }
        }
        return substr($str,1);
    }
    
    
}
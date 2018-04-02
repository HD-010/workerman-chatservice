<?php
require_once 'Query.php';
/**
 * 数据库连接助手
 * @author yx010
 *
 */
class MysqlDB extends Query
{
    protected $pdo;
    protected $res;
    protected $config;
    
    function __construct($config){
        $this->config = $config;
        $this->connect();
    }
    
    public static function db(){
        $config=[
          'class'=>'yii\db\Connection',					//数据库连接类
          'dsn'=>'mysql:host=127.0.0.1;dbname=dataanalysis',	    //数据库地址，名称
          'username'=>'root',								//用户名
          'password'=>'root',								//密码
          'charset'=>'UTF8',								//使用字符集
          //'enableSchemaCache'=>'true',					//开数据库缓存
          //'schemaCache'=>'cache',							//缓存到runtime\cache目录
          //'schemaCachDruation'=>'3306',				    //缓存时间3600秒
          //'dbprefix'=>'',                                 //表前缀
        ];
        return new MysqlDB($config);
    }
    
    public function a(){
        echo "test";
    }
    
    /**
     * 数据库连接
     */
    public function connect(){
        try{
            $this->pdo = new PDO(
                $this->config['dsn'],
                $this->config['username'],
                $this->config['password'],
                array(
                    PDO::ATTR_PERSISTENT => true
                )
            );
        }catch(PDOException $e){
            print 'Error!:' .$e->getMessage();
            return false;
        }
        
        $this->pdo->query('set names '.$this->config['charset'].';');
    }
    
    /**
     * 关闭连接
     */
    public function close(){
        $this->pdo = null;
    }
    
    /**
     * 查询
     * @param unknown $sql
     */
    public function query($sql=null){
        $sql = $sql ? $sql : $this->sql;
        $res = $this->pdo->query($sql);
        if($res){
            $this->res = $res;
        }
        return $this;
    }
    
    /**
     * 执行一条 sql语句，并返回受影响 的行数
     * @param unknown $sql
     */
    public function exec($sql=null){
        $sql = $sql ? $sql : $this->sql;
        $res = $this->pdo->exec($sql);
        if($res){
            $this->res = $res;
        }
        return $this;
    }
    
    /**
     * 返回一个结果集中所有行的数组
     */
    public function fetchAll(){
        return $this->res->fetchAll();
    }
    
    /**
     * 返回结果集中的所有结果
     */
    public function queryAll(){
        return $this->query()->fetchAll();
    }
    /**
     * 从一个 PDOStatement 对象相关的结果集中获取下一行。fetch_style 参数决定 POD 如何返回行
     * 控制下一行如何返回给调用者。此值必须是 PDO::FETCH_* 系列常量中的一个，缺省为 PDO::ATTR_DEFAULT_FETCH_MODE 的值 （默认为 PDO::FETCH_BOTH ）。 

        1.PDO::FETCH_ASSOC：返回一个索引为结果集列名的数组 
        
        2.PDO::FETCH_BOTH（默认）：返回一个索引为结果集列名和以0开始的列号的数组 
        
        3.PDO::FETCH_BOUND：返回 TRUE ，并分配结果集中的列值给 PDOStatement::bindColumn() 方法绑定的 PHP 变量。 
        
        4.PDO::FETCH_CLASS：返回一个请求类的新实例，映射结果集中的列名到类中对应的属性名。
                                如果 fetch_style 包含 PDO::FETCH_CLASSTYPE（例如：PDO::FETCH_CLASS | PDO::FETCH_CLASSTYPE），则类名由第一列的值决定 
        
        5.PDO::FETCH_INTO：更新一个被请求类已存在的实例，映射结果集中的列到类中命名的属性 
        
        6.PDO::FETCH_LAZY：结合使用 PDO::FETCH_BOTH 和 PDO::FETCH_OBJ，创建供用来访问的对象变量名 
        
        7.PDO::FETCH_NUM：返回一个索引为以0开始的结果集列号的数组 
        
        8.PDO::FETCH_OBJ：返回一个属性名对应结果集列名的匿名对象 

     */
    public function fetch($num=2){
        return $this->res->fetch($num);
    }
  
    /**
     *  从结果集中的下一行返回单独的一列
     *  你想从行里取回的列的索引数字（以0开始的索引）。如果没有提供值，则 PDOStatement::fetchColumn() 获取第一列。 
                        如果使用 PDOStatement::fetchColumn() 取回数据，则没有办法返回同一行的另外一列。
     */
    public function fetchColumn($index=0){
        return $this->res->fetchColum($index);
    }
    
    /**
     * 返回最后插入行的ID或序列值 
                    如果没有为参数 name 指定序列名称，PDO::lastInsertId() 则返回一个表示最后插入数据库那一行的行ID的字符串。 

                    如果为参数 name 指定了序列名称，PDO::lastInsertId() 则返回一个表示从指定序列对象取回最后的值的字符串。 
                    
                    如果当前 PDO 驱动不支持此功能，则 PDO::lastInsertId() 触发一个 IM001 SQLSTATE 。 
     */
    public function lastInsertId($name=null){
        return $this->res->lastInsertId($name);
    }
}


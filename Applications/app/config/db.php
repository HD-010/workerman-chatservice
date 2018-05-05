<?php
return [
    'DBconfig' => [
        'db'=>[
          'class'=>'yii\db\Connection',					//数据库连接类
          'dsn'=>'mysql:host=127.0.0.1;dbname=echat',	    //数据库地址，名称
          'username'=>'root',								//用户名
          'password'=>'QWE!#qwe123',						//密码
          //'password'=>'root',						//密码
          'charset'=>'UTF8',								//使用字符集
          //'enableSchemaCache'=>'true',					//开数据库缓存
          //'schemaCache'=>'cache',							//缓存到runtime\cache目录
          //'schemaCachDruation'=>'3306',				    //缓存时间3600秒
          //'dbprefix'=>'',                                 //表前缀
        ],  
        
        'passport' => [
            'class'=>'yii\db\Connection',					//数据库连接类
            'dsn'=>'mysql:host=127.0.0.1;dbname=e01',	    //数据库地址，名称
            'username'=>'root',								//用户名
            'password'=>'QWE!#qwe123',						//密码
            //'password'=>'root',						//密码
            'charset'=>'UTF8',								//使用字符集
            //'enableSchemaCache'=>'true',					//开数据库缓存
            //'schemaCache'=>'cache',						//缓存到runtime\cache目录
            //'schemaCachDruation'=>'3306',				    //缓存时间3600秒
        ],
    ],
];
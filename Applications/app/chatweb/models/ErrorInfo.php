<?php 
class ErrorInfo
{
    public function type($No){
         $error = [
            '200' =>[
                "state" => "200",
                "infoType" => 'success',
                "description" => '执行成功'
            ],
            '4000' =>[
                "state" => "4000",
                "infoType" => 'error',
                "description" => '客户端提交数据时，token验证失败'
            ],
            '9000' =>[
                "state" => "9000",
                "infoType" => 'error',
                "description" => '向数据库写入数据失败'
            ],
            '8500' =>[
                "state" => "8500",
                "infoType" => 'error',
                "description" => '结果异常'
            ],
        
        ];
         
         return $error[$No];
        
    }
}
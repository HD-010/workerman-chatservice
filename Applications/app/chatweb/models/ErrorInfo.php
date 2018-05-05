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
            '1000' =>[
                "state" => "1000",
                "infoType" => 'error',
                "description" => '系统变量不能修改'
            ],
            '4000' =>[
                "state" => "4000",
                "infoType" => 'error',
                "description" => '客户端提交数据时，token验证失败'
            ],
            '8500' =>[
                "state" => "8500",
                "infoType" => 'error',
                "description" => '结果异常'
            ],
            '9000' =>[
                "state" => "9000",
                "infoType" => 'error',
                "description" => '向数据库写入数据失败'
            ],
            '9500' =>[
                "state" => "9500",
                "infoType" => 'error',
                "description" => '无效token！'
            ],
        
        ];
        
         if(is_array($No)){
             $res = $error[200];
             $res['data'] = $No;
             return $res;
         }
        return $error[$No];
        
    }
}

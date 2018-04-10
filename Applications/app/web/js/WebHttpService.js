/**
 * 在http服务中，主要定义了以ajax通过http异步传输数据的服务
 */
define(['jquery','Settings'],function($,Settings){
	var WebHttpService = {
		/**
		 * 发送数据
		 */
		sendMessage:function(data,api,callback){
			$.ajax({
				data:data,
				type:'post',
				dataType:'json',
				url:api,
				success:callback,
				error:function(res){
					console.log("错误：");
					console.log(res);
				}
			})
		},
		
		/**
		 * 请求数据
		 */
		requestMessage:function(){
			
		}
		
	}
	return WebHttpService;
});
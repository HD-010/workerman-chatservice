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
				datatype:'json',
				url:Settings.httpServer()+api,
				success:callback,
				error:function(data){
					console.log(data);
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
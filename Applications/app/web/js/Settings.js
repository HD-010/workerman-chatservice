define(function(){
	// 此文件下载者不用更改，兼容其他域名使用
	var Settings = {
		socketServer: function(service){
			var service = 'service' || '';
			// 如果是workerman.net phpgame.cn域名 则采用多个接入端随机负载均衡
			var domain_arr = ['workerman.net', 'www.workerman.net'];
			if(0 <= $.inArray(document.domain, domain_arr))
			{
				return 'ws://'+domain_arr[Math.floor(Math.random() * domain_arr.length + 1)-1]+':8282';
			}else if(service){
				return 'ws://47.93.201.12:8282';
			}else{
				// 运行在其它域名上
				console.log('ws://'+document.domain+':8282');
				return 'ws://'+document.domain+':8282';
			}
			
		},
		
		httpServer:function(){
			//return 'http://127.0.0.1:8383';
			return 'http://47.93.201.12:8383';
		},
		
		passportServer:function(){
			return 'http://passport.sqc666.com/';
		},
		
		/**
		 * 接收到的消息类型data.type与本地历史对象或数据库中历史（留言）对象前缀的对应关系
		 */
		receivMessageType: function(){
			return messageType = {
                  ecshc_ :'message',		//message类型表示发布公众信息
                  ecshg_ :'messageGroup',	//messageGroup类型表示群聊信息
                  ecshp_ :'messageTo'		//messageTo类型表示私聊信息
			};
		},
		
		/**
		 * 定义未查看记录数记录的前缀
		 * serverType 服务类型:
		 * 'ecspn_' 是私聊未查看记录数记录的前缀 echat service private notice
		 * 'ecscn_' 是公众演讲未查看记录数的前缀 echat service private notice
		 * 'ecsgn_' 是群聊未查看记录数的前缀 echat service private notice
		 */
		serverType: function(){
			return ['ecspn_','ecscn_','ecsgn_'];
		},
		
		/**
		 * 设置服务对象接口
		 * serviceName 服务名称
		 */
		serviceApi: function(serviceName){
			apis = {
				menu:'/chatweb/menu/'
			}
			return apis[serviceName];
		},
		
		/**
		 * 返回接口
		 */
		api: function(name){
			var uri = this.serviceApi(name)
			return this.httpServer() + uri;
		}
		
		
	}
	
	return Settings;
});


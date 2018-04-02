define(function(){
	// 此文件下载者不用更改，兼容其他域名使用
	var Settings = {
		socketServer: function(){
			// 如果是workerman.net phpgame.cn域名 则采用多个接入端随机负载均衡
			var domain_arr = ['workerman.net', 'www.workerman.net'];
			if(0 <= $.inArray(document.domain, domain_arr))
			{
				return 'ws://'+domain_arr[Math.floor(Math.random() * domain_arr.length + 1)-1]+':8282';
			}
			else
			{
				// 运行在其它域名上
				return 'ws://'+document.domain+':8282';
			}
			
		},
		
		receivMessageType: function(){
			return messageType = ['message','messageGroup','messageTo'];
		}
		
	}
	
	return Settings;
});


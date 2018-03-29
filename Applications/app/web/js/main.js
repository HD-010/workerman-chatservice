require.config({
	
    paths:{
        "jquery" : "http://cdn.e01.ren/common/lib/jquery",
        "common" : "http://cdn.e01.ren/common/f/common",
        "App" : "http://127.0.0.1:8383/js/App",
        "Settings" : "http://127.0.0.1:8383/js/Settings",
    	"WebSocketService" : "http://127.0.0.1:8383/js/WebSocketService",
    	"Model" : "http://127.0.0.1:8383/js/Model",
    	"User"  : "http://127.0.0.1:8383/js/User",
    }
});


require(["jquery","common","App","Settings","WebSocketService","Model","User"],function($,common,App,Settings,WebSocketService,Model,User){
	var app;
	
	$(document).ready(function(){
		
		var eChat = $("#eChat");
		//表情对象
		var chatFace = $("#chatFace");
		//发送信息对象
		var messageSend = $("#messageSend");
		
		//设置app页面的宽度和高度 为全屏
		eChat.width(window.innerWidth);
		eChat.height(window.innerHeight);
		
		//设置表情对象淡入炎出效果
		chatFace.mouseover(function(){
			if($(this).children('ul').eq(0).css('display') == 'none'){
				$(this).children('ul').eq(0).fadeIn('slow');
			}
		});
		chatFace.mouseout(function(){
			$(this).children('ul').eq(0).fadeOut('slow');
		});
		
		//选择表情后表情选择面板淡入
		chatFace.find('li').click(function(){
			chatFace.children('ul').eq(0).fadeOut('slow');
		});
		
		//发送消息
		messageSend.click(function(){
			app.sendMessage();
		});
		
		
	});
	
	(function(){
		//如果不支持Storage 则不
		if(typeof(Storage)==="undefined") {
			alert("你的浏览器不支持，请下载最新版本")
			return ;
		}
		
		var settings = new Settings();
		
		app = new App();
		
		//创建WebSocket对象
		app.webSocket = new WebSocket(settings.socketServer());
		
		//创建一个WebSocketService对象
		app.webSocketService = new WebSocketService(app.webSocket);
		
		//创建一个模块对象
		app.model = new Model();
		
		//创建用户对象
		app.user = new User();
		
		
		app.webSocket.onopen = app.onSocketOpen;
		
		app.webSocket.onmessage = app.onSocketMessage;
		
		app.webSocket.onclose = app.onSocketClose;
		
	})();
	

	
});

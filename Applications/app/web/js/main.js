require.config({
	
    paths:{
        "jquery" : "http://cdn.sqc666.com/common/lib/jquery",
        "common" : "http://cdn.sqc666.com/common/f/common",
        "App" : "/js/App",
        "Settings" : "/js/Settings",
    	"WebSocketService" : "/js/WebSocketService",
    	"Model" : "/js/Model",
    }
});


require(["jquery","common","App","Settings","WebSocketService","Model"],function($,common,App,Settings,WebSocketService,Model){
	
	
	(function(){
		var settings = new Settings();
		//创建WebSocket对象
		var webSocket = new WebSocket(settings.socketServer());

		//创建一个WebSocketService对象
		var webSocketService = new WebSocketService(webSocket);
		
		//创建一个模块对象
		var model = new Model();
		
		var app = new App();
		app.init(webSocket,webSocketService,model);
		
		
		app.webSocket.onopen = app.onSocketOpen;
		
		app.webSocket.onmessage = app.onSocketMessage;
		
		app.webSocket.onclose = app.onSocketClose;
		
	})();
	
	
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
			alert("ok");
		});
		
		
	});
	
});

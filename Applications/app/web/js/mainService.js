require.config({
    baseUrl:"http://47.93.201.12:8383/js/",
    //baseUrl:"http://127.0.0.1:8383/js/",

    paths:{
        "jquery" :  "http://cdn.sqc666.com/common/lib/jquery",
        "JSON":"JSON",
        "common" : "http://cdn.sqc666.com/common/f/common",
        "easyForm" : "http://cdn.sqc666.com/form/lib/easyForm",
        "WebSocket" : "WebSocket",
        "Storage" : "Storage",
        "AppService" : "AppService",
        "Settings" : "Settings",
    	"WebSocketService" : "WebSocketService",
    	"Model" : "Model",
    	"User"  : "User",
    	"EffectService" : "EffectService",
    	"Sing" : "Sing",
    	"History" : "History",
    	"WebHttpService" : "WebHttpService",
    	"MenuService" : "MenuService",
    	"Process" : "Process",
    	"RegistService" : "RegistService",
    	"EventsService" : "EventsService"
    }
});



require([
         "jquery",
         "JSON",
         "common",
         "WebSocket",
         "Storage",	
         "AppService",
         "Settings",
         "WebSocketService",
         "Model",
         "User",
         "EffectService",
         "Sing",
         "History",
         "WebHttpService",
         "MenuService",
         "RegistService",
         "EventsService"
         ],function(
        		 $,
        		 JSON,
        		 common,
        		 WebSocket,
        		 Storage,
        		 App,
        		 Settings,
        		 WebSocketService,
        		 Model,
        		 User,
        		 Effect,
        		 Sing,
        		 History,
        		 WebHttpService,
        		 Menu,
        		 regist,
        		 Events
		 ){
	
	var app = new App();
	
	(function(){
		
		app.webSocket = new WebSocket(Settings.socketServer()); //创建WebSocket对象
		app.webSocketService = new WebSocketService(app.webSocket);//创建一个WebSocketService对象
		app.model = new Model();	//创建一个视图模块对象
		app.user = new User();		//创建用户对象
		app.effect = new Effect();	//创建页面效果对象
		app.authorize = new Sing();	//创建
		app.menu = Menu;
		app.events = Events;
		app.regist = regist;
		
		app.webSocket.onopen = app.onSocketOpen;
		app.webSocket.onmessage = app.onSocketMessage;
		app.webSocket.onclose = app.onSocketClose;
	})();
	
	$(document).ready(function(){
		if( typeof(WebSocket) != "function" ) {
			$('body').html("<h1>Error</h1><p>Your browser does not support HTML5 Web Sockets. Try Google Chrome instead.</p>");
		}
		
		//如果不支持Storage 则不
		if(typeof(Storage)==="undefined") {
			alert("你的浏览器不支持，请下载最新版本")
			return ;
		}
	});
	
});

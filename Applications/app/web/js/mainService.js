require.config({
	
    paths:{
        "jquery" : "http://cdn.e01.ren/common/lib/jquery",
        "common" : "http://cdn.e01.ren/common/f/common",
        "easyForm" : "http://cdn.e01.ren/form/lib/easyForm",
        "App" : "http://127.0.0.1:8383/js/App",
        "Settings" : "http://127.0.0.1:8383/js/Settings",
    	"WebSocketService" : "http://127.0.0.1:8383/js/WebSocketService",
    	"Model" : "http://127.0.0.1:8383/js/Model",
    	"User"  : "http://127.0.0.1:8383/js/User",
    	"Effect"  : "http://127.0.0.1:8383/js/Effect",
    	"Sing" : "http://127.0.0.1:8383/js/Sing",
    	"History" : "http://127.0.0.1:8383/js/History",
    	"WebHttpService" : "http://127.0.0.1:8383/js/WebHttpService",
    	"MenuService" : "http://127.0.0.1:8383/js/MenuService",
    	"Process" : "http://127.0.0.1:8383/js/Process",
    	"Regist" : "http://127.0.0.1:8383/js/Regist",
    }
});


require([
         "jquery",
         "common",
         "App",
         "Settings",
         "WebSocketService",
         "Model",
         "User",
         "Effect",
         "Sing",
         "History",
         "WebHttpService",
         "MenuService",
         "Regist",
         "Events"
         ],function(
        		 $,
        		 common,
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
	var app;
	
	$(document).ready(function(){
		//注册onload事件
		regist.onLoad(app,Menu);
	});
	
	(function(){
		//如果不支持Storage 则不
		if(typeof(Storage)==="undefined") {
			alert("你的浏览器不支持，请下载最新版本")
			return ;
		}
		
		app = new App();
		app.webSocket = new WebSocket(Settings.socketServer()); //创建WebSocket对象
		app.webSocketService = new WebSocketService(app.webSocket);//创建一个WebSocketService对象
		app.model = new Model();	//创建一个视图模块对象
		app.user = new User();		//创建用户对象
		app.effect = new Effect();	//创建页面效果对象
		app.authorize = new Sing();	//创建
		
		app.webSocket.onopen = app.onSocketOpen;
		app.webSocket.onmessage = app.onSocketMessage;
		app.webSocket.onclose = app.onSocketClose;
		
	})();
	

	
});

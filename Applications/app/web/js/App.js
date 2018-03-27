define(['webSocketService'],function(webSocketService){
	var App = function(){
		var app = this;
		app.webSocket;
		app.webSocketService;
		app.model;
		
		app.init = function(aWebsocket,aWebSocketService,aModel){
			app.webSocket = aWebsocket;
			app.webSocketService = aWebSocketService;
			app.model = aModel;
		}
		
		app.onSocketOpen = function(e){
			console.log("连接成功...");
		}
		
		app.onSocketClose = function(e){
			app.webSocketService.connectionClosed();
		}
		
		app.onSocketMessage = function(e){
			try {
				var data = JSON.parse(e.data);
				app.webSocketService.processMessage(data,app.webSocketService,app.model);
			} catch(e) {console.log("出错")}
		}
		
		app.sendMessage = function(msg){
			console.log("发送信息成功");
		}
		
	};
		
	return App;
});
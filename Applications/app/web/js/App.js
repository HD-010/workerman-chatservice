define(['common'],function(common){
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
		
		app.sendMessage = function(){
			var date = new Date();
			var message = app.model.getInputContents();
			
			if(message){
				var sendObj = {
					userId : '10000',
					userClientId : common.getCookies('userClientId'),
					guestId : '1002',
					guestClientId : '7f0000010a8c00000002',
					
					type: 'messagePrivate',
					message: message,
					date : date.getMonth() + 1 + '/' +date.getDate() + ' ' + date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds(),
				};
				
				app.webSocketService.sendMessage(sendObj);
				//将发送的信息显示到页面
				app.model.messageSend(sendObj);
				//将发文本域中的消息显清空
				app.model.clearInputContents();
			}
		}
		
	};
	
	
	
	return App;
});
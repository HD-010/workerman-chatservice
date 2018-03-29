define(['common'],function(common){
	var App = function(){
		var app = this;
		app.webSocket;
		app.webSocketService;
		app.model;
		app.user;
		app.effect;
		
		
		/**
		 * 当与服务器连接成功时，向服务器注册访客和服务商家的id，用于关联访客和商家的会话
		 */
		app.onSocketOpen = function(e){
			console.log("连接成功...");
			console.log(e);
			//注册聊天用户信息,在会话开始时注册
			app.loginMessage();
			
			if(!app.webSocketService.serviceIsReg()){
				app.loginMessage();
			}
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
		
		/**
		 * 用户第一次打开在线服务界面时进行访客和服务id注册
		 */
		app.loginMessage = function(){
			var guestId = app.user.guestId();
			var serviceId = app.user.serviceId();
			
			console.log(guestId);
			console.log(serviceId);
			
			if(!guestId || !serviceId){
				return;
			}
			
			var sendObj = {
				guestId : app.user.guestId(),
				serviceId : app.user.serviceId(),
				
				type: 'login',
				message: '',
			};
			
			app.webSocketService.sendMessage(sendObj);
			
			//注册服务
			app.webSocketService.serviceReg();
		}
		
		/**
		 * 发送信息
		 */
		app.sendMessage = function(){
			var date = new Date();
			var message = app.model.getInputContents();
			
			if(message){
				var sendObj = {
					guestId : app.user.guestId(),									//访客id
					serviceId : app.user.serviceId(),									//服务id
					
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
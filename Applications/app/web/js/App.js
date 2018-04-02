define(['common','History'],function(common,History){
	var App = function(){
		var app = this;
		app.webSocket;
		app.webSocketService;
		app.model;
		app.user;
		app.effect;
		app.authorize;
		
		
		/**
		 * 当与服务器连接成功时，向服务器注册访客和服务商家的id，用于关联访客和商家的会话
		 */
		app.onSocketOpen = function(e){
			console.log("连接成功...");
			
			//注册聊天用户信息,在会话开始时注册
			app.loginMessage();
			
			if(!app.webSocketService.serviceIsReg()){
				app.loginMessage();
			}
		}
		
		app.onSocketClose = function(e){
			app.webSocketService.connectionClosed();
		}
		
		/**
		 * 当收到消息时……。
		 */
		app.onSocketMessage = function(e){
			try {
				var data = JSON.parse(e.data);
				//根据信息类型，处理后展示到页面
				app.webSocketService.processMessage(data,app.webSocketService,app.model);
			} catch(e) {console.log("出错")}
		}
		
		/**
		 * 用户第一次打开在线服务界面时进行访客和服务id注册
		 */
		app.loginMessage = function(){
			var guestId = app.user.guestId();
			var serviceId = app.user.serviceId();
			
			//如果访客id不存在，则无法将访客id与访客client_id绑定
			if(!guestId) return;
				
			var sendObj = {
				guestId : guestId,
				serviceId : serviceId,
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
				//保存聊天记录到本地的历史记录对象
				History.saveRecoder(sendObj);
				//将发文本域中的消息显清空
				app.model.clearInputContents();
			}
		}
		
	};
	
	
	
	return App;
});
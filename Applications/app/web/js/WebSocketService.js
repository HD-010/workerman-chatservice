var WebSocketService = function(model, webSocket) {
	var webSocketService = this;
	var webSocket = webSocket;
	var model = model;
	
	this.hasConnection = false;
	
	//当与服务器连接成功，并收到服务器返回的信息时，向小科斗对象赋予用户基本属性，设置用户id,设置用户名称
	this.welcomeHandler = function(data) {
		webSocketService.hasConnection = true;
		
		//设置用户id
		model.userTadpole.id = data.id;
		model.tadpoles[data.id] = model.tadpoles[-1];
		delete model.tadpoles[-1];
		
		$('#chat').initChat();
		
		//设置用户名称
		if($.cookie('todpole_name'))	{
			webSocketService.sendMessage('name:'+$.cookie('todpole_name'));
		}
	};
	
	this.updateHandler = function(data) {
		var newtp = false;
		
		//如果用户id不存在，则创建一个新的小科斗对象
		if(!model.tadpoles[data.id]) {
			//标识正在创建的这个对象是一个新的小科斗对象（一个新的科对象将会被赋予新的属性值）
			newtp = true;
			model.tadpoles[data.id] = new Tadpole();
			model.arrows[data.id] = new Arrow(model.tadpoles[data.id], model.camera);
		}
		
		var tadpole = model.tadpoles[data.id];
		
		if(tadpole.id == model.userTadpole.id) {			
			tadpole.name = data.name;
			return;
		} else {
			tadpole.name = data.name;
		}
		
		//设置小科斗位置参数
		if(newtp) {
			tadpole.x = data.x;
			tadpole.y = data.y;
		} else {
			tadpole.targetX = data.x;
			tadpole.targetY = data.y;
		}
		
		tadpole.angle = data.angle;
		tadpole.momentum = data.momentum;
		
		tadpole.timeSinceLastServerUpdate = 0;
	}
	
	/**
	 * 处理接收到的消息内容
	 * 公众演讲
	 */
	this.messageHandler = function(data) {
		var tadpole = model.tadpoles[data.id];
		if(!tadpole) {
			return;
		}
		tadpole.timeSinceLastServerUpdate = 0;
		tadpole.messages.push(new Message("可爱的用户"+data.message));
	}
	
	/**
	 * 处理接收到的消息内容
	 * 群聊
	 */
	this.messageGroupHandler = function(data){
		
	}
	
	/**
	 * 处理接收到的消息内容
	 * 私聊
	 */
	this.messagePrivateHandler = function(data){
		
	}
	
	this.closedHandler = function(data) {
		if(model.tadpoles[data.id]) {
			delete model.tadpoles[data.id];
			delete model.arrows[data.id];
		}
	}
	
	
	this.redirectHandler = function(data) {
		if (data.url) {
			if (authWindow) {
				authWindow.document.location = data.url;
			} else {
				document.location = data.url;
			}			
		}
	}
	
	/**
	 * 根据消息类型分别调用相应的方法对数据进行处理
	 * 这里调用的方法可以是上面声名的*Handler()
	 */
	this.processMessage = function(data) {
		var fn = webSocketService[data.type + 'Handler'];
		console.log(data.type + 'Handler');
		if (fn) {
			fn(data);
		}
	}
	
	//连接丢失后，显示提示信息“与服务器断开连接了。您可以重新刷新页面。”
	this.connectionClosed = function() {
		webSocketService.hasConnection = false;
		$('#cant-connect').fadeIn(300);
	};
	
	/**
	 * 更新用户名，如果一个用户 没有指定name,这个方法将用户 id 指定为用户名称
	 */
	this.sendUpdate = function(tadpole) {
		var sendObj = {
			type: 'update',
			x: tadpole.x.toFixed(1),
			y: tadpole.y.toFixed(1),
			angle: tadpole.angle.toFixed(3),
			momentum: tadpole.momentum.toFixed(3)
		};
		
		if(tadpole.name) {
			sendObj['name'] = tadpole.name;
		}
		webSocket.send(JSON.stringify(sendObj));
	}
	
	/**
	 * 发送信息
	 * 如果发送的内容是 “name:xxx” 格式，则将xxx设置为用户名
	 * 否则作为消息内容发送
	 */
	this.sendMessage = function(msg) {
		var regexp = /name: ?(.+)/i;
		if(regexp.test(msg)) {
			//取出用户名
			model.userTadpole.name = msg.match(regexp)[1];
			//将用户名存入cookie
			$.cookie('todpole_name', model.userTadpole.name, {expires:14});
			return;
		}
		//发送消息
		var sendObj = {
			type: 'message',
			message: msg
		};
		
		webSocket.send(JSON.stringify(sendObj));
	}
	
	//用户受权
	this.authorize = function(token,verifier) {
		var sendObj = {
			type: 'authorize',
			token: token,
			verifier: verifier
		};
		
		webSocket.send(JSON.stringify(sendObj));
	}
}
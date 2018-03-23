/**
 * aSettings websocket地址
 * aCanvas canvas dom 对象
 */

var App = function(aSettings, aCanvas) {
	var app = this;
	
	var 	model,
			canvas,
			context,
			webSocket,
			webSocketService,
			mouse = {x: 0, y: 0, worldx: 0, worldy: 0, tadpole:null},
			keyNav = {x:0,y:0},
			//消息配额
			messageQuota = 5
	;
	
	app.update = function() {
	  if (messageQuota < 5 && model.userTadpole.age % 50 == 0) { messageQuota++; }
	  
		// Update usertadpole
		if(keyNav.x != 0 || keyNav.y != 0) {
			model.userTadpole.userUpdate(model.tadpoles, model.userTadpole.x + keyNav.x,model.userTadpole.y + keyNav.y);
		}
		else {
			var mvp = getMouseWorldPosition();
			mouse.worldx = mvp.x;
			mouse.worldy = mvp.y;
			model.userTadpole.userUpdate(model.tadpoles, mouse.worldx, mouse.worldy);
		}
		
		if(model.userTadpole.age % 6 == 0 && model.userTadpole.changed > 1 && webSocketService.hasConnection) {
			model.userTadpole.changed = 0;
			webSocketService.sendUpdate(model.userTadpole);
		}
		
		model.camera.update(model);
		
		// Update tadpoles
		for(id in model.tadpoles) {
			model.tadpoles[id].update(mouse);
		}
		
		// Update waterParticles
		for(i in model.waterParticles) {
			model.waterParticles[i].update(model.camera.getOuterBounds(), model.camera.zoom);
		}
		
		// Update arrows
		for(i in model.arrows) {
			var cameraBounds = model.camera.getBounds();
			var arrow = model.arrows[i];
			arrow.update();
		}
	};
	
	
	//Canvs绘图
	app.draw = function() {
		model.camera.setupContext();
		
		// Draw waterParticles
		//绘制水
		for(i in model.waterParticles) {
			model.waterParticles[i].draw(context);
		}
		
		// Draw tadpoles
		//绘制小科斗
		for(id in model.tadpoles) {
			model.tadpoles[id].draw(context);
		}
		
		// Start UI layer (reset transform matrix)
		model.camera.startUILayer();
		
		// Draw arrows
		//绘制数组中的信息，如：messageHandler.draw(context, canvas)
		//updateHandler.draw(context, canvas)
		//pingHandler.draw(context, canvas)
		for(i in model.arrows) {
			console.log(model.arrows[i]);
			console.log(canvas)
			model.arrows[i].draw(context, canvas);
		}
	};
		
	
	//声明webSocket连接打开时的回调函数
	app.onSocketOpen = function(e) {
		//console.log('Socket opened!', e);
		
		//FIXIT: Proof of concept. refactor!
		uri = parseUri(document.location)
		if ( uri.queryKey.oauth_token ) {
			app.authorize(uri.queryKey.oauth_token, uri.queryKey.oauth_verifier)						
		}
		// end of proof of concept code.
	};
	
	//声明webSocket连接关闭时的回调函数
	app.onSocketClose = function(e) {
		//console.log('Socket closed!', e);
		webSocketService.connectionClosed();
	};
	
	//声明通过webSocket连接收到服务端信息时的回调函数（当接收到信息时进行异常分析）
	app.onSocketMessage = function(e) {
		try {
			var data = JSON.parse(e.data);
			webSocketService.processMessage(data);
		} catch(e) {}
	};
	
	//发送消息
	app.sendMessage = function(msg) {
	  
	  if (messageQuota>0) {
	    messageQuota--;
	    webSocketService.sendMessage(msg);
	  }
	  
	}
	
	//用户受权
	app.authorize = function(token,verifier) {
		webSocketService.authorize(token,verifier);
	}
	
	//鼠标按下事件
	app.mousedown = function(e) {
		mouse.clicking = true;

		if(mouse.tadpole && mouse.tadpole.hover && mouse.tadpole.onclick(e)) {
            return;
		}
		if(model.userTadpole && e.which == 1) {
			model.userTadpole.momentum = model.userTadpole.targetMomentum = model.userTadpole.maxMomentum;
		}


	};
	
	
	app.mouseup = function(e) {
		if(model.userTadpole && e.which == 1) {
			model.userTadpole.targetMomentum = 0;
		}
	};
	
	//鼠标移动事件
	app.mousemove = function(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};

	//方向键按下的事件控制
	app.keydown = function(e) {
		if(e.keyCode == keys.up) {
			keyNav.y = -1;
			model.userTadpole.momentum = model.userTadpole.targetMomentum = model.userTadpole.maxMomentum;
			e.preventDefault();
		}
		else if(e.keyCode == keys.down) {
			keyNav.y = 1;
			model.userTadpole.momentum = model.userTadpole.targetMomentum = model.userTadpole.maxMomentum;
			e.preventDefault();
		}
		else if(e.keyCode == keys.left) {
			keyNav.x = -1;
			model.userTadpole.momentum = model.userTadpole.targetMomentum = model.userTadpole.maxMomentum;
			e.preventDefault();
		}
		else if(e.keyCode == keys.right) {
			keyNav.x = 1;
			model.userTadpole.momentum = model.userTadpole.targetMomentum = model.userTadpole.maxMomentum;
			e.preventDefault();
		}
	};
	
	//方向放开的事件控制
	app.keyup = function(e) {
		if(e.keyCode == keys.up || e.keyCode == keys.down) {
			keyNav.y = 0;
			if(keyNav.x == 0 && keyNav.y == 0) {
				model.userTadpole.targetMomentum = 0;
			}
			e.preventDefault();
		}
		else if(e.keyCode == keys.left || e.keyCode == keys.right) {
			keyNav.x = 0;
			if(keyNav.x == 0 && keyNav.y == 0) {
				model.userTadpole.targetMomentum = 0;
			}
			e.preventDefault();
		}
	};
	
	//触屏事件－一直接触着
	app.touchstart = function(e) {
	  e.preventDefault();
	  mouse.clicking = true;		
		
		if(model.userTadpole) {
			model.userTadpole.momentum = model.userTadpole.targetMomentum = model.userTadpole.maxMomentum;
		}
		
		var touch = e.changedTouches.item(0);
	    if (touch) {
	      mouse.x = touch.clientX;
	  		mouse.y = touch.clientY;      
	    }    
	}
	
	//触屏事件－一接触离开时
	app.touchend = function(e) {
	  if(model.userTadpole) {
			model.userTadpole.targetMomentum = 0;
		}
	}
	
	//触屏事件－一接触移动事件
	app.touchmove = function(e) {
		e.preventDefault();
    
	  	var touch = e.changedTouches.item(0);
		if (touch) {
		  mouse.x = touch.clientX;
			mouse.y = touch.clientY;      
		}		
	}
	
	//重置Canvas对象位置
	app.resize = function(e) {
		resizeCanvas();
	};
	
	
	var getMouseWorldPosition = function() {
		return {
			x: (mouse.x + (model.camera.x * model.camera.zoom - canvas.width / 2)) / model.camera.zoom,
			y: (mouse.y + (model.camera.y * model.camera.zoom  - canvas.height / 2)) / model.camera.zoom
		}
	}
	
	//设置Canvas对象的尺寸
	var resizeCanvas = function() {
//		canvas.width = window.innerWidth;
//		canvas.height = window.innerHeight;
		if(window.innerWidth < 768){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight - 100;
		}else{
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	};
	
	// Constructor
	(function(){
		//将Canvas dom对象赋值给canvas
		canvas = aCanvas;
		//创建画布
		context = canvas.getContext('2d');
		//设置画面大小
		resizeCanvas();
		
		//创建一个模型
		model = new Model();
		//为模型添加属性： websocket服务地址
		model.settings = aSettings;
		
		//为模型添加用户科斗对象
		model.userTadpole = new Tadpole();
		//添加的小科斗对象赋予id值
		model.userTadpole.id = -1;
		//将用户科斗对象与模型中的科斗对象的id进行关联
		model.tadpoles[model.userTadpole.id] = model.userTadpole;
		
		//为模型添加水纹对象
		model.waterParticles = [];
		for(var i = 0; i < 150; i++) {
			model.waterParticles.push(new WaterParticle());
		}
		
		//为模型添加属性：camera对象
		model.camera = new Camera(canvas, context, model.userTadpole.x, model.userTadpole.y);
		//为模型添加属性：arrows对象
		model.arrows = {};
		
		//创建WebSocket对象
		webSocket 				= new WebSocket( model.settings.socketServer );
		//指定webSocket连接打开时的回调函数
		webSocket.onopen 		= app.onSocketOpen;
		//指定webSocket连接关闭时的回调函数
		webSocket.onclose		= app.onSocketClose;
		//指定通过webSocket连接收到服务端信息时的回调函数
		webSocket.onmessage 	= app.onSocketMessage;
		
		//创建一个WebSocketService对象
		webSocketService		= new WebSocketService(model, webSocket);
	})();
	
}

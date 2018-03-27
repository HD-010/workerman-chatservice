define(function(){
	
	var webSocketService = function(webSocket) {
		this.welcomeHandler = function(data,aModel) {
			//接接收到信息显示到页面
			aModel.messageReceive(data);
			aModel.messageSend(data);
			
		};
		
		
		
		this.messageHandler = function(data,aModel) {
			//接接收到信息显示到页面
			console.log(data)
			aModel.messageReceive(data);
		}
		
		this.closedHandler = function(data) {
			
		}
		
		this.redirectHandler = function(data) {
			
		}
		
		this.sendMessage = function(sendObj) {
			webSocket.send(JSON.stringify(sendObj));
		}
		
		this.processMessage = function(data,webSocketService,aModel) {
			var webSocketService = webSocketService;
			
			var fn = webSocketService[data.type + 'Handler'];
			
			if (fn) {
				fn(data,aModel);
			}
		}
	}
	
	return webSocketService;
})
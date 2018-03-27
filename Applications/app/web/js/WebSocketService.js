define(function(){
	
	var webSocketService = function(webSocket) {
		this.welcomeHandler = function(data,aModel) {
			//接接收到信息显示到页面
			aModel.messageReceive(data);
			aModel.messageSend(data);
			
		};
		
		
		
		this.messageHandler = function(data) {
			//接接收到信息显示到页面
			aModel.messageSend(data);
		}
		
		this.closedHandler = function(data) {
			
		}
		
		this.redirectHandler = function(data) {
			
		}
		
		this.messageSend = function(data){
			//接接发送的信息显示到页面
			aModel.messageSend(data);
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
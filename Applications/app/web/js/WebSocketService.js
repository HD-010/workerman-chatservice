define(['common','History'],function(common,History){
	
	var webSocketService = function(webSocket) {
		
		/**
		 * 与服务器连接成功的提示
		 */
		this.welcomeHandler = function(data,aModel) {
			//接接收到信息显示到页面
			common.setCookie('userClientId',data.client_id,1/24);
			
			aModel.messageWelcom(data);
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js、Model.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并
		 * 
		 * 当前为第1后半步
		 */
		this.leavingTotalHandler = function(data,aModel){
			
			aModel.updateEcspn(data.message);
		}
		
		/**
		 * 公众演讲
		 */
		this.messageHandler = function(data,aModel) {
			//接接收到信息显示到页面
			console.log(data)
			aModel.messageReceive(data);
		}
		
		/**
		 * 群聊
		 */
		this.messageGroupHandler = function(data,aModel) {
			//接接收到信息显示到页面
			console.log(data)
			aModel.messageReceive(data);
		}
		
		/**
		 * 私聊
		 */
		this.messageToHandler = function(data,aModel) {
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
			console.log(data.type);
			var webSocketService = webSocketService;
			
			var fn = webSocketService[data.type + 'Handler'];
			
			if (fn) {
				fn(data,aModel);
				//保存聊天记录到本地的历史记录对象
				History.saveRecoder(data,aModel);
			}
		}
		
		/**
		 * 判断服务是否注册
		 * return boolen
		 */
		this.serviceIsReg = function(){
			return sessionStorage.getItem('echat_service_reg') == 'yes' ? true : false;
		}
		
		/**
		 * 注册服务
		 * return null
		 */
		this.serviceReg = function(){
			console.log("注册服务");
			sessionStorage.setItem('echat_service_reg','yes');
		}
	}
	
	return webSocketService;
})
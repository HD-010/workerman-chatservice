define(['common','History'],function(common,History){
	
	var webSocketService = function(webSocket) {
		
		/**
		 * 与服务器连接成功的提示
		 */
		this.welcomeHandler = function(data,app) {
			//接接收到信息显示到页面
			common.setCookie('userClientId',data.client_id,1/24);
			
			app.model.messageWelcom(data);
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js、Model.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并
		 * 
		 * 当前为第1后半步
		 */
		this.leavingTotalHandler = function(data,app){
			app.model.updateEcspn(data.message);
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并app.js
		 * 
		 * 当前为第3后半步
		 * 
		 * 注：留言可能有多条，下载下来的记录也是多条，所以这里是批量保存到本地历史记录，和接收单条消息不同。
		 * 所以这里单独写一个方法进行保存前的数据处理。调用的方法：History.saveRecoder(messages[i])
		 * 与this.processMessage()中调用的History.saveRecoder(data)相同。
		 * 为避免数据重复保存，完成当前操作后需要返回一个退出指令。
		 */
		this.leavingDownHandler = function(data,app){
			var messages = data.message;
			//如果有留言，则保存到本地历史，然后加载加载历史。如果没有留言，则直接加载历史记录
			if(messages.length > 0){
				for(var i = 0; i < messages.length; i++){
					History.saveRecoder(messages[i]);
				}
			}
			//下载留言完成后加载好友对应的聊天记录
			History.loadHistory(data.serviceId,app.model);
			if(app.origin == 'service'){
				//聊天记录下载完成后清除消息提示
				app.model.clearNotice('ecspn_',data.serviceId)
			}
			return true;
		}
		
		/**
		 * 公众演讲
		 */
		this.messageHandler = function(data,app) {
			//接接收到信息显示到页面
			console.log(data)
			app.model.messageReceive(data);
		}
		
		/**
		 * 群聊
		 */
		this.messageGroupHandler = function(data,app) {
			//接接收到信息显示到页面
			console.log(data)
			app.model.messageReceive(data);
		}
		
		/**
		 * 私聊
		 */
		this.messageToHandler = function(data,app) {
			//接接收到信息显示到页面
			app.model.messageReceive(data);
			
			//将正在咨询的商品信息展示到服务服务端窗口右上角
			if(app.origin == 'service'){
				app.model.modifyShow(data.addParams);
			}
		}
		
		this.closedHandler = function(data) {
			
		}
		
		this.redirectHandler = function(data) {
			
		}
		
		
		this.sendMessage = function(sendObj) {
			webSocket.send(JSON.stringify(sendObj));
		}
		
		this.processMessage = function(data,app) {
			var fn = app.webSocketService[data.type + 'Handler'];
			//这里的逻辑：当服务窗口打开时，消息直接显示，然后再添加到本地历史记录
			if (fn) {
				//当fn(data,aModel)===true 时不是在页面上展示信息，
				//而是将下载到的留言数据保存到本地历史记录，所以不需要再次保存在本地，
				if(fn(data,app) !== true){
					//保存聊天记录到本地的历史记录对象
					History.saveRecoder(data);
				};
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
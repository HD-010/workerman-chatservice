define(['common','History','Settings'],function(common,History,Settings){
	var App = function(){
		var app = this;
		app.webSocket;
		app.webSocketService;
		app.model;
		app.menu;
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
		 * 当收到信息时，需要对信息作以下几种情况分别处理 
		 * 1，判断当前服务方窗口是否打开，如果窗口是打开的，直接信息显示到信息列表
		 * 如果没有打，则在服务方列表处显示提示信息，
		 * 并将当前信息返回给webSocket服务器，服务器保存信息为未读
		 * 
		 */
		app.onSocketMessage = function(e){
			
			try {
				var data = JSON.parse(e.data);
				//判断当前服务方窗口是否打开
				if((data.serviceId != app.user.serviceId()) && (common.inArray(data.type,Settings.receivMessageType()) != '-1')){
					//if(common.inArray(data.type,Settings.receivMessageType()) != '-1'){
						app.renderMessage(data);
						app.model.noticeUpdate(data);
					//}
				}else{
					//根据信息类型，处理后展示到页面
					app.webSocketService.processMessage(data,app.webSocketService,app.model);
					//展示到页面时刷新页面效果
					app.effect.message.scrollTop()
				}
				
			} catch(e) {console.log(e)}
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
				//展示到页面时刷新页面效果
				app.effect.message.scrollTop()
			}
		}
		
		/**
		 * 服务窗口没有开启，将当前信息返回给webSocket服务器，要求存储到数据库
		 * 返回如下字段内容：
		 * 'historyId','guestId','serviceId','message','typeh','saveToHistory'
		 */
		app.renderMessage = function(render_data){
			var prefix; //历史记录对象前缀
			var render_data = render_data;
			if((prefix = common.inArray(render_data.type,Settings.receivMessageType())) != '-1'){
				//修改服务器操作指令
				render_data.type = 'SaveToDB';
				//添加历史记录对象标识
				render_data.historyId = prefix + render_data.serviceId;
				//添加历史记录对渠道类型是接收到还是发送出去
				render_data.typeh = 'receive';
				//根据用户权限，添加留言查看后是被删除还是被转存到历史记录表中
				render_data.saveToHistory = 0;
				app.webSocketService.sendMessage(render_data);
			}
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并
		 * 
		 * 当前为第1前半步
		 */
		app.downServerLeavingTotal = function(){
			//这是所有服务方的uid
			var serviceId = app.model.getServiceUids();
			
			if(!serviceId){
				return false;
			}
			
			var guestId = app.user.guestId();
			//获取私聊历史记录对象标识
			var historyObjTag = "('"+History.getHistoryObjTag('ecshp_',serviceId).toString()+"')";
			
			var sendObj = {
				guestId : guestId,
				serviceId : serviceId,
				type: 'downLeavingTotal',
				typeh: 'receive',
				historyId : historyObjTag,
				message: '',
				//是这权限配置项，标识当前访客有没有保存历史的权限。如果没有，从数据库读取数据后，数据据会被删除。
				//如果有，则数会被转存到历史消息表
				saveToHistory:'0'		
			};
			app.webSocketService.sendMessage(sendObj);
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并app.js
		 * 
		 * 当前为第3前半步
		 */
		app.downServerLeaving = function(){
			//这是所有服务方的uid
			var serviceId = app.user.serviceId();
			if(!serviceId){
				return false;
			}
			var guestId = app.user.guestId();
			//获取私聊历史记录对象标识
			var historyObjTag = History.getHistoryObjTag('ecshp_',serviceId).toString();
				
			var sendObj = {
				guestId : guestId,
				serviceId : serviceId,
				type: 'downLeaving',
				typeh: 'receive',
				historyId : historyObjTag,
				message: '',
				saveToHistory:'0'
			};
			
			app.webSocketService.sendMessage(sendObj);
		}

		
	};
	
	
	
	return App;
});
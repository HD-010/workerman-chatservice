define(['jquery','common'],function($,common){
	var Model = function(){
		var model = this;
		
		/**
		 * 获取文本域内容
		 */
		model.getInputContents = function(){
			return $('#chatText textarea').val();
		}
		/**
		 * 清空文本域内容
		 */
		model.clearInputContents = function(){
			$('#chatText textarea').val('');
		}
		
		/**
		 * 清空记录列表
		 */
		model.clearMessageList = function(){
			$('#chatList').find('table').html('');
		}
		
		
		/**
		 * 获取所有服务方列表对象
		 */
		model.getServiceList = function(){
			ServiceList = $('#echat_list .list') || false;
			ServiceList = (ServiceList.length === 0) ? false :ServiceList;
			return ServiceList;
		}
		
		/**
		 * 获取所有服务方对象
		 */
		model.getServices = function(){
			var serviceList = model.getServiceList();
			if(!serviceList){return false;}
			var Services = serviceList.children('dd');
			Services = (Services.length === 0) ? false :Services;
			return Services;
		}
		
		/**
		 * 获取指定uid服务对象
		 */
		model.getService = function(uid){
			return model.getServiceList().find('[uid='+uid+']') || false;
		}
		
		/**
		 * 获取所有服务方uid
		 */
		model.getServiceUids = function(){
			var uid = [];
			var services = model.getServices();
			
			if(!services){return false;}
			
			for(var i = 0; i < services.length; i++){
				uid.push(services.eq(i).attr('uid'));
			}
			return uid;
		}
		
		
		/**
		 * 展示欢迎词
		 */
		model.messageWelcom = function(data){
			var chatList = $('#chatList').find('table');
			//清空记录列表
			chatList.html("");
			
			var recive = model.boxWelcom();
			recive.find('[name=content]').eq(0).html(data.message);
			recive.find('[name=date]').eq(0).html(data.date);
			
			chatList.eq(chatList.length - 1).append(recive);
		}
		
		/**
		 * 展示接收到的消息
		 */
		model.messageReceive = function(data,showHistory){
			showHistory = showHistory || '';
			var recive = model.boxRecive();
			recive.find('[name=content]').eq(0).html(data.message);
			recive.find('[name=date]').eq(0).html(data.date);
			
			var chatList = $('#chatList').find('table');
			chatList.eq(chatList.length - 1).append(recive);
		}
		
		/**
		 * 接收到新消息时，更新页面和localStorage中的值
		 * localStorage中存储的对象为：'ecspn_' + data.serviceId
		 * 'ecspn_':echat service  private notice
		 */
		model.noticeUpdate = function(data){
			var notice = model.getService(data.serviceId).children('.listTag');
			var num = parseInt(notice.html()) + 1;
			notice.html(num);
			notice.show();
			
			//将未查看信息条数存储在本地，当打于服务窗口时，该数值是向服务器请求数据条数的依据
			localStorage.setItem('ecspn_' + data.serviceId,num)
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js、Model.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并
		 * 
		 * 当前为第1后半步
		 */
		model.updateEcspn = function(data){
			var ecspn_id,updateNum,historyId;
			for(var i = 0; i < data.length; i++){
				//需要更新对象的id
				historyId = data[i].historyId;
				ecspn_id = 'ecspn_' + historyId.substr(historyId.indexOf('_')+1);
				oldNum = localStorage.getItem(ecspn_id)|| 0;
				updateNum = parseInt(oldNum) + parseInt(data[i].total);
				//更新对象值
				//console.log('ecspn_id:'+ecspn_id + '||updateNum:'+updateNum);
				localStorage.setItem(ecspn_id, updateNum);
			}
		}
		
		/**
		 * 好友列表页面加载时:
		 * 1、将下载到留言的条数与本地未查看记录相加app.js  WebSocketService.js、Model.js
		 * 2、加载本地尚未查看的消息条数	所在文件model.js
		 * 3、当双击服务方列表时将服务器上的留言下载到本地与历史记录合并 
		 * 
		 * 当前为第2步
		 */
		model.loadLocalNotice = function(){
			var num,notice;
			//服务方对象
			var services = model.getServices();
			if(!services){return false;}
			
			for(var i=0; i < services.length; i++){
				var uid = services.eq(i).attr('uid');
				var ecspn_id = 'ecspn_' + uid;
				if(num = localStorage.getItem(ecspn_id)){
					notice = model.getService(uid).children('.listTag');
					//设置新值
					notice.html(num);
					notice.show();
				}
			}
		}
		
		/**
		 * 展示发送的消息
		 */
		model.messageSend = function(sendObj){
			var send = model.boxSend();
			send.find('[name=content]').eq(0).html(sendObj.message);
			send.find('[name=date]').eq(0).html(sendObj.date);
			
			var chatList = $('#chatList').find('table');
			chatList.eq(chatList.length - 1).append(send);
		}
		
		/**
		 * 接收消息的布局
		 */
		model.boxRecive = function(){
			var recive = "<tr name='recive' style='margin-top:1em;'>"+
				"<td width='2em'><img style='1em;height:0.8em;' src='http://127.0.0.1:8383/images/left.png' /></td>"+
				"<td style='text-align:left;'>"+
					"<ul>"+
						"<li name='content' style='border:1px solid #D5D5D5;border-radius: 0.5em;line-height:1.8em;padding: 0.4em;display:inline-block;'>收到的信息</li>"+
						"<li name='date' style='color:#C8B9C6;'>3/15 13:40</li>"+
					"</ul>"+
				"</td>"+
				"<td width='2em'></td>"+
			"</tr>";

			return $(recive);
		}
		/**
		 * 展示欢迎词的布局
		 */   
		model.boxWelcom = function(){
			var recive = "<tr name='recive' style='margin-top:1em;'>"+
			"<td width='2em'></td>"+
			"<td style='text-align:center;'>"+
				"<ul>"+
					"<li name='content' style='border:0;line-height:1.8em;padding: 0.4em;display:inline-block;'>收到的信息</li>"+
				"</ul>"+
			"</td>"+
			"<td width='2em'></td>"+
			"</tr>";
			
			return $(recive);
		}
		
		/**
		 * 发送消息的布局
		 */
		model.boxSend = function(){
			var send = "<tr name='send' style='margin-top:2em;'>"+
				"<td width='2em'></td><td style='text-align:right;'>"+
					"<ul>"+
						"<li name='content' style='border:1px solid #D5D5D5;border-radius: 0.5em;line-height:1.8em;padding: 0.4em;display:inline-block;background-color:#8CD0F3;'>发送的信息</li>"+
						"<li name='date' style='color:#C8B9C6;'>3/15 13:49</li>"+
					"</ul>"+
				"</td>"+
				"<td width='2em'><img style='width:1em;height:0.8em;' src='http://127.0.0.1:8383/images/right.png' /></td>"+
			"</tr>";
			
			return $(send);
		}
		
		
	}
	return Model;
});
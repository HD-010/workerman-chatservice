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
		 * 选中好友时加载好友对应的聊天记录
		 * 说明：
		 * 聊天记录存放在localStorage的'ecsh_'+userInfo.id 对象中
		 * 聊天记录对象数据格式如：
		 * 'ecsh_'+userInfo.id= [
		 * 		{
		 * 			type:'recive',
		 * 			message:'content',
		 * 			date:'4/1 :12:37'
		 * 		},
		 * 		{
		 * 			type:'send',
		 * 			message:'content',
		 * 			date:'4/1 :12:37'
		 * 		},
		 * ]
		 * 调用位置：main.js app.model.loadHostRecod(userInfo.id)
		 */
		model.loadHostRecod = function(serviceId){
			var hostRecodId = 'ecsh_'+serviceId || 'ecsh_69826';
			//聊天记录对象
			var hostRecoder = localStorage.getItem(hostRecodId) || [{type:'welcom',message:'欢迎使用易service',date:'4/1 :12:37'}];
			
			for(var i = 0; i < hostRecoder.length; i++){
				if(hostRecoder[i].type === 'recive'){
					model.messageReceive(hostRecoder[i]);
					continue;
				}
				if(hostRecoder[i].type === 'send'){
					model.messageSend(hostRecoder[i]);
					continue;
				}
				if(hostRecoder[i].type === 'welcom'){
					model.messageWelcom(hostRecoder[i]);
					continue;
				}
				
			}
		}
		
		/**
		 * 展示欢迎词
		 */
		model.messageWelcom = function(data){
			var chatList = $('#chatList').find('table');
			//清空记录列表
			chatList.html("");
			
			var recive = this.boxWelcom();
			recive.find('[name=content]').eq(0).html(data.message);
			recive.find('[name=date]').eq(0).html(data.date);
			
			chatList.eq(chatList.length - 1).append(recive);
		}
		
		/**
		 * 展示接收到的消息
		 */
		model.messageReceive = function(data){
			var recive = this.boxRecive();
			recive.find('[name=content]').eq(0).html(data.message);
			recive.find('[name=date]').eq(0).html(data.date);
			
			var chatList = $('#chatList').find('table');
			chatList.eq(chatList.length - 1).append(recive);
		}
		
		/**
		 * 展示发送的消息
		 */
		model.messageSend = function(sendObj){
			var send = this.boxSend();
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
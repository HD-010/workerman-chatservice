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
		 * 更新接收到尚未查看的消息条数
		 * 'ecspn_':echat service  private notice
		 */
		model.noticeUpdate = function(data){
			//pc端
			var friendsList = $('#echat_list .list');
			//被标识的好友列表
			var serviceList = friendsList.children('[uid='+data.serviceId+']').children('.listTag');
			var num = parseInt(serviceList.html()) + 1;
			serviceList.html(num);
			serviceList.show();
			
			//将未查看信息条数存储在本地，当打于服务窗口时，该数值是向服务器请求数据条数的依据
			localStorage.setItem('ecspn_' + data.serviceId,num)
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
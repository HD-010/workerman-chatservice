define(['jquery'],function($){
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
		 * 展示接收到的消息
		 */
		model.messageReceive = function(data){
			var recive = this.boxRecive();
			recive.find('[name=content]').eq(0).html(data.message);
			console.log(data)
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
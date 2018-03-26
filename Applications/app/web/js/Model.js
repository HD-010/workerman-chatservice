define(['jquery'],function($){
	var Model = function(){
		var model = this;
		
		/**
		 * 展示接收到的消息
		 */
		model.messageReceive = function(data){
			var recive = this.boxRecive();
			recive.find('[name=content]').eq(0).html(data.id);
			
			var chatList = $('#chatList').find('table');
			chatList.eq(chatList.length - 1).append(recive);
		}
		
		/**
		 * 展示发送的消息
		 */
		model.messageSend = function(data){
			var send = this.boxSend();
			send.find('[name=content]').eq(0).html(data.id);
			
			var chatList = $('#chatList').find('table');
			chatList.eq(chatList.length - 1).append(send);
			
		}
		
		model.boxRecive = function(){
			var recive = "<tr name='recive' style='margin-top:1em;'>"+
				"<td width='2em'><img style='1em;height:0.8em;' src='/images/left.png' /></td>"+
				"<td style='text-align:left;'>"+
					"<ul>"+
						"<li name='content' style='border:1px solid #D5D5D5;border-radius: 0.5em;line-height:1.8em;padding: 0.4em 0 0.4em 0.4em;display:inline-block;'>收到的信息收到的信息收到的信息收到的信息收到的信息收到的信息收到的信息收到的信息</li>"+
						"<li style='color:#C8B9C6;'>3/15 13:40</li>"+
					"</ul>"+
				"</td>"+
				"<td width='2em'></td>"+
			"</tr>";

			return $(recive);
		}
		
		model.boxSend = function(){
			var send = "<tr name='send' style='margin-top:2em;'>"+
				"<td width='2em'></td><td style='text-align:right;'>"+
					"<ul>"+
						"<li name='content' style='border:1px solid #D5D5D5;border-radius: 0.5em;line-height:1.8em;padding: 0.4em;display:inline-block;background-color:#8CD0F3;'>发送的信息</li>"+
						"<li style='color:#C8B9C6;'>3/15 13:49</li>"+
					"</ul>"+
				"</td>"+
				"<td width='2em'><img style='width:1em;height:0.8em;' src='/images/right.png' /></td>"+
			"</tr>";
			
			return $(send);
		}
		
		
	}
	return Model;
});
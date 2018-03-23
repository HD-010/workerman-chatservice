// Settings controls
//消息控制
(function($){
	$.fn.initChat = function() {
		var input = $(this);
		//这是input内输入的聊天信息，这里显示的是input的value
		var chatText = $("#chatText");
		//这里input信息输入框是否显示的开关，默认不显示
		var hidden = true;
		//用于记录历史消息
		var messageHistory = [];
		//用于记录历史消息的条数
		var messagePointer = -1;
		
		//关闭聊天信息输入框，实现方式是将opacity设置为0，清空input值
		var closechat = function() {
			hidden = true;
			//input.css("opacity","0");
			messagePointer = messageHistory.length;
			//清空input输入的聊天信息
			input.val('');
			//清空显示的聊天信息
			chatText.text('')
		}

		//更新input 框的显示位置和宽度
		var updateDimensions = function(){
			chatText.text(input.val());
			var width = chatText.width() + 30;
			//设置文本框（被改成文本域）的样式
			input.css({
				width: width,
				//marginLeft: (width/2)*-1
				marginLeft: 0,
				padding:2,
			});
		};
		
		//输入框失去焦点后，每0.1秒获取一次焦点
		input.blur(function(e) {
			setTimeout(function(){input.focus()}, 0.1);
		});
		
		//当向input框输入信息时
		input.keydown(function(e){
			if(input.val().length > 0) {
				//set timeout because event occurs before text is entered
				//设置timeout,因为事件发生时，text已经输入
				setTimeout(updateDimensions,0.1);
				input.css("opacity","1");		
			} else {
				closechat();
			}
			
			//当文本框没有隐藏时，不再派发事件
			if(!hidden) {
				
				//不再派发事件
				e.stopPropagation();
				
				//如果消息记录大于0，按下up或down，选择输入历史记录中的消息
				if(messageHistory.length > 0) {
					if(e.keyCode == keys.up)
					{
						if(messagePointer > 0)
						{
							messagePointer--;
							input.val(messageHistory[messagePointer]);
						}
					}
					else if(e.keyCode == keys.down)
					{
						if(messagePointer < messageHistory.length-1)
						{
							messagePointer++;
							input.val(messageHistory[messagePointer]);
						}
						else 
						{
							closechat();
							return;
						}
					}
				}
			}
		});
		
		input.keyup(function(e) {

			var k = e.keyCode;
			if(input.val().length >= 45)
			{
				input.val(input.val().substr(0,45));
			}

			if(input.val().length > 0) {
				updateDimensions();
				input.css("opacity","1");
				hidden = false;
			} else {
				closechat();
			}
			//发送消息并关闭消息输入框
			if(!hidden) {
				//触发消息发送事件有以下几种情况：
				if(k == keys.esc || k == keys.enter || (k == keys.space && input.val().length > 35)) {
					//发送消息
					if(k != keys.esc && input.val().length > 0) {
						//将当前发送消息添加到历史记录
				    	messageHistory.push(input.val());
				    	//修正历史记录的条数
		    			messagePointer = messageHistory.length;
						app.sendMessage(input.val());
					}
					//发送消息后关闭输入框
					closechat();
				}
				//不再派发事件
				e.stopPropagation();

			}
			
		});
		
		input.focus();
	}
	
	$(function() {
		$('#chat').initChat();
	});
})(jQuery);

$(document).ready(function(){

	var eChat = $("#eChat");
	//表情对象
	var chatFace = $("#chatFace");
	//发送信息对象
	var messageSend = $("#messageSend");
	
	//设置app页面的宽度和高度 为全屏
	eChat.width(window.innerWidth);
	eChat.height(window.innerHeight);
	
	//设置表情对象淡入炎出效果
	chatFace.mouseover(function(){
		if($(this).children('ul').eq(0).css('display') == 'none'){
			$(this).children('ul').eq(0).fadeIn('slow');
		}
	});
	chatFace.mouseout(function(){
		$(this).children('ul').eq(0).fadeOut('slow');
	});
	
	//选择表情后表情选择面板淡入
	chatFace.find('li').click(function(){
		chatFace.children('ul').eq(0).fadeOut('slow');
	});
	
	//发送消息
	messageSend.click(function(){
		alert("ok");
	});
	
});

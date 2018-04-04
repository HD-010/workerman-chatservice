require.config({
	
    paths:{
        "jquery" : "http://cdn.e01.ren/common/lib/jquery",
        "common" : "http://cdn.e01.ren/common/f/common",
        "easyForm" : "http://cdn.e01.ren/form/lib/easyForm",
        "App" : "http://127.0.0.1:8383/js/App",
        "Settings" : "http://127.0.0.1:8383/js/Settings",
    	"WebSocketService" : "http://127.0.0.1:8383/js/WebSocketService",
    	"Model" : "http://127.0.0.1:8383/js/Model",
    	"User"  : "http://127.0.0.1:8383/js/User",
    	"Effect"  : "http://127.0.0.1:8383/js/Effect",
    	"Sing" : "http://127.0.0.1:8383/js/Sing",
    	"History" : "http://127.0.0.1:8383/js/History",
    }
});


require([
         "jquery",
         "common",
         "App",
         "Settings",
         "WebSocketService",
         "Model",
         "User",
         "Effect",
         "Sing",
         "History"
         ],function(
        		 $,
        		 common,
        		 App,
        		 Settings,
        		 WebSocketService,
        		 Model,
        		 User,
        		 Effect,
        		 Sing,
        		 History
        		 ){
	var app;
	
	$(document).ready(function(){
		
		var eChat = $("#eChat");
		//表情对象
		var chatFace = $("#chatFace");
		//发送信息对象
		var messageSend = $("#messageSend");
		
		//设置app页面的宽度和高度 为全屏
		eChat.width(window.innerWidth);
		eChat.height(window.innerHeight);
		
		/**
		 * 登录验证
		 * 当用户登录成功时向websocket发送绑定uid和client_id的信息
		 */
		$("input[name=uname]").blur(app.authorize.checkConut);
		$("input[name=pswd]").blur(app.authorize.checkPswd);
		$("input[name=Verification]").blur(app.authorize.checkVerification);
		$("form[name='singIn'] input[type=submit]").click(app.authorize.loginSubmit);
		
		
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
		messageSend.click(app.sendMessage);
		
		//-------------------好友列表操作---------------------
		//设置选中好友的显示效果
		var userList = $.find('#echat_list .list dd');
		$(userList).dblclick(function(){
			var userInfo = {
				id: $(this).attr('uid'),
				nick: $(this).text()
			}
			//选中好友时，将选中的对象设为服务方
			app.user.setServiceInfo(userInfo);
			
			//设置选中好友列表的背景色效果
			app.effect.friendsList.selectFriend($(this));
			
			//选中好友时，将服务端留言下载到本地，与本地未查看消息合并
			
			//选中好友时加载好友对应的聊天记录
			History.loadHistory(userInfo.id,app.model);
			
		});
		
		//设置选中分组的显示效果
		var userGrout = $.find('#echat_list .list dt');
		$(userGrout).click(function(){
			app.effect.friendsList.selectGroup($(this));
		});
		
		
		//-------------------页面加载时的操作---------------------
		app.downServerLeavingTotal();
		app.model.loadLocalNotice();
		
	});
	
	(function(){
		//如果不支持Storage 则不
		if(typeof(Storage)==="undefined") {
			alert("你的浏览器不支持，请下载最新版本")
			return ;
		}
		
		app = new App();
		app.webSocket = new WebSocket(Settings.socketServer()); //创建WebSocket对象
		app.webSocketService = new WebSocketService(app.webSocket);//创建一个WebSocketService对象
		app.model = new Model();	//创建一个视图模块对象
		app.user = new User();		//创建用户对象
		app.effect = new Effect();	//创建页面效果对象
		app.authorize = new Sing();	//创建
		
		app.webSocket.onopen = app.onSocketOpen;
		app.webSocket.onmessage = app.onSocketMessage;
		app.webSocket.onclose = app.onSocketClose;
		
	})();
	

	
});

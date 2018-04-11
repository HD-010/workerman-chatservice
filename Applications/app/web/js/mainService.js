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
    	"WebHttpService" : "http://127.0.0.1:8383/js/WebHttpService",
    	"MenuService" : "http://127.0.0.1:8383/js/MenuService",
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
         "History",
         "WebHttpService",
         "MenuService"
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
        		 History,
        		 WebHttpService,
        		 Menu
        		 ){
	var app;
	
	$(document).ready(function(){
		
		var eChat = $("#eChat");
		//表情对象
		var chatFace = $("#chatFace");
		//右键菜单对象
		var rightMenu = $("#rightMenu");
		//好友列表菜单对象
		var friendsMenu = $("#echat_menu");
		//好友列表子菜单对象
		var childMenu = $("#childMenu");
		//私聊好友列表对象
		var privateList = $("#echat_list dl[typeId='list']");
		//添加分组对象
		var addGroup = $("#addGroup");
		//修改好友分组名称的对象
		var alterGroup = $("#alterGroup");
		//发送信息对象
		var messageSend = $("#messageSend");
		
		//设置app页面的宽度和高度 为全屏
		eChat.width(window.innerWidth);
		eChat.height(window.innerHeight);
		
		/**
		 * 登录验证
		 * 当用户登录成功时向websocket发送绑定uid和client_id的信息
		 */
		var isRegNew = $("input[name=pswd2]").length ? true :false;
		
		$("input[name=uname]").change(app.authorize.checkConut);
		//密码项校验（分用户登录和用户注册密码校验）
		$("input[name=pswd]").change(function(){
			//         注册密码校验							登录密码校验
			isRegNew ? app.authorize.checkPswd1() : app.authorize.checkPswd();
		});
		//确认密码项校验
		$("input[name=pswd2]").change(app.authorize.checkPswd2);
		$("input[name=Verification]").change(app.authorize.checkVerification);
		//登录/注册表单submit click事件（分用户登录和用户注册提交）
		$("form[name='sing'] input[type=submit]").click(function(){
			isRegNew ? app.authorize.upSubmit(event) : app.authorize.loginSubmit(event);
		});
		
		//------------------设置右键菜单对象的效果----------------
		//在友好分组上呼出右键菜单
		privateList.find(".option").mousedown(function(){
			app.effect.rightMenu.show(event);
			//准备后继操作的数据
			Menu.process.info(this);
		});
		//在友好名单上呼出右键菜单
		privateList.find(".discription").mousedown(function(){
			app.effect.rightMenu.show(event);
			//准备后继操作的数据
			Menu.process.info(this);
		});
		//阻止右键放开时的默认事件
		rightMenu.mouseup(app.effect.rightMenu.stop);
		//设置鼠标在右键菜单列表上移动时的效果
		rightMenu.find("li").mouseover(function(){
			app.effect.rightMenu.flush(this);
			app.effect.rightMenu.childShow(this);
		});
		rightMenu.children("li").mouseout(function(){
			app.effect.rightMenu.childHide(this);
		});
		rightMenu.mouseleave(function(){
			app.effect.rightMenu.hidden()
		});
		
		//------------------设置右键菜单对象的业务----------------
		rightMenu.find("li").click(function(){
			Menu.process.action(this,app.effect);
		});
		
		
		//----------------设置表情操作对象效果-----------------
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
		
		//---------------设置好友列表菜单对象效果--------------
		friendsMenu.find('td').click(function(){
			app.effect.friendsMenu.setcolor(this);
			app.effect.friendsMenu.controlListView(this);
		});
		childMenu.children("li").mouseover(function(){
			app.effect.childMenu.flush(this);
		});
		childMenu.children('li').click(function(){
			app.effect.childMenu.outMenu(this);
		})
		friendsMenu.find("button[typeId='childMenu']").click(function(){
			app.effect.childMenu.showMenu();
		});
		
		//显示添加分组对话框
		childMenu.find('li[typeId=addGroup]').click(app.effect.childMenu.showAddGroup);
		//取消添加分组对话框
		addGroup.find('input[name="cancleAddGroup"]').click(app.effect.childMenu.cancleAddGroup);
		//添加分组数据验证
		addGroup.find('input[name="groupName"]').change(Menu.valid.groupName);
		//添加好友分组
		addGroup.find('input[name="submitAddGroup"]').click(function(event){
			Menu.group.add(event);
			app.effect.childMenu.cancleAddGroup(event);
		});
		
		//显示修改分组对话框,该方法在点击右键菜单时调用
		//Effect.childMenu.showAlterGroup();
		//修改分组名称数据验证
		alterGroup.find('input[name="groupName"]').change(Menu.valid.alterGroupName);
		//取消修改分组对话框
		alterGroup.find('input[name="cancleAlterGroup"]').click(app.effect.childMenu.cancleAlterGroup);
		//修改好友分组名称
		alterGroup.find('input[name="submitAlterGroup"]').click(function(event){
			Menu.group.alter(event);
			//提交后退出对话框
			app.effect.childMenu.cancleAlterGroup(event);
		});
		
		
		
		
		//-------------------发送消息---------------------
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
			
			//选中好友时，将服务端留言下载到本地，与本地未查看消息合并，然后加载到页面
			app.downServerLeaving();
			
			
		});
		
		//设置选中分组的显示效果
		var userGrout = $.find('#echat_list .list dt');
		$(userGrout).click(function(){
			app.effect.friendsList.selectGroup($(this));
		});
		
		
		//-------------------页面加载时的操作---------------------
		//下载留言总记录条数到本地，并加载到列表提示位置
		app.downServerLeavingTotal();
		
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

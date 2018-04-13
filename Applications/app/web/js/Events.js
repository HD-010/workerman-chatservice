define(function(){
	var Events = {
			/**
			 * 注册页面布局事件
			 */
			setLayout:function(app){
				app.effect.pageOnload();
			},
			
			/**
			 * 注册信息发送事件
			 */
			messageSendEvents:function(app){
				//发送信息对象
				var messageSend = $("#messageSend");
				
				//-------------------发送消息---------------------
				messageSend.click(app.sendMessage);
			},
			
			/**
			 * 设置登录验证事件
			 * 当用户登录成功时向websocket发送绑定uid和client_id的信息
			 */
			singEvents:function(app){
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
			},
			
			
			/**
			 * 设置表情操作对象事件
			 */
			chatFaceEvents:function(){
				//表情对象
				var chatFace = $("#chatFace");
				
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
			},
			
			/**
			 * 设置右键菜单对象事件
			 */
			rightMenuEvents:function(app,Menu){
				var privateList = $("#echat_list dl[typeId='list']");
				var rightMenu = $("#rightMenu");
				
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
			},
			
			/**
			 * 设置好友列表菜单对象事件
			 */
			friendsMenuEvents:function(app){
				//好友列表菜单对象
				var friendsMenu = $("#echat_menu");
				//好友列表子菜单对象
				var childMenu = $("#childMenu");
				
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
			},
			
			/**
			 * 设置好友列表分组对象事件
			 */
			friendsGroupEvents:function(app,Menu){
				//好友列表子菜单对象
				var childMenu = $("#childMenu");
				//添加分组对象
				var addGroup = $("#addGroup");
				//修改好友分组名称的对象
				var alterGroup = $("#alterGroup");
				
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
			},
			
			/**
			 * 选中好友的对象
			 */
			selectFriendEvents:function(app){
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
			},
			
			/**
			 * 设置选中分组的显示效果
			 */
			selectFriendGroupEvents:function(app){
				var userGrout = $.find('#echat_list .list dt');
				
				$(userGrout).click(function(){
					app.effect.friendsList.selectGroup($(this));
				});
			},
			
			/**
			 * 查找好友的视图对象事件
			 */
			findFriendsEvents:function(app,Menu){
				//展示查找好的视图对象
				var findFriends = $("#findFriends");
				//好友列表子菜单对象
				var childMenu = $("#childMenu");
				//展示好友的资料视图对象
				var lookProfiles = $("#lookProfiles");
				
				//显示查找好友视图
				childMenu.find('li[typeId=searchFriends]').click(function(){
					app.effect.findFriends.showOut();
					Menu.friends.find(app.model,app.effect);
				});
				//关闭查找好友的视图
				findFriends.find('div[name=shutDown]').click(app.effect.findFriends.shutDown);
				//性别筛选文字颜色控制
				findFriends.find('select[name=sex]').change(function(){
					$(this).css({'color':'A9A9A9'});
					if($(this).val()){
						$(this).css({'color':'currentColor'});
					}
				});
				//查找下一批名单
				findFriends.find('a[name=nextBatch]').click(function(event){
					event.preventDefault();
					Menu.friends.find(app.model,app.effect);
				});
				//按条件搜索
				findFriends.find('input[name=search]').click(function(event){
					event.preventDefault();
					Menu.friends.findByCondition(app.model,app.effect);
				});
				//关闭查看好友资料的视图
				lookProfiles.find('div[name=shutDown]').click(app.effect.lookProfiles.shutDown);
				
			}
	}
	
	return Events;
});
/**
 * 文件记录了加载视图时需要注册的事件
 */
define(['EventsService','MenuService'],function(Events,Menu){
	
	var regist = {
			/**
			 * 注册查找友有列表中好友实体相关事件
			 */			
			findFriendEvents:{
				
				/**
				 * 查看资料
				 */
				showProfile:function(app){
					var findFriends = $("#findFriends");
					findFriends.find("li[name=lookProfiles] a").on("click",function(event){
						var e = event || window.event;
						if(event.preventDefault){
							e.preventDefault();
						}else{
							e.returnValue = false;
						};
						app.effect.lookProfiles.showOut();
						//从服务器获取用户资料
						var snid = $(this).parent().siblings('li[name=nick]').attr('snid');
						app.menu.profiles.read(snid);
					});
				},
				
				/**
				 * 添加好友
				 */
				addToFriends : function(friends){
					var findFriends = $("#findFriends");
					findFriends.find("input[name=addToFriends]").on("click",function(event){
						var e = event || window.event;
						if(event.preventDefault){
							e.preventDefault();
						}else{
							e.returnValue = false;
						};
						
						friends.add($(this).parent().parent().find('li[name=nick]'));
					});
				}
	
			},
			
			onLoad:function(app){
				//----------------注册页面布局事件-----------------
				Events.setLayout(app)
				
				//----------------注册信息发送对象事件-----------------
				Events.messageSendEvents(app);
				
				//----------------注册服务向导事件-----------------
				Events.talkGuide(app);
				
				//----------------注册登录验证事件-----------------
				Events.singEvents(app);
				
				//----------------注册户中心操作对象事件-----------------
				Events.userCenter(app);
				
				//----------------注册服务宝典操作对象事件-----------------
				Events.servicGuide(app);
				
				//----------------注册表情操作对象事件-----------------
				Events.chatFaceEvents();
				
				//----------------注册右键菜单对象事件-----------------
				Events.rightMenuEvents(app)
				
				//---------------注册好友列表菜单对象事件--------------
				Events.friendsMenuEvents(app);
				
				//---------------注册好友列表分组对象事件--------------
				Events.friendsGroupEvents(app);
				
				//---------------注册好友列表选中事件--------------
				Events.selectFriendEvents(app);
				
				//---------------注册好友列表选中事件--------------
				Events.selectFriendGroupEvents(app);
				
				//---------------注册查找好友的视图对象事件--------------
				Events.findFriendsEvents(app);
				
				//下载留言总记录条数到本地，并加载到列表提示位置
				app.downServerLeavingTotal(app);
			}
	}
	
	
	
	return regist;
});

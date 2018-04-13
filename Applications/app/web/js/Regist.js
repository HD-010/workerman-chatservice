/**
 * 文件记录了加载视图时需要注册的事件
 */
define(['Events','MenuService'],function(Events,Menu){
	
	var regist = {
			/**
			 * 注册查找友有列表中好友实体相关事件
			 */			
			findFriendEvents:{
				
				/**
				 * 查看资料
				 */
				showProfile:function(effect){
					var findFriends = $("#findFriends");
					findFriends.find("li[name=lookProfiles] a").on("click",function(event){
						event.preventDefault();
						effect.lookProfiles.showOut()
					});
				},
				
				/**
				 * 添加好友
				 */
				addToFriends : function(friends){
					var findFriends = $("#findFriends");
					findFriends.find("input[name=addToFriends]").on("click",function(event){
						event.preventDefault();
						
						friends.add($(this).parent().parent().find('li[name=nick]'));
					});
				}
	
			},
			
			onLoad:function(app,Menu){
				//----------------注册信息对象事件-----------------
				Events.messageSendEvents(app);
				
				//----------------注册登录验证事件-----------------
				Events.singEvents(app);
				
				//----------------注册表情操作对象事件-----------------
				Events.chatFaceEvents();
				
				//----------------注册右键菜单对象事件-----------------
				Events.rightMenuEvents(app,Menu)
				
				//---------------注册好友列表菜单对象事件--------------
				Events.friendsMenuEvents(app);
				
				//---------------注册好友列表分组对象事件--------------
				Events.friendsGroupEvents(app,Menu);
				
				//---------------注册好友列表选中事件--------------
				Events.selectFriendEvents(app);
				
				//---------------注册好友列表选中事件--------------
				Events.selectFriendGroupEvents(app);
				
				//---------------注册查找好友的视图对象事件--------------
				Events.findFriendsEvents(app,Menu);
				
				//下载留言总记录条数到本地，并加载到列表提示位置
				app.downServerLeavingTotal();
			},
	}
	
	
	
	return regist;
});

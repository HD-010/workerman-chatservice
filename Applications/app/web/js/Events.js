define(function(){
	var Events = {
			/**
			 * 注册页面布局事件
			 */
			setLayout:function(app){
				app.effect.pageOnload();
				
				//关闭聊天窗口
				$("#chatfoot").find("a[name=goback]").click(app.effect.pageControl.off);
				
				//定义打开聊天窗口的接口
				window.openEChat = function(){
					alert("ij");
					$("#eChatBox").show();
				}
				
				//定义访客id设置接口，该接口到用户登录成功时调用
				window.setGuestId = function(echat_client){
					sessionStorage.setItem('echat_client',echat_client);
				}
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
			 * 设置用户中心操作对象事件
			 */
			userCenter:function(app){
				var childMenu = $("#childMenu");
				//显示添加用户资料展示面板
				var lookProfiles = $("#lookProfiles");
				childMenu.find('li[typeId=lookProfiles]').click(function(){
					//展示我的资料视图对象
					app.effect.editProfiles.showOut();
					//从服务器获取用户资料
					app.menu.profiles.read();
					
				});
				
				//编辑个人资料的视图控制
				lookProfiles.find('button[name=edit]').click(app.effect.editProfiles.enable);
				
				//保存个人资料的视图控制
				lookProfiles.find('button[name=save]').click(function(event){
					//阻止默认行为
					var e = event || window.event;
					if(event.preventDefault){
						e.preventDefault();
					}else{
						e.returnValue = false;
					};
					//保存编辑后的资料
					app.menu.profiles.save(app.effect.editProfiles.disable);
				});
				
				//验证输入的昵称
				lookProfiles.find('input[name=nick]').change(app.menu.valid.profileNick);
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
			
	}
	
	return Events;
});

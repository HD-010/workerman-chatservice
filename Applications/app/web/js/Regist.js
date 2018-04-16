/**
 * 文件记录了加载视图时需要注册的事件
 */
define(['Events','Menu'],function(Events,Menu){
	
	var regist = {
			onLoad:function(app){
				//----------------注册页面布局事件-----------------
				//Events.setLayout(app)
				
				//----------------注册信息发送对象事件-----------------
				Events.messageSendEvents(app);
				
				//----------------注册户中心操作对象事件-----------------
				//Events.userCenter(app);
				
				//----------------注册表情操作对象事件-----------------
				Events.chatFaceEvents();
				
				//---------------注册好友列表选中事件--------------
				Events.selectFriendEvents(app);
				
			},
	}
	
	
	
	return regist;
});

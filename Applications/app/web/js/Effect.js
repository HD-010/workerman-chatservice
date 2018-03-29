define(['jquery'],function($){
	var Effect = function(){
		var effect = this;
		
		effect.friendsList = {
				list : $("#echat_list .list"),
		};
		
		/**
		 * 设置选中好友列表的背景色效果
		 */
		effect.friendsList.selectFriend = function(o){
			//恢复所有好友列表的默认背景色
			$(effect.friendsList.list).children("dd").css('background-color','aliceblue');
			//设置选中好友的背景色
			o.css('background-color','initial');
		}
	}
	return Effect;
});
define(['jquery'],function($){
	var Effect = function(){
		var effect = this;
		
		effect.friendsList = {
				list : $("#echat_list .list"),
		};

		/**
		 * 设置选中好友分组的背景色效果
		 */
		effect.friendsList.selectGroup = function(o){
			//恢复所有好友分组的默认背景色
			$(effect.friendsList.list).children("dt").css('background-color','initial');
			
			//设置选中好友的背景色
			o.css('background-color','lightblue');
			
			//隐藏所有好友
			$(effect.friendsList.list).find('dd').hide();
			
			//选中分组时展开组成员
			o.nextUntil('dt').toggle();
			
		}
		
		/**
		 * 选中好友时，设置好友的在分组的背景色效果
		 */
		effect.friendsList.selectInGroup = function(o){
			//恢复所有好友分组的默认背景色
			$(effect.friendsList.list).children("dt").css('background-color','initial');
			$(o).prevUntil('dt').prev('dt').css('background-color','lightblue');
			$(o).prev('dt').css('background-color','lightblue');
		}
		
		
		/**
		 * 设置选中好友列表的背景色效果
		 */
		effect.friendsList.selectFriend = function(o){
			//恢复所有好友列表的默认背景色
			$(effect.friendsList.list).children("dd").css('background-color','initial');
			//设置选中好友的背景色
			o.css('background-color','aliceblue');
			//选中好友时，设置好友的在分组的背景色效果
			effect.friendsList.selectInGroup(o);
			
		}
		

	}
	return Effect;
});
define(['jquery'],function($){
	var Effect = function(){
		var effect = this;
		
		effect.friendsList = {
				list : $("#echat_list .list"),
		};
		
		//好友列表底部菜单效果控制
		effect.friendsMenu = {
				//设置背景色
				setcolor : function(o){
					//设置各个选项的背景色为默认颜色
					$(o).siblings().children('button').css({'background-color':'#EAEAEA','color': 'currentColor'})
					//设置被点击选项的背景色
					$(o).children('button').css({'background-color':'#52A4F1','color':'#FFFFFF'});
				},
				
				//控制列表显示与隐藏
				controlListView : function(o){
					//隐藏各个选项对应的内容块
					if($(o).children('button').attr('typeId') != 'childMenu'){
						var typeId = $(o).children('button').attr('typeId');
						$("#echat_list").find('dl').hide()
						$("#echat_list").find('dl[typeId='+typeId+']').show();
					}
				}
				
		}

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
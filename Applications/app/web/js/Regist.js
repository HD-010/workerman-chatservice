/**
 * 文件记录了加载视图时需要注册的事件
 */
define(function(){
	
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
	
			}
	}
	
	return regist;
});

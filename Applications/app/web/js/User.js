define(function(){
	var User = function(){
		var user = this;
		
		/**
		 * 返回访客id
		 */
		user.guestId = function(){
			return sessionStorage.getItem('echat_client');
		}
		
		/**
		 * 返回服务id
		 */
		user.serviceId = function(){
			return sessionStorage.getItem('echat_service');
		}
		
	}
	
	return User;
});
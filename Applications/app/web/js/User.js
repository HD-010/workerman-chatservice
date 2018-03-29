define(function(){
	var User = function(){
		var user = this;
		
		/**
		 * 返回访客id
		 */
		user.guestId = function(){
			var echat_client = sessionStorage.getItem('echat_client');
			return echat_client;
		}
		
		/**
		 * 返回服务id
		 */
		user.serviceId = function(){
			return sessionStorage.getItem('echat_service');
		}
		
		/**
		 * 设置访客id
		 */
		user.setGuestId = function(uid){
			sessionStorage.setItem('echat_client',uid);
		}
		
		/**
		 * 设置服务id
		 */
		user.setServiceId = function(uid){
			sessionStorage.setItem('echat_service',uid);
		}
		
	}
	
	return User;
});
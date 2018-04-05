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
		 * 设置访客（用户）信息
		 * 说明：访方法在用户登录成功后调用，将用户信息保存在本地session中
		 */
		user.setGuestInfo = function(userInfo){
			//设置访客id
			sessionStorage.setItem('echat_client',userInfo.id);
			//设置访客信息，访客唯一标识为：'ecci_'+userInfo.id
			sessionStorage.setItem('ecci_'+userInfo.id,userInfo);
		}
		
		/**
		 * 设置服务信息
		 */
		user.setServiceInfo = function(userInfo){
			//设置服务id,这是正在提供服务方id,该参数可用于后期信息接收时是提示还是直接显示的判断
			sessionStorage.setItem('echat_service',userInfo.id);
			//设置服务信息，服务唯一标识为：'ecsi_'+userInfo.id
			//这里需要长期保存服务方信息，以便查看服务名单历史记录
			localStorage.setItem('ecsi_'+userInfo.id, userInfo);
		}
		
	}
	
	return User;
});
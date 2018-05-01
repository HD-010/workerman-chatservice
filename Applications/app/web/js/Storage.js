/**
 * 为兼容低版浏览器，使用localStorage存储
 */
define(['common'],function(){
	(function(){
		if(typeof(Storage) === 'undefined'){
			window.localStorage = {
				setItem:function(key,value){
					common.setCookie(key,value,360)
				        return true;	
				},
				getItem:function(key){
					return common.getCookies(key)
				}
			};
			
			window.sessionStorage = {
				setItem:function(key,value){
		            common.setCookie(key,value,1/24)
		            return true;
		        },
		        getItem:function(key){
		            return common.getCookies(key)
		        }

			};
			
			window.Storage = {
				sessionStorage:window.sessionStorage,
				localStorage:window.localStorage
			};
		}
	})()
});

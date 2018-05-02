/**
 * 为兼容低版浏览器，使用localStorage存储
 */
define(['jquery','common'],function($,common){
	(function(){
		if(typeof(Storage) === 'undefined'){

			var sessionStorage = {
				setItem:function(key,value){
	           		common.setCookie(key,value,1/24)
            		return true;
	        	},
	        	getItem:function(key){
            		return common.getCookies(key)
	        	}

			};
			var localStorage = {
				setItem:function(key,value){
					common.setCookie(key,value,360)
			        return true;	
				},
				getItem:function(key){
					return common.getCookies(key)
				}
			};
                
			document.localStorage = localStorage;
			document.sessionStorage = sessionStorage;
					
		}

	})()
	var Storage = Storage || function(){}
	return Storage;
});

/**
 * 为兼容低版浏览器，使用localStorage存储
 */
define(['common'],function(){
	var localStorage = {
		setItem:function(key,value){
			common.setCookie(key,value,360)
		        return true;	
		},
		getItem:function(key){
			return common.getCookies(key)
		}
	};
		
	var sessionStorage = {
		setItem:function(key,value){
            common.setCookie(key,value,1/24)
            return true;
        },
        getItem:function(key){
            return common.getCookies(key)
        }

	};
	
	var ST = {
		localStorage:localStorage,
		sessionStorage:sessionStorage
	};
		

	
	(function(){
		if(typeof(Storage) === 'undefined'){
			window.Storage = ST;
			window.localStorage = localStorage;
			window.sessionStorage = sessionStorage;
		}
	})()
});

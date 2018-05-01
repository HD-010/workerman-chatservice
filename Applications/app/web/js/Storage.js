/**
 * 为兼容低版浏览器，使用localStorage存储
 */
define(['common'],function(){
	var ST = function(){}
		localStorage = {
			setItem:function(key,value){
				common.setCookie(key,value,360)
			        return true;	
			},
			getItem:function(key){
				return common.getCookies(key)
			}
		};
		
		st.sessionStorage = {
			setItem:function(key,value){
                                common.setCookie(key,value,1/24)
                                return true;
                        },
                        getItem:function(key){
                                return common.getCookies(key)
                        }

		};
		
		
	};

	
	(function(){
		if(typeof(Storage) === 'undefined'){
			var st = new ST();
			window.Storage = 'st';
			//window.localStorage = st.localStorage;
			//window.sessionStorage = st.sessionStorage;
		}
	})()
});

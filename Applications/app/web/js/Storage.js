/**
 * 为兼容低版浏览器，使用localStorage存储
 */
define(function(){
	var Storage = function(){
		s = this;
		s.localStorage = {
			setItem:function(){
				console.log("设置项目成功");
			},
			getItem:function(){
				console.log("获取项目内容");
			}
		};
		
		s.sessionStorage = {};
	}

	
	(function(){
		if(typeof(Storage) === 'undefined'){
			storage = new Storage();
			window.Storage = storage;
			window.localStorage = storage.localStorage;
			window.sessionStorage = storage.sessionStorage;
		}
	})()
});
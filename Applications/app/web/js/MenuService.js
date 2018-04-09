define(['jquery','easyForm','Settings'],function($,$e,Settings){
	var valid = {
		//验证添加分组的名称
		groupName:function(){
			$e("form[name=addGroup]").valid({
				option : [["input[name=groupName]"]],
				rule : "isSpecialChartor", 
				message : "不能输入特殊字符",
			});
		}	
	};
	var add = {
		//向服务器发送添加分组信息
		friendGroup:function(event){
			event.preventDefault();
			$e("form[name=addGroup]").required([
               "input[name=groupName]",                                
               ]).submit({					//该对象为jquery  ajax参数对象
           		url:Settings.httpServer() + "/chatweb/index/add_group",
        		dataType:"JSON",
        		type:'post',
        		success:function(data){
        			console.log(data)
        			window.location.reload(true);
        		},
        		error:function(data){
        			alert("添加失败");
        		}
        	});
		}
	};
	
	
	var Menu = {
		valid:valid,
		add : add
	}
	return Menu;
});
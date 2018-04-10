define(['jquery','easyForm','Settings','WebHttpService'],function($,$e,Settings,WebHttpService){
	var Effect;
	var valid = {
		//验证添加分组的名称
		groupName:function(){
			$e("form[name=addGroup]").valid({
				option : [["input[name=groupName]"]],
				rule : "isSpecialChartor", 
				message : "不能输入特殊字符",
			});
		},
		//验证修改分组的名称
		alterGroupName:function(){
			$e("form[name=alterGroup]").valid({
				option : [["input[name=groupName]"]],
				rule : "isSpecialChartor", 
				message : "不能输入特殊字符",
			});
		},
	};
	
	/**
     * 好友分组的相关操作
     * 该对应面向表单提交事件
     */
	var group = {
		//向服务器发送添加分组信息
		add:function(event){
			event.preventDefault();
			$e("form[name=addGroup]").required([
               "input[name=groupName]",                                
               ]).submit({					//该对象为jquery  ajax参数对象
           		url:Settings.api('menu') + "add_group",
        		dataType:"JSON",
        		type:'post',
        		success:function(data){
        			console.log(data)
        			window.location.reload();
        		},
        		error:function(data){
        			alert("添加失败");
        		}
        	});
		},
		
		//向服务器发送修改分组信息
		alter:function(event){
			event.preventDefault();
			$e("form[name=alterGroup]").required([
               "input[name=groupName]",                                
               ]).submit({					//该对象为jquery  ajax参数对象
           		url:Settings.api('menu') + "alter_group",
        		dataType:"JSON",
        		type:'post',
        		success:function(data){
        			if(data.state == 1000){
        				alert(data.description)
        			}else{
        				window.location.reload();
        			}
        		},
        		error:function(data){
        			alert("修改失败");
        		}
        	});
		}
	};
	
	/**
	 * 右键菜单选项操作
	 * 注：操作名称与右键菜单选项的typeId一致，每个选项对应一个操作
	 */
	var action = {
		/**
		 * 删除好友
		 * params demo 
		 * params data
		 */
		dropFriend : function(data){
			var api = Settings.api('menu') + 'drop_friend';
			var callback = function(data){
				console.log("删除好友架设函数输出的值：")
				if(data.state == 200){
					window.location.reload();
				}
			};
			
			WebHttpService.sendMessage(data,api,callback);
		},
		
		/**
		 * 修改好友分组名称
		 * 这里的业务是呼出修改好友分组的对话框，对话框值输入内容由valid对象进行验证，
		 * params data
		 */
		alterGroup : function(data){
			//console.log("修改好友分组名称")
			Effect.childMenu.showAlterGroup();
			//初始化对话框数据
			Effect.childMenu.dialogInit();
		},
		
		/**
		 * 删除分组
		 */
		dropGroup : function(data){
			var api = Settings.api('menu') + 'drop_group';
			var callback = function(data){
				if(data.state == 200){
					window.location.reload();
				}
				if(data.state == 8500){
					alert('好友分组中还有成员，不能删除！');
				}
			};
			
			WebHttpService.sendMessage(data,api,callback);
		},
		
		/**
		 * 添加到黑名单
		 */
		addToBack : function(data){
			console.log('添加到黑名单--功能尚未开发')
			console.log(data)
		},
		
		/**
		 * 将好友移到分组
		 */
		moveToGroup : function(data){
			var api = Settings.api('menu') + 'move_to_group';
			var callback = function(data){
				if(data.state == 200){
					window.location.reload();
				}
				if(data.state == 8500){
					alert('移动好友到分组失败！');
				}
			};
			
			WebHttpService.sendMessage(data,api,callback);
		}
	};
	
	var process = {
		/**
		 * 准备后继操作的数据
		 * 将当前对象储存在sessionStorage,供右键菜单选项操作时使用
		 */
		info : function(o){
			var currenDemo = {
				token : '',
				groupId : $(o).attr('groupId'),
				groupName: $(o).html(),
				snid : $(o).attr('snid'),		//snid是记录在数据表中的id			
				uid : $(o).attr('uid'),
			}
			sessionStorage.setItem('currentObj',JSON.stringify(currenDemo));
		},
		
		/**
		 * 相关操作分流
		 */
		action : function(o,effect){
			
			Effect = effect;
			var fnName,data;
			var child = $(o).children('.child');
			
			//如果当前右键菜单选项有子菜单,则不进行任何操作
			if(child.length){
				return false;
			}
			data = JSON.parse(sessionStorage.getItem("currentObj"));
			//处理子菜单上面的点击事件
			if($(o).parent().attr("typeId") == "child"){
				fnName = $(o).parent().parent().attr("typeId");
				data.valId = $(o).attr('valId');
			}else{
				fnName = $(o).attr('typeId');
				//当前currentDemo　在effect.js中呼出右键菜单时储存的
			}
			var fn = action[fnName];
			if(fn){
				fn(data);
			}
		}	
	};
	
	var Menu = {
		valid:valid,
		group : group,
		action : action,
		process : process
	}
	return Menu;
});
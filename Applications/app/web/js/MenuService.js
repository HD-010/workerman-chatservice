define(['jquery',
        'easyForm',
        'Settings',
        'WebHttpService',
        'RegistService',
        'User',
        'Process'
        ],
        function($,
        		$e,
        		Settings,
        		WebHttpService,
        		regist,
        		User,
        		process
        		){
	var dataProcess = process;
	var user = new User();
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
		//验证输入的昵称
		profileNick:function(){
			$e("form[name=editProfiles]").valid({
				option : [["input[name=nick]"]],
				rule : "isSpecialChartor", 
				message : "不能输入特殊字符",
			});
		},
		//验证服务宝典key
		serviceGuideKey:function(){
			$e("form[name=editGuide]").valid({
				option : [["input[name=key]"]],
				rule : "isSpecialChartor", 
				message : "不能输入特殊字符",
			});
		},
		//验证服务宝典constents
		serviceGuideContents:function(){
			$e("form[name=editGuide]").valid({
				option : [["textarea[name=contents]"]],
				rule : "isSpecialChartor", 
				message : "不能输入特殊字符",
			});
		},
		
	};
	
	/**
     * (查找)好友相关操作
     * 
     */
	var friends = {
		/**
		 * 查找可添加好友的名单
		 */
		find:function(app){
			var pageData = $('#findFriends').find('a[name=nextBatch]');
			var guestInfo = user.getGuestInfo();
			//判断是否禁止查找更多可添加好友的名单
			if(this.forbidMore(pageData)) return;
			
			//分页数据
			var data = {
				token:guestInfo.token,
				user_id:user.guestId(),
				searchCount:dataProcess.search.uid(),
				searchSex:dataProcess.search.sex(),
				pageSize: pageData.attr('pageSize'),
				currentPage: pageData.attr('currentPage'),
				total: pageData.attr('total'),
			};
			
			var api = Settings.api('menu') + 'look_friends';
			var callback = function(data){
				if(data.state == 200){
					//console.log(data.data)
					
					//加载查找友有列表中好友实体
					app.model.friendsShow(data.data);
					
					//注册查找友有列表中好友实体相关事件
					regist.findFriendEvents.showProfile(app);
					regist.findFriendEvents.addToFriends(friends);
					
					//-----------设置列表附加信息-----------
					//设置"下一批" 按键的相关参数
					//console.log(dataProcess)
					dataProcess.paging.setPagingParams(data.addData)
					//设置　‘换一批’　的显示效果
					if(dataProcess.paging.haveAnyMore(data.addData)){
						app.effect.findFriends.enableNextBatch();
					}else{
						app.effect.findFriends.disableNextBatch();
					}
					
				}
				if(data.state == 8500){
					alert('加载失败！');
				}
			};
			
			WebHttpService.sendMessage(data,api,callback);
		},
		
		/**
		 * 按条件查找可添加好友的名单
		 * 打开页面时会自动加载0条件数据
		 * 当按条件查找时，需要先清空自动加载的状态
		 */
		findByCondition:function(app){
			//清空自动加载的状态
			dataProcess.paging.resetPagingParams();
			
			//查找可添加好友的名单
			this.find(app);
		},
		
		/**
		 * 禁止查找更多可添加好友的名单
		 * 原因出自于已经到最后一面，没有更多数据可显示，
		 * 这里是操作反馈的效果
		 */
		forbidMore : function(o){
			if(o.attr('disable') === 'true'){
				//alert("已经是最后一批了...")
				return true;
			}
		},
		
		/**
		 * 添加选中用户为我的好友
		 */
		add:function(o){
			var guestInfo = user.getGuestInfo();
			var data = {
				token:guestInfo.token,
				friend_id:o.attr('uid'),
				user_id:guestInfo.id,
			};
			
			var api = Settings.api('menu') + 'apply_friends';
			var callback = function(data){
				console.log(data);
				if(data.state == 200){
					alert(data.data.message);
					window.location.reload();
				}
				if(data.state == 8500){
					alert('添加失败');
				}
			};
			
			WebHttpService.sendMessage(data,api,callback);
		}
	
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
				}else{
					alert(data.description);
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
	
	/**
	 * 用户资料
	 */
	var profiles = {
		save:function(callback){
			//设置用户id
			$("form[name=editProfiles]").find("input[name=userId]").val(user.guestId());
			
			$e("form[name=editProfiles]").reSubmit().submit({					//该对象为jquery  ajax参数对象
            	url:Settings.api('menu') + "update_profiles",
         		dataType:"JSON",
         		type:'post',
         		success:function(data){
         			if(data.state == '200'){
         				alert("保存资料成功");
         				callback();
         			}
         		},
         		error:function(data){
         			alert("没有保存成功！");
         		}
         	});
		},
		
		/**
		 * 读取用户资料
		 */
		read:function(snid){
			//设置用户id
			var data = {
				snid:snid,
				userId : user.guestId(),
				token : $("#lookProfiles").find("input[name=token]").val()
			};
			
			var api = Settings.api('menu') + 'read_profiles';
			var callback = function(data){
				if(data.state == 200){
					//更新数据到视图
					var lookProfiles = $("#lookProfiles");
					lookProfiles.find("input[name=nick]").val(data.data.nick);
					lookProfiles.find("input[name=birthday]").val(data.data.birthday);
					lookProfiles.find("select[name=sex]").val(data.data.sex);
					lookProfiles.find("span[name=user_id]").html(data.data.user_id);
				}
			};
			
			WebHttpService.sendMessage(data,api,callback);
		}	
	};
	
	/**
	 * 服务宝典
	 */
	var serviceGuide = {
		action:{
			//从服务器获取一条记录
			read:function(){
				
			},
			
			//当点击编辑条目的时候，隐藏当前列表并显示编辑窗口
			edit:function(o,app){
				//app.effect.serviceGuide.shutDownList();
				app.effect.serviceGuide.showOut();
				//当前编辑数据
			},
			
			//删除服务宝典中的一条记录
			del:function(o,app){
				console.log(o)
				//WebHttpService.sendMessage(data,api,callback);
			},
			
			//保存一条记录到服务宝典
			save:function(o,app){
				console.log("保存数据");
				//表单对象
				$("#serviceGuide").find("input[name=userId]").val(user.guestId());
					
				$e("form[name=editGuide]").required([
                    "input[name=key]",
                 	"textarea[name=contents]"
                ]).submit({					//该对象为jquery  ajax参数对象
	           		url:Settings.api('menu') + "save_service_guide",
	        		dataType:"JSON",
	        		type:'post',
	        		success:function(data){
	        			if(data.state == 200){
	        				alert(data.description);
	        			}
        			},
	        		error:function(data){
	        			alert("保存失败");
	        		}
                });
			}
		},
		
		oper:function(event,app,o){
			event.preventDefault();
			
			var typeId = $(o).attr('typeId');
			var fn = serviceGuide.action[typeId];
			if(fn){
				fn(o,app)
			}
		},
		
	};
	
	
	var process = {
		/**
		 * 准备后继操作的数据
		 * 将当前对象储存在sessionStorage,供右键菜单选项操作时使用
		 */
		info : function(o){
			var guestInfo = user.getGuestInfo();
			var currenDemo = {
				token:guestInfo.token,
				user_id:user.guestId(),
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
		friends :friends,
		group : group,
		action : action,
		profiles : profiles,
		serviceGuide:serviceGuide,
		process : process
	}
	return Menu;
});
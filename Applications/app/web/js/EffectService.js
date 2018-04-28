define(['jquery','common'],function($,common){
	var Effect = function(){
		var effect = this;
		
		
		/**
		 * 页面加载完成时设置页面效果
		 */
		effect.pageOnload = function(){
			var eChat = $("#eChat");
			//设置app页面的宽度和高度 为全屏
			eChat.width(window.innerWidth);
			eChat.height(window.innerHeight);
		}
		
		effect.friendsList = {
			list : $("#echat_list .list")
		};
		
		/**
		 * 设置正在交谈的商品视图的图片高度
		 */
		effect.talk = {
			imgHeight:function(){
				var img = $("#eChat_talk").find('img');
				
				img.eq(1).height(img.eq(0).height());
			}	
		};
		
		//查找好友的视图控制
		effect.findFriends = {
				//关闭窗口
				shutDown : function(){
					$("#findFriends").hide();
				},
				
				//显示窗口
				showOut : function(){
					$("#findFriends").show();
				},
				
				//设置　‘换一批’　按键可用的效果
				enableNextBatch : function(){
					$('#findFriends').find('a[name=nextBatch]').attr('disable',false).css('color','currentColor')
				},
				
				//设置　‘换一批’　按键不可用的效果
				disableNextBatch : function(){
					$('#findFriends').find('a[name=nextBatch]').attr('disable',true).css('color','#F0F0F0')
				}
		};
		
		
		
		//查看好友资料的视图控制
		effect.lookProfiles = {
				//关闭窗口
				shutDown : function(){
					$("#lookProfiles").hide();
				},
				
				//显示窗口
				showOut : function(){
					$("#lookProfiles").show();
				}
		};
		
		
		//编辑个人资料的视图控制
		effect.editProfiles = {
				//关闭窗口
				shutDown : function(){
					$("#lookProfiles").hide();
				},
				
				//显示窗口
				showOut : function(){
					$("#lookProfiles").show();
					$("#lookProfiles").find('button[name=edit]').show();
				},
				
				//编辑个人资料的视图的编辑框可用
				enable : function(event){
					event.preventDefault();
					//我的资料视图对象
					var lookProfiles = $("#lookProfiles");
					
					//设置input编辑框可用
					lookProfiles.find('input').css({
				    	'border': '1px solid #ACACAC'
					}).removeAttr('disabled');
					
					//设置select编辑框可用
					lookProfiles.find('select').css({
						'border': '1px solid #ACACAC'
					}).removeAttr('disabled');
					
					//设置编辑按钮不可用
					lookProfiles.find('button[name=edit]').hide();
					
					//设置保存按钮可用
					lookProfiles.find('button[name=save]').show();
				},
				//编辑个人资料的视图的编辑框可用
				disable : function(){
					//我的资料视图对象
					var lookProfiles = $("#lookProfiles");
					
					//设置input编辑框可用
					lookProfiles.find('input').css({
						'border': 0
					}).attr('disabled','disabled');
					
					//设置select编辑框可用
					lookProfiles.find('select').css({
						'border': 0
					}).attr('disabled','disabled');
					
					//设置编辑按钮不可用
					lookProfiles.find('button[name=edit]').show();
					
					//设置保存按钮可用
					lookProfiles.find('button[name=save]').hide();
				}
		};
		
		//服务宝典视图控制
		effect.serviceGuide = {
				//关闭窗口
				shutDown : function(){
					$("#serviceGuide").hide();
				},
				//关闭窗口
				shutDownList : function(){
					$("#guideList").hide();
				},
				
				/**
				 * 显示窗口
				 * 当前方法被两个不同入口调用，所以做event兼容处理
				 * 调用页面位置：
				 * １、服务宝典列表的添加按钮
				 * ２、服务宝典列表项的编辑按钮
				 */
				showOut : function(){
					$("#serviceGuide").show();
				},
				//显示窗口
				showOutList : function(){
					$("#guideList").show();
				},
				//当鼠标游动到关键字所在的行，显示操作项
				showOperOption : function(){
					$(this).children("span[name=operOption]").show();
				},
				//当鼠标离开关键字所在的行，隐藏操作项
				hideOperOption : function(){
					$(this).children("span[name=operOption]").hide();
				},
				//编辑个人资料的视图的编辑框可用
				enable : function(event){
					event.preventDefault();
					//我的资料视图对象
					var lookProfiles = $("#lookProfiles");
					
					//设置input编辑框可用
					lookProfiles.find('input').css({
						'border': '1px solid #ACACAC'
					}).removeAttr('disabled');
					
					//设置select编辑框可用
					lookProfiles.find('select').css({
						'border': '1px solid #ACACAC'
					}).removeAttr('disabled');
					
					//设置编辑按钮不可用
					lookProfiles.find('button[name=edit]').hide();
					
					//设置保存按钮可用
					lookProfiles.find('button[name=save]').show();
				},
				
				//编辑个人资料的视图的编辑框可用
				disable : function(){
					//我的资料视图对象
					var lookProfiles = $("#lookProfiles");
					
					//设置input编辑框可用
					lookProfiles.find('input').css({
						'border': 0
					}).attr('disabled','disabled');
					
					//设置select编辑框可用
					lookProfiles.find('select').css({
						'border': 0
					}).attr('disabled','disabled');
					
					//设置编辑按钮不可用
					lookProfiles.find('button[name=edit]').show();
					
					//设置保存按钮可用
					lookProfiles.find('button[name=save]').hide();
				}
		};
		
		
		
		//好友列表右键菜单效果控制
		effect.rightMenu = {
				flush:function(o){
					$(o).css({"background-color":"#ADD8E6"});
					$(o).siblings().css({"background-color":"#FFFFFF"});
				},
				
				//当鼠标移动到元素上面，如果有子菜单则显示子菜单
				childShow:function(o){
					var child = $(o).find('.child');
					if(child.length > 0){
						child.show();
						var bottom = child.css('bottom');
						var val = bottom.substring(0,bottom.indexOf('px')).valueOf();
						if(val < 24){
							child.css('bottom','24px');
						}
					}
				},
				
				//当鼠标离开元素，如果有子菜单则隐藏子菜单
				childHide:function(o){
					var child = $(o).find('.child');
					if(child.length > 0){
						child.hide();
					}
				},
				
				/**
				 * 呼出右键菜单
				 */
				show : function(event){
					//阻止显示默认右键菜单事件
					//event.preventDefault();		//这样操作不生效
					this.oncontextmenu = function(){
						return false;
					}
					
					//右键操作
					if(event.which == 3){
						var rightMenu = $("#rightMenu");
						rightMenu.show();
						var bottom = rightMenu.css("bottom");
						var val = bottom.substring(0,bottom.indexOf('px')).valueOf();
						if(val < 24){
							rightMenu.css("bottom","24px");
						}else{
							rightMenu.css({'left':event.pageX - 2,'top':event.pageY-2});
						}
					}
					
				},
				
				//阻止右键放开时，默认弹出右键快捷菜单
				stop : function(event){
					if(event.which == 3){
						this.oncontextmenu = function(){
							return false;
						}
					}
				},
				
				//隐藏自定义右键菜单
				hidden : function(){
					$("#rightMenu").hide();
				}
		}
		
		
		
		//好友列表底部菜单效果控制
		effect.friendsMenu = {
				//设置背景色
				setcolor : function(o){
					//设置各个选项的背景色为默认颜色
					$(o).siblings().children('button').css({'background-color':'#EAEAEA','color': 'currentColor'})
					//设置被点击选项的背景色
					$(o).children('button').css({'background-color':'#52A4F1','color':'#FFFFFF'});
				},
				
				//控制列表显示与隐藏
				controlListView : function(o){
					//隐藏各个选项对应的内容块
					if($(o).children('button').attr('typeId') != 'childMenu'){
						var typeId = $(o).children('button').attr('typeId');
						$("#echat_list").find('dl').hide()
						$("#echat_list").find('dl[typeId='+typeId+']').show();
					}
				}
				
		}
		
		
		//好友列表底部菜单子菜单效果控制
		effect.childMenu = {
				flush:function(o){
					$(o).css({"background-color":"#ADD8E6"});
					$(o).siblings().css({"background-color":"#FFFFFF"});
				},
				outMenu:function(o){
					$(o).parent().toggle();
				},
				showMenu:function(){
					$("#childMenu").toggle();
				},
				//显示添加分组对话框
				showAddGroup:function(){
					$("#addGroup").show();
				},
				//取消添加分组对话框
				cancleAddGroup:function(){
					$("#addGroup").hide();
				},
				
				
				//显示修改分组对话框
				showAlterGroup:function(){
					$("#alterGroup").show();
				},
				//设置对话框打开时的初始值
				dialogInit : function(){
					var currentObj = JSON.parse(sessionStorage.getItem("currentObj"));
					//console.log(currentObj);
					//设置对话框隐藏域groupId
					$("#alterGroup").find('input[name=groupId]').val(currentObj.groupId);
					//设置对话框隐藏域groupName
					$("#alterGroup").find('input[name=groupName]').val(currentObj.groupName);
				},
				//取消添加分组对话框
				cancleAlterGroup:function(){
					$("#alterGroup").hide();
				}
				
				
		}
		
		/**
		 * 当有收发信息时，列表效果控制
		 */
		effect.message = {
			scrollTop : function(){
				var chatList = $("#chatList");
				if(chatList.lenght > 0){
					chatList[0].scrollTop = chatList[0].scrollHeight;
				}
			}
		}

		/**
		 * 设置选中好友分组的背景色效果
		 */
		effect.friendsList.selectGroup = function(o){
			//恢复所有好友分组的默认背景色
			$(effect.friendsList.list).children("dt").css('background-color','initial');
			
			//设置选中好友的背景色
			o.css('background-color','lightblue');
			
			//隐藏所有好友
			$(effect.friendsList.list).find('dd').hide();
			
			//选中分组时展开组成员
			o.nextUntil('dt').toggle();
			
		}
		
		/**
		 * 选中好友时，设置好友的在分组的背景色效果
		 */
		effect.friendsList.selectInGroup = function(o){
			//恢复所有好友分组的默认背景色
			$(effect.friendsList.list).children("dt").css('background-color','initial');
			$(o).prevUntil('dt').prev('dt').css('background-color','lightblue');
			$(o).prev('dt').css('background-color','lightblue');
		}
		
		
		/**
		 * 设置选中好友列表的背景色效果
		 */
		effect.friendsList.selectFriend = function(o){
			//恢复所有好友列表的默认背景色
			$(effect.friendsList.list).children("dd").css('background-color','initial');
			
			//设置选中好友的背景色
			o.css('background-color','aliceblue');
			
			//选中好友时，设置好友的在分组的背景色效果
			effect.friendsList.selectInGroup(o);
		}
		

	}
	return Effect;
});

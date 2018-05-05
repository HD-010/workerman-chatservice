/**
 * 登录流程：
 * 易service能过接口http://passport.e01.ren/?
 * r=openapi/login/sing-in&uname=uname&pswd=pswd&Verification=Verification&token=token
 * 来验证用户身份
 * 当验证成功后，将验证返回的信息装载到表单，再提交表单到 易service服务器
 * 
 * 注册流程：
 * 易service能过接口http://passport.e01.ren/?
 * r=openapi/login/sing-up&uname=uname&pswd=pswd&Verification=Verification&token=token
 * 来注册用户信息
 * 
 * 注册接口信息：
    "input[name=uname]",                                
	"input[name=pswd]",                                
	"input[name=pswd2]",                               
	"input[name=Verification]", 
	
	注册－登录流程：
	当用户注册成功，页面跳转到登录页面，用户输入帐号、密码进行登录
 */

define(['jquery','easyForm','Settings','User'],function($,$e,Settings,User){
	var Sing = function(){
		var sing = this;
		var user = new User;
		//这里设置登录地址
		//sing.api = 'http://passport.e01.ren/?r=openapi/login';
		sing.api = Settings.passportServer()+'?r=openapi/login';
		
		//设置表单提交地址
		sing.setAction = function(url){
			$("form[name=sing]").attr('action',url);
		}
		
		//设置向表单隐藏域的值，如token,userId
		sing.setHidden = function(key,value){
		//sing.setToken = function(token){
			$("input[name="+key+"]").val(value);
		}
		
		//将登录成功后的用户信息保存到本地session
		sing.setUserInfo = function(userInfo){
			//用户id
			var uid = userInfo.id;
			
			sessionStorage.setItem('ecg_' + uid, userInfo);
		}
		
		//验证登录帐号的合法性
		sing.checkConut = function(){
			$e("form[name=sing]").valid({
				option : [["input[name=uname]"]],
				rule : "isMobilOrEmail", 
				message : "请输入电子邮箱或手机号"
			});
		}
		
		//验证登录密码的合法性
		sing.checkPswd = function(){
			$e("form[name=sing]").valid({
				option : [["input[name=pswd]"]],
				rule : "isPasswd", 
				message : "只能输入6-20个字母、数字、下划线"
			});
			
		}
		
		
		//-----------------注册表单异同说明开始---------------
		// 这是登录表单和注册表单的不同之处理。
		// 注册表单多 ‘再次输入密码项’ 效验。
		//----------------------------------------------
		
		/**
		 * 验证用户密码
		 */
		sing.checkPswd1 = function(){
			$e("form[name='sing']").valid({
				option : [["input[name=pswd]","input[name=pswd2]"],"==","两次输入密码不一致"],
				rule : "isPasswd", 
				message : "只能输入6-20个字母、数字、下划线"
			});
		},
		
		/**
		 * 验证用户密码确认
		 */
		sing.checkPswd2 = function(obj){
			$e("form[name='sing']").valid({
				option : [["input[name=pswd]","input[name=pswd2]"],"==","两次输入密码不一致"],
				rule : "isPasswd", 
				message : "只能输入6-20个字母、数字、下划线"
			});
		},
		//---------------注册表单异同说明结束-------------------
		
		
		
		
		
		
		//验证验证码的合法性
		sing.checkVerification = function(){
			$e("form[name=sing]").valid({
				option : [["input[name=Verification]"]],
				rule : "isDigit",
				message : "验证码由数字组成"
			});
		}
		
		//登录提交
		sing.loginSubmit = function(event){
			//阻止submit默认行为
			var e = event || window.event;
			if(event.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue = false;
			};
			
			$e("form[name=sing]").required([
            "input[name=uname]",                                
            "input[name=pswd]",                                
            "input[name=Verification]"                               
            ]).submit({
				url:sing.api+"/sing-in",
				dataType:"json",
				success:function(data){
					alert(data);
					if(data.state == 'success'){
						//以下为登录成功后的一系列操作
						var token = data.token || 'DKD15-2542DS';
						
						//向表单隐藏域设置token
						sing.setHidden('token',token);	
						//向表单隐藏域设置userId
						sing.setHidden('userId',data.id);
						
						//定义用户昵称，当用户名不存在时，使用id作为昵称
						data.nick = data.uname || data.id;	
						
						//设置用户（访客）信息
						user.setGuestInfo(data);
						
						//设置表单提交地址
						sing.setAction(location.href);
						
						//注册聊天用户信息,在会话开始时注册
						$("form[name=sing]").submit();
					}else{
						console.log("登录失败");
					}
				},
				error:function(data){
					alert("登录失败:返回错误");
					console.log(JSON.stringify(data))
				}
			});
		}
		
		//-----------------注册表单异同说明开始---------------
		//注册提交
		sing.upSubmit = function(event){
			//阻止submit默认行为
			var e = event || window.event;
			if(event.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue = false;
			};
			
			$e("form[name='sing']").required([
			    "input[name=uname]",                                
			    "input[name=pswd]",                                
			    "input[name=pswd2]",                               
			    "input[name=Verification]"                               
			]).submit({
				url:sing.api+"/sing-up",
				type:'post',
				dataType:"JSON",
				success:function(data){
					console.log(data)
					if(data.state == 'success'){
						//显示注册 成功提示信息
						var message = $e().msg("注册成功，正在跳转登录页...");
						$("div[name=notice]").append(message);
						sing.data = data;
						//三秒后自动完成登录
						setTimeout(sing.UpToIn,3000);
					}
				},
				error:function(data){
					console.log(data)
				}
			});
		}
		
		sing.UpToIn = function(){
			location.href = '/chatweb/index/index';
		}
		
		//-----------------注册表单异同说明结束---------------
	
	}
	
	return Sing;
})

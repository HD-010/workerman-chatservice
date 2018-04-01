/**
 * 登录流程：
 * 易service能过接口http://passport.e01.ren/?
 * r=openapi/login&uname=uname&pswd=pswd&Verification=Verification&token=token
 * 来验证用户身份
 * 当验证成功后，将验证返回的信息装载到表单，再提交表单到 易service服务器
 */
define(['jquery','easyForm','User'],function($,$e,User){
	var Sing = function(){
		var sing = this;
		var user = new User;
		//这里设置登录地址
		sing.api = 'http://passport.e01.ren/?r=openapi/login';
		
		//设置表单提交地址
		sing.setAction = function(url){
			console.log(url);
			$("form[name=singIn]").attr('action',url);
		}
		
		//向表单隐藏域设置token
		sing.setToken = function(token){
			$("input[name=token]").val(token);
		}
		
		//将登录成功后的用户信息保存到本地session
		sing.setUserInfo = function(userInfo){
			//用户id
			var uid = userInfo.id;
			
			sessionStorage.setItem('ecg_' + uid, userInfo);
		}
		
		//验证登录帐号的合法性
		sing.checkConut = function(){
			$e("form[name=singIn]").valid({
				option : [["input[name=uname]"]],
				rule : "isMobilOrEmail", 
				message : "请输入电子邮箱或手机号",
			});
		}
		
		//验证登录密码的合法性
		sing.checkPswd = function(){
			$e("form[name=singIn]").valid({
				option : [["input[name=pswd]"]],
				rule : "isPasswd", 
				message : "只能输入6-20个字母、数字、下划线",
			});
			
		}
		
		//验证验证码的合法性
		sing.checkVerification = function(){
			$e("form[name=singIn]").valid({
				option : [["input[name=Verification]"]],
				rule : "isDigit",
				message : "验证码由数字组成",
			});
		}
		
		//登录提交
		sing.loginSubmit = function(event){
			//阻止submit默认行为
			event.preventDefault();
			
			$e("form[name=singIn]").required([
            "input[name=uname]",                                
            "input[name=pswd]",                                
            "input[name=Verification]"                               
            ]).submit({
				url:sing.api+"/sing-in&"+$e().sialize(),
				dataType:"JSON",
				success:function(data){
					if(data.state == 'success'){
						//以下为登录成功后的一系列操作
						//向表单隐藏域设置token
						var token = data.token || 'DKD15-2542DS';
						sing.setToken(token);
						
						//定义用户昵称，当用户名不存在时，使用id作为昵称
						data.nick = data.uname || data.id;	
						
						//设置用户（访客）信息
						user.setGuestInfo(data);
						
						//设置表单提交地址
						sing.setAction(location.href);
						
						//注册聊天用户信息,在会话开始时注册
						$("form[name=singIn]").submit();
					}else{
						console.log("登录失败");
					}
				},
				error:function(data){
					console.log(data)
				}
			});
		}
	
	}
	
	return Sing;
})
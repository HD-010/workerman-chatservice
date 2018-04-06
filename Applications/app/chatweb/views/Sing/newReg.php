<link rel="stylesheet" type="text/css" href='/css/eChatNewReg.css'/>

<div class="logHead"><div class='log'>易service</div></div>
<div class="newReg">
    <div class="newregLeft">
    	<div class='left'>左</div>
    </div>
    <div class="newregRight">
    	<div class='right'>
    		<form name='sing' action='' method='post'>
    			<input type="hidden" name="sing" value="singUp" />
    			<input type="hidden" name="token" value="" />
    			<table border='0'>
    				<tr><th colspan='3'>用户<a style='color:red' href='/chatweb/sing/up'>注册</a><a style='color:red' href='/chatweb/sing/in'>/登录</a><div name='notice'></div></th></tr>
    				<tr>
    					<td class="opt">用户名：</td>
    					<td colspan=2 class="input"><input type='text' name='uname' value='' placeholder='输入用户名' /></td>
    				</tr>
    				<tr>
    					<td class="opt">密　码：</td>
    					<td colspan=2 class="input"><input type='password' name='pswd' value='' placeholder='输入登录密码' /></td>
    				</tr>
    				<tr>
    					<td class="opt">确认密码：</td>
    					<td colspan=2 class="input"><input type='password' name='pswd2' value='' placeholder='再次输入登录密码' /></td>
    				</tr>
    				<tr>
    					<td class="opt">验证码：</td>
    					<td><input type='text' name='Verification' value='' placeholder='输入验证码' /></td>
    					<td>123456</td>
    				</tr>
    				<tr>
    					<td colspan=3 class="bt" ><input type="reset" value="重填" />
    					
    					<input type="submit" value="注册" /></td>
    				</tr>
    			
    				<tr>
    					<td colspan=3 class="" ><a href='#'>忘记密码</a></td>
    				</tr>
    			
    			</table>
    		</form>
    	</div>
    </div>
</div>
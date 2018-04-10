<div id='eChat'>
    <!-- 这里是聊天页面头部 -->
	<div id='chatHead' style='border:0;width:100%;height:8.5%;background-color:#52A4F1;'><h2>易享服务在线</h2></div>
	
	<!-- 好友列表 -->
	<?php  echo $this->renderWidget('eChatList',$data);?>
	<?php  echo $this->renderWidget('eChatMenu',$data);?>

    <div id='eChat_main'>
    	<!-- 这里是发送和接收到的信息列表 -->
    	<div id='chatList' style='border:0;width:100%;height:56%;overflow: auto;'>
    		<table border='0' style='width:100%;border-collapse:separate; border-spacing:0 1em;font-size:1.5em;'>
    			
    		</table>
    	</div>
    	
    	<!-- 这里是聊天页面菜单 -->
    	<div id='chatMenu' style='border:0;border-top:1px solid #D5D5D5;width:100%;height:6%;background-color:#F9F9F9;'>
    		<ul style='width:80%;'>
    			<li id='chatFace' style='display: inline-block;width: 2.2em;height: 2.2em;border: 0;border-radius:1.1em;vertical-align: middle;margin: 0.3em 0.4em 0 1.5em;background-image: url(http://127.0.0.1:8383/images/tools.png);background-size: 459px 40.5px;background-repeat: no-repeat;background-position: -0.39em -0.55em;'>
    				<ul style='display:none;border: 1px solid red;position: absolute;width:45%;max-width:40em;margin-top: 2.8em;margin-left: -1.5em;height: 22%;background-color:white;'>
    					<li style='display:inline-block;margin-left:1em;'><label style='display:inline-block;width:3em;height:3em;border:1px solid silver;' for='chatFace/:c'>/:c</label></li>
    					<li style='display:inline-block;margin-left:1em;'><label style='display:inline-block;width:3em;height:3em;border:1px solid silver;' for='chatFace/:d'>/:d</label></li>
    					<li style='display:inline-block;margin-left:1em;'><label style='display:inline-block;width:3em;height:3em;border:1px solid silver;' for='chatFace/:e'>/:e</label></li>
    					<li style='display:inline-block;margin-left:1em;'><label style='display:inline-block;width:3em;height:3em;border:1px solid silver;' for='chatFace/:f'>/:f</label></li>
    					<li style='display:inline-block;margin-left:1em;'><label style='display:inline-block;width:3em;height:3em;border:1px solid silver;' for='chatFace/:g'>/:g</label></li>
    				</ul>
    				<input id='chatFace/:c' style='visibility:hidden' type='radio' name='chatFace' value='/:c' />
    				<input id='chatFace/:d' style='visibility:hidden' type='radio' name='chatFace' value='/:d' />
    				<input id='chatFace/:e' style='visibility:hidden' type='radio' name='chatFace' value='/:e' />
    				<input id='chatFace/:f' style='visibility:hidden' type='radio' name='chatFace' value='/:f' />
    				<input id='chatFace/:g' style='visibility:hidden' type='radio' name='chatFace' value='/:g' />
    			</li>
    			
    			<li style='display: inline-block;width: 2.5em;height: 2.2em;border: 0;vertical-align: middle;margin: 0.3em 0.4em 0 0.75em;background-image: url(http://127.0.0.1:8383/images/tools.png);background-size: 459px 40.5px;background-repeat: no-repeat;background-position: -16.5em -0.55em;'>
    				<label style='width:100%;height:100%;display:inherit;' for='chatImg'>
    					<input style='width:1em;visibility:hidden' id='chatImg' type='file' name='chatImg' value='' />
    				</label>
    			</li>
    			<li style='display: inline-block;width: 2.5em;height: 2.2em; border: 0;vertical-align: middle;margin: 0.3em 0.4em 0 0.75em;background-image: url(http://127.0.0.1:8383/images/tools.png);background-size: 459px 40.5px;background-repeat: no-repeat;background-position: -12.6em -0.55em;'>
    				<label style='width:100%;height:100%;display:inherit;' for='chatFile'>
    					<input style='width:1em;visibility:hidden' id='chatFile' type='file' name='chatFile' value='' />
    				</label>
    			</li>
    		</ul>
    	</div>
    	
    	
    	<!-- 这里是文本内容输入区 -->
    	<div id='chatText' style='border:0;border-top:1px solid #D5D5D5;width:100%;height:21.5%;'>
    		<textarea placeholder='我想提问……。' style='width:100%;height:100%;border:0;outline:none;padding:0.2em;font-size:160%;'></textarea>
    	</div>
    	
    	<!-- 这里是聊天页面底部 -->
    	<ul id='chatfoot' style='border:0;border-top:1px solid #D5D5D5;width:100%;height:7.5%;background-color:#F9F9F9;font-size:150%'>
    		<li style='width:20%;float:right;margin-top:0.8em;height:2em;line-height:2em;'><button id='messageSend' style='display:inline-block;width:80%;height:90%;font-size:102%;'> 发 送 </button></li>
    		<li style='width:20%;float:right;margin-top:0.8em;height:2em;line-height:2em;'><span>会话结束</span></li>
    		<li style='width:55%;float:right;margin-top:0.8em;height:2em;line-height:2em;'><a href='#' style='color:#DDDDDD'>其它信息</a></li>
    	</ul>
    	
    </div>
    
</div>



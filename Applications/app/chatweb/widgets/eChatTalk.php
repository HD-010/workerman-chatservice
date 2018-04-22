<link rel='stylesheet' type="text/css" href='/css/eChatTalkService.css' />

<!-- 正在交谈的商品视图 -->
<dl id='eChat_talk'>
	<dt name='modify'><b name='nick'>性感昵称 </b>正在咨询：<i name='modifyName'>流感性的商品</i></dt>
	<dd name='modifyPic'>
		<a href='?' target="_blank"><img src="http://image.uczzd.cn/9251431947197193249.jpg?id=0&from=export&height=140&width=270" /></a>
		<a href='?' target="_blank"><img src="http://image.uczzd.cn/9251431947197193249.jpg?id=0&from=export&height=140&width=270" /></a>
	</dd>
	
	<dt name="guide">
		<b>服务宝典：</b>
		<form name="quiceGuide" id="guide">
		<i>
			<input type='hidden' name='token' value='<?=App::$user->getItem('token');?>' />
			<input type='hidden' name='mechanId' value='1' />
			
			<!-- 这里的用户id,如果是展示个人资料，则是当前用户id，如果是展示好友资料，则是当前好友的id -->
			<input type='hidden' name='userId' value='' />
			<input type="text" name="key" value="" placeholder="输入查询关键字" />
			<button name="searchGuide">搜索</button>
		</i>
		</form>
	</dt>
	<dd name='guideDescription'>
		<ul name="guideList">
			<!-- 这里是列表内容 -->
			<!-- <li>心法一kdfkedfkew劳动服务公司夺鹅卵石　木大地回春陕西省务公司夺鹅务公司夺鹅务公司夺鹅吉电视片糯　炽</li> -->
		</ul>
	</dd>
	
</dl>


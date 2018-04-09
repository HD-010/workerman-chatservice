<link rel='stylesheet' type="text/css" href='/css/eChatMenuService.css' />

<table id="echat_menu">
	<tr>
    	<td><button typeId='list'>好友</button></td>
    	<td><button typeId='group'>群聊</button></td>
    	<td><button typeId='common'>广播</button></td>
    	<td><button typeId='childMenu'>≡≡</button></td>
	</tr>
</table>
<ul id="childMenu">
	<li typeId="addGroup">+添加友好分组</li>
</ul>
<div id="addGroup">
	<p>添加分组</p>
	<form name="addGroup" action="" method="post">
		<input type="hidden" name="token" value="<?=App::$user->getItem("token");?>" />
		<input type="hidden" name="userId" value="<?=App::$user->getItem("userId");?>" />
		
		<ul>
    		<li><input type="text" name="groupName" value="" /></li>
    		<li>
        		<input type="button" name="cancleAddGroup" value="取消" />
        		<input type="submit" name="submitAddGroup" value="添加" />
        	</li>
		</ul>
	</form>
</div>
<!-- 右键菜单 -->
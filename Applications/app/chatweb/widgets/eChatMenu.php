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
	<li typeId="searchFriends">+查找友好</li>
	<li typeId="addGroup">+添加友好分组</li>
</ul>

<!-- 添加好友分组 -->
<div id="addGroup">
	<p name="title">添加分组</p>
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

<!-- 修改好友分组名称 -->
<div id="alterGroup">
	<p name="title">修改好组名称</p>
	<form name="alterGroup" action="" method="post">
		<input type="hidden" name="token" value="<?=App::$user->getItem("token");?>" />
		<input type="hidden" name="userId" value="<?=App::$user->getItem("userId");?>" />
		<input type="hidden" name="groupId" value="" />
		
		<ul>
    		<li><input type="text" name="groupName" value="" /></li>
    		<li>
        		<input type="button" name="cancleAlterGroup" value="取消" />
        		<input type="submit" name="submitAlterGroup" value="修改" />
        	</li>
		</ul>
	</form>
</div>
<!-- 右键菜单 -->
<ul id="rightMenu" >
	<li typeId="dropFriend">删除好友</li>
	<li typeId="moveToGroup">
		<div>将好友移到分组　▶</div>
		<ul class="child" typeId="child">
			<?php 
			$group = T::arrayValue('friendsGroup', $data);
			for($i = 0; $i < count($group); $i++):?>
			
			<li valId="<?=T::arrayValue('id',$group[$i])?>"><?=T::arrayValue('name',$group[$i])?></li>
			
			<?php endfor;?>
		</ul>
	</li>
	<li typeId="dropGroup">删除分组</li>
	<li typeId="alterGroup">修改分组名称</li>
	<li typeId="addToBack">添加到黑名单</li>
</ul>
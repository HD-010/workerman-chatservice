<link rel='stylesheet' type="text/css" href='/css/eChatMenuService.css' />
<!-- echat_menu -->
<table id="echat_menu">
	<tr>
    	<td><button typeId='list'>好友</button></td>
    	<td><button typeId='group'>群聊</button></td>
    	<td><button typeId='common'>广播</button></td>
    	<td><button typeId='childMenu'>≡≡</button></td>
	</tr>
</table>
<ul id="childMenu">
	<li typeId="searchFriends">查找友好</li>
	<li typeId="addGroup">添加友好分组</li>
	<li typeId="lookProfiles">我的</li>
</ul>


<!-- 以下为与菜单相关的视图 -->
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

<!-- 展示查找好友的视图 -->
<div id="findFriends">
	<div name='content'>
    	<div name="shutDown">✖</div>
		<!-- 搜索选项框 -->
		<ul name="searchBox">
			<li>
				<input type='text' name='user_id' value='' placeholder='按用户账号查找'/>
				<select name='sex' style='color:A9A9A9;'>
					<option value=''>-性别-</option>
					<option value='人妖'>人妖</option>
					<option value='女'>女</option>
					<option value='男'>男</option>
				</select>
				<input type='button' name='search' value='查找' />
			</li>
			
		</ul>
		<!-- 推荐好友名单 -->
		<ul name="recomendFriends">
			
			<!-- 这里通过jquery添加列表中的每一个好友成员 -->
			
		</ul>
		<ul name="operArea">
			<li><a name="nextBatch" href="???">换一批</a></li>
		</ul>
	</div>
</div>


<!-- 展示好友的资料视图 -->
<div id='lookProfiles'>
	<div name='content'>
		<div name="shutDown">✖</div>
		<form name='editProfiles' action='' method=''>
    		<!-- 附加功能选项 -->
    		<div name='addOption'>
    			<button name='edit'>编辑</button>
    			<button name='save'>保存</button>
			</div>
			
			<input type="hidden" name="token" value="<?=App::$user->getItem("token");?>" />
			
			<!-- 这里的用户id,如果是展示个人资料，则是当前用户id，如果是展示好友资料，则是当前好友的id -->
			<input type="hidden" name="userId" value="" />
    		<!-- 资料名细列表 -->
    		<ul name='detail'>
    			<li>昵称:<input name='nick' disabled="disabled" type='text' value='弘德誉曦' /></li>
    			<li>用户ID:　<span name='user_id'></span></li>
    			<li>性别:
        			<select disabled="disabled" name='sex' />
        				<option value='人妖'>人妖</option>
    					<option value='女'>女</option>
    					<option value='男'>男</option>
        			</select>
    			</li>
    			<li>生日:<input name='birthday' disabled="disabled" type='date'  value='2018/4/15' /></li>
    		</ul>
    		
		</form>
	</div>
</div>

<link rel='stylesheet' type="text/css" href='/css/eChatListService.css' />
<?php //T::print_pre($data['friendsList'])?>
<div id='echat_list'>
    <dl class="list" typeId='list'>
    	<?php 
    	for($i = 0;$i < count($data['friendsGroup']); $i++):
    	$group = $data['friendsGroup'][$i];
    	?>
    	<dt class="option"><?=T::arrayValue('name', $group);?></dt>
    		<?php 
    		for($j = 0; $j < count($data['friendsList']); $j++):
    		$list = $data['friendsList'][$j];
    		?>
        		<?php if($list['group_id'] == $group['id']):?>	
            	<dd class="discription" uid='<?=T::arrayValue('friend_id', $list)?>'>
                	<font class='listNick'><?=T::arrayValue('nick', $list,T::arrayValue('friend_id', $list))?></font>
                	<font class="listTag"></font>
            	</dd>
            	<?php endif;?>
    		<?php endfor;?>
    	<?php endfor;?>
    </dl>
    
    <dl class="list" typeId='group'>
    	<dt class="option">我的广告商</dt>
    	<dd class="discription" uid='69826'><font class='listNick'>小明-柑大师傅</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='5245456'><font class='listNick'>小张－罟大咕嘟</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='52525456'><font class='listNick'>小红－－搬士大夫</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='5278856'><font class='listNick'>小星－仍大夫</font><font class="listTag"></font></dd>
    	
    
    </dl>
    <dl class="list" typeId='common'>
    	
    	<dt class="option">我的供货商</dt>
    	<dd class="discription" uid='5245456'><font class='listNick'>小明-大师傅</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='525456'><font class='listNick'>小张－咕嘟</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='52542456'><font class='listNick'>小红－－士大夫</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='5259656'><font class='listNick'>小星－大夫</font><font class="listTag"></font></dd>
    
    </dl>
    
    <table class="menu">
    	<tr>
        	<td><button typeId='list'>好友</button></td>
        	<td><button typeId='group'>群聊</button></td>
        	<td><button typeId='common'>广播</button></td>
        	<td><button typeId='childMenu'>≡≡</button></td>
    	</tr>
    </table>
</div>



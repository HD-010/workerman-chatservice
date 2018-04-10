<link rel='stylesheet' type="text/css" href='/css/eChatListService.css' />
<?php //T::print_pre($data['friendsList'])?>
<div id='echat_list'>
    <dl class="list" typeId="list">
    	<?php 
    	for($i = 0;$i < count($data['friendsGroup']); $i++):
    	$group = $data['friendsGroup'][$i];
    	?>
    	<!-- 这里的snid对应数据表中的id -->
    	<dt class="option" snid="<?=T::arrayValue('id', $group);?>" groupId="<?=T::arrayValue('id', $group);?>"><?=T::arrayValue('name', $group);?></dt>
    		<?php 
    		for($j = 0; $j < count($data['friendsList']); $j++):
    		$list = $data['friendsList'][$j];
    		?>
        		<?php if($list['group_id'] == $group['id']):?>	
        		<!-- 这里的snid对应数据表中的id  uid为当前服务id-->
            	<dd class="discription" snid='<?=T::arrayValue('id', $list)?>' uid="<?=T::arrayValue('friend_id', $list)?>">
                	<font class="listNick"><?=T::arrayValue('nick', $list,T::arrayValue('friend_id', $list))?></font>
                	<font class="listTag"></font>
            	</dd>
            	<?php endif;?>
    		<?php endfor;?>
    	<?php endfor;?>
    </dl>
    
    <dl class="list" typeId='group' style="display: none;">
    	<dt class="option">我的广告商</dt>
    	<dd class="discription" uid='69826'><font class='listNick'>小明-柑大师傅</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='5245456'><font class='listNick'>小张－罟大咕嘟</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='52525456'><font class='listNick'>小红－－搬士大夫</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='5278856'><font class='listNick'>小星－仍大夫</font><font class="listTag"></font></dd>
    	
    
    </dl>
    <dl class="list" typeId='common' style="display: none;">
    	<dt class="option">我的供货商</dt>
    	<dd class="discription" uid='5245456'><font class='listNick'>小明-大师傅</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='525456'><font class='listNick'>小张－咕嘟</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='52542456'><font class='listNick'>小红－－士大夫</font><font class="listTag"></font></dd>
    	<dd class="discription" uid='5259656'><font class='listNick'>小星－大夫</font><font class="listTag"></font></dd>
    
    </dl>
    
    <div style="height:1.8em;display:block;border:0;"></div>
</div>



define(['common'],function(common){
	var History = {
		/**
		 * 保存聊天记录到本地的历史记录对象中（留言在服务器，不在本地），
		 * 'ecshp_' 是私聊历史记录的前缀 echat service history private
		 * 'ecshc_' 是公众演讲历史记录的前缀 echat service history common
		 * 'ecshg_' 是群聊历史记录的前缀 echat service history group
		 * 调用位置：
		 * app.js app.model.saveRecoder(sendObj);
		 */
		saveRecoder:function(data){
			var messageType = ['message','messageGroup','messageTo'];
			//添加历史记录中的消息类型
			data.typeh = (common.inArray(data.type,messageType) != -1) ? 'receive' : 'send';
			
			//历史记录id，一个id对应一个好友的历史记录对象
			var ecsh_id = 'ecshp_' + data.serviceId;
			//这里首先要确保历史记录对象是一个数组，如果这个这对象不是数组，说明这个对象在本地历史记录中为空
			if(!localStorage.getItem(ecsh_id)){
				//添加历史记录对象保存到本地
				localStorage.setItem(ecsh_id, JSON.stringify([data]));
			}else{
				//读取当前好友的历史记录对象
				var hostRecod = JSON.parse(localStorage.getItem(ecsh_id));
				console.log(hostRecod);
				//将新记录追加到历史记录对象
				hostRecod.push(data)
				//将更新后的历史记录对象保存到本地
				localStorage.setItem(ecsh_id, JSON.stringify(hostRecod));
			}
		},
		
		/**
		 * 选中好友时加载好友对应的聊天记录
		 * 说明：
		 * 聊天记录存放在localStorage的'ecsh_'+userInfo.id 对象中
		 * 聊天记录对象数据格式如：
		 * 'ecshp_'+userInfo.id= [
		 * 		{
		 * 			typeh:'recive',
		 * 			message:'content',
		 * 			date:'4/1 :12:37'
		 * 		},
		 * 		{
		 * 			typeh:'send',
		 * 			message:'content',
		 * 			date:'4/1 :12:37'
		 * 		},
		 * ]
		 * typeh 值有三个：recive、send 和 welcom。其中welcom类型不保存在本地历史记录中
		 * 调用位置：main.js app.model.loadHostRecod(userInfo.id)
		 */
		loadHistory:function(serviceId,model){
			var hostRecodId = 'ecshp_'+serviceId || 'ecshp_69826';
			//清空聊天记录列表
			model.clearMessageList();
			
			//聊天记录对象
			var hostRecoder = JSON.parse(localStorage.getItem(hostRecodId)) || [{typeh:'welcom',message:'欢迎使用易service',date:'4/1 :12:37'}];
			
			//这里调用 model.messageWelcom 
			//或 model.messageReceive 
			//或 model.messageReceive 展示历史消息
			for(var i = 0; i < hostRecoder.length; i++){
				if(typeof hostRecoder[i] == "string"){
					continue;
				}
				fn = model['message'+common.ucFirst(hostRecoder[i].typeh)];
				if(fn){
					fn(hostRecoder[i],'showHistory');
				}
			}
		}
	}
	return History;
});
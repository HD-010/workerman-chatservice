/**
 * 数据处理对象
 */
define(function(){
	var process = {
		/**
		 * 图片相关数据处理
		 */
		img:{
			/**
			 * data 是从数据表中获取的一条包括头像的用户记录
			 */
			face:function(data){
				var img;
				if(data.face_pic){
					return '/images/'+data.user_id+'/data.face_pic';
				}else{
					switch(data.sex){
						case '男':
							img = 'boy.png';
							break;
						case '女':
							img = 'girl.png';
							break;
						default:
							img = 'gobling.png'
								
					}
					return '/images/'+img;
				}
			}
		},
		
		/**
		 * 分页相关数据处理
		 */
		paging:{
			/**
			 * 清空自动加载的状态
			 */
			resetPagingParams:function(){
				var nextBatch = $('#findFriends').find('a[name=nextBatch]');
				nextBatch.attr({
					'pageSize':'',
					'total' : '',
					'currentPage' : 0 ,
					'disable' :''
				})
			},
			/**
			 * 设置 "下一批" 按键的相关参数
			 */
			setPagingParams:function(data){
				var nextBatch = $('#findFriends').find('a[name=nextBatch]');
				var currentPage = nextBatch.attr('currentPage') || 0;
				nextBatch.attr({
					'pageSize':data.pageSize,
					'total' : data.total,
					'currentPage' : parseInt(currentPage) + 1 
				})
			},
			
			/**
			 * 还有更多页吗？
			 * return boolen
			 */
			haveAnyMore:function(data){
				var nextBatch = $('#findFriends').find('a[name=nextBatch]');
				var currentPage = nextBatch.attr('currentPage') || 0;
				var total = data.total;
				var count = data.pageSize * parseInt(currentPage);
				
				return (count < total) ? true : false;
			}
		},
		
		/**
		 * 搜索相关数据处理
		 */
		search:{
			box:function(){
				return $("#findFriends");
			},
			//获取被搜索的账号
			uid:function(){
				return this.box().find('[name=user_id]').val();
			},
			//获取被搜索好友的性别
			sex:function(){
				return this.box().find('[name=sex]').val();
			}
		}
	
	
	
	
	}
	
	
	return process;
});
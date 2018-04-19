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
		},
		
		/**
		 * 正在洽谈的页面（商品）
		 */
		talking:{
			/**
			 * 返回正在提供服务页面的url
			 */
			commodifyInfo:function(app){
				//初始化商品数据，后面生获取的实际数据会替换初始数据中的项
				var data = {
					nick:'小蜜蜂',			//昵称
					modifyName:'健康宝贝',	//商品名称
					address:'http://www.baidu.com',	//连接地址
					//两张商品主图
					pic:[
					     'http://image.uczzd.cn/17021841302844734328.jpg?id=0&from=export',
					     'http://image.uczzd.cn/17806710652498595778.jpg?id=0&from=export'
					     ]
				};
				
				data.address = this.commodifyUrl();
				data.pic = this.commodifyPic();
				
				return data;
			},
			
			/**
			 * 返回浏览商品页面的地址
			 */
			commodifyUrl:function(){
				return location.href;
			},
			
			/**
			 * 返回商品主图，上限两张
			 */
			commodifyPic:function(){
				var width,height,scale;
				var pic = new Array();
				
				//页面所有img
				var allPic = $(document).find('img');
				
				var params = this.commodifyParams().commodifyInfo;
				
				//定义图片的宽高比例
				var min_scale = params.min_scale;
				var max_scale = params.max_scale;
				//定义图片的宽度
				var min_width = params.min_width;
				var max_width = params.max_width;
				
				for(var i = 0,limit=0; i < allPic.length,limit <= 2; i++,limit++){
					width = allPic.eq(i).width();
					height = allPic.eq(i).height();
					scale = width/height;
					
					if(((width > min_width) && (width < max_width)) && 
						((scale > min_scale) && (scale < max_scale))
						){
						pic.push(allPic.eq(i).attr('src'));
					}
				}
				
				return pic;
			},
			
			/*
			 * 返回链接中设置的值
			 * 	<script type="text/javascript" src="http://127.0.0.1:8383/api/service/online?client=10002&service=10000&token=58555&min_scale=0.9&max_scale=1.1&min_width=300&max_width=350"></script>
			 * 格式如下：
			 * commodifyInfo:{
					max_scale:"1.1",
					max_width:"350",
					min_scale:"0.9",
					min_width:"300"
					}
			 */
			commodifyParams:function(){
				var commodifyParams = JSON.parse(sessionStorage.getItem('echat_sys_params'));
				
				return commodifyParams;
			}
			
			
		}
	
	
	
	
	}
	
	
	return process;
});
var Camera = function(aCanvas, aContext, x, y) {
	var camera = this;
	
	var canvas = aCanvas;
	var context = aContext;

	this.x = x;
	this.y = y;
	
	//设置载入页面时图片的绽放效果
	//最小缩放比例
	this.minZoom = 0.6;
	//最大缩放比例
	this.maxZoom = 1.8;
	//定义页面显示的初始比例
	this.zoom = this.minZoom;
	
	var backgroundColor = Math.random()*360;
	
	this.setupContext = function() {
		var translateX = canvas.width / 2 - camera.x * camera.zoom;
		var translateY = canvas.height / 2 - camera.y * camera.zoom;
		// Reset transform matrix
		context.setTransform(1,0,0,1,0,1);
		context.fillStyle = 'hsl('+backgroundColor+',50%,10%)';
		//fillRect() 方法使用 fillStyle 属性所指定的颜色、渐变和模式来填充指定的矩形。
		context.fillRect(0,0,canvas.width, canvas.height);
		
		//translate() 方法转换画布的用户坐标系统。
		//translate() 方法为画布的变换矩阵添加水平的和垂直的偏移。
		//参数 dx 和 dy 添加给后续定义路径中的所有点。
		context.translate(translateX, translateY);
		
		//标注画布的用户坐标系统
		//scale() 方法为画布的当前变换矩阵添加一个缩放变换。
		//缩放通过独立的水平和垂直缩放因子来完成。
		//例如，传递一个值 2.0 和 0.5 将会导致绘图路径宽度变为原来的两倍，而高度变为原来的 1/2。
		//指定一个负的 sx 值，会导致 X 坐标沿 Y 轴对折，而指定一个负的 sy 会导致 Y 坐标沿着 X 轴对折。
		context.scale(camera.zoom, camera.zoom);
		
		if(debug) {
			drawDebug();
		}
	};
	
	this.update = function(model) {
		backgroundColor += 0.08;
		backgroundColor = backgroundColor > 360 ? 0 : backgroundColor;
		
		var targetZoom = (model.camera.maxZoom + (model.camera.minZoom - model.camera.maxZoom) * Math.min(model.userTadpole.momentum, model.userTadpole.maxMomentum) / model.userTadpole.maxMomentum);
		model.camera.zoom += (targetZoom - model.camera.zoom) / 60;
		
		var delta = {
			x: (model.userTadpole.x - model.camera.x) / 30,
			y: (model.userTadpole.y - model.camera.y) / 30
		}
		
		if(Math.abs(delta.x) + Math.abs(delta.y) > 0.1) {
			model.camera.x += delta.x;
			model.camera.y += delta.y;
			
			for(var i = 0, len = model.waterParticles.length; i < len; i++) {
				var wp = model.waterParticles[i];
				wp.x -= (wp.z - 1) * delta.x;
				wp.y -= (wp.z - 1) * delta.y;
			}
		}
	};
	
	// Gets bounds of current zoom level of current position
	// 获取当前位置的当前缩放级别的边界
	this.getBounds = function() {
		return [
			{x: camera.x - canvas.width / 2 / camera.zoom, y: camera.y - canvas.height / 2 / camera.zoom},
			{x: camera.x + canvas.width / 2 / camera.zoom, y: camera.y + canvas.height / 2 / camera.zoom}
		];
	};
	
	// Gets bounds of minimum zoom level of current position
	// 获取当前位置的最小缩放级别的边界
	this.getOuterBounds = function() {
		return [
			{x: camera.x - canvas.width / 2 / camera.minZoom, y: camera.y - canvas.height / 2 / camera.minZoom},
			{x: camera.x + canvas.width / 2 / camera.minZoom, y: camera.y + canvas.height / 2 / camera.minZoom}
		];
	};
	
	// Gets bounds of maximum zoom level of current position
	// 获取当前位置的最大缩放级别的边界
	this.getInnerBounds = function() {
		return [
			{x: camera.x - canvas.width / 2 / camera.maxZoom, y: camera.y - canvas.height / 2 / camera.maxZoom},
			{x: camera.x + canvas.width / 2 / camera.maxZoom, y: camera.y + canvas.height / 2 / camera.maxZoom}
		];
	};
	
	//启动UI层
	this.startUILayer = function() {
		context.setTransform(1,0,0,1,0,0);
	}
	
	//高度范围
	var debugBounds = function(bounds, text) {
		context.strokeStyle   = '#fff';
		context.beginPath();
		context.moveTo(bounds[0].x, bounds[0].y);
		context.lineTo(bounds[0].x, bounds[1].y);
		context.lineTo(bounds[1].x, bounds[1].y);
		context.lineTo(bounds[1].x, bounds[0].y);
		context.closePath();
		context.stroke();
		context.fillText(text, bounds[0].x + 10, bounds[0].y + 10);
	};
	
	var drawDebug = function() {
		debugBounds(camera.getInnerBounds(), 'Maximum zoom camera bounds');
		debugBounds(camera.getOuterBounds(), 'Minimum zoom camera bounds');
		debugBounds(camera.getBounds(), 'Current zoom camera bounds');
	};
};
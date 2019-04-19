var tools = {
	
	getStyle : function (obj, attr) {
	
		
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
		
	
	},
	
	
	setStyle : function (obj, attrObj) {
		for(var key in attrObj) {
			obj.style[key] = attrObj[key];
		}
	},
	
	
	getBodyDis : function (obj) {
		var left = 0, top = 0;
		while(obj.offsetParent) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			// obj赋值为父级，往前走一步继续计算
			obj = obj.offsetParent;
		}
		return {
			"top" : top,
			"left" : left
		};
	},
	
	
	getBody : function () {
		return {
			width : document.documentElement.clientWidth || document.body.clientWidth,
			height : document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	
	on: function (obj, type, fn, isCapture) {
		isCapture = isCapture || false;
		
		if(window.attachEvent){
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
		
	},
	
	off : function (obj, type, fn, isCapture) {
		isCapture = isCapture || false;
		if(window.detachEvent){
			obj.detachEvent("on"+type, fn);
		}else{
			obj.removeEventListener(type, fn, isCapture);
		}
	},
	
	
	scroll : function (obj, fn) {
		// 回调函数
		// 判断事件有没有效，而不是有没有绑定（有效但是没有绑定的时候值为null）
		if(obj.onmousewheel !== undefined) {
			
			obj.onmousewheel = function (e) {
				e = e || event;
				
				fn(e.wheelDelta < 0);
				
			}
		}else{
			
			obj.addEventListener("DOMMouseScroll", function (e) {
				e = e || event;
				fn(e.detail>0);
			})
		}
	},
	
	
	linearMove : function (obj, attr, end, time) {
		// 先清除上一次的定时器
		// 把定时器挂在obj的自定义属性上，确保唯一性
		clearInterval(obj.timer);
		// 获取起点值
		var start = parseInt(this.getStyle(obj, attr));
		// 计算总距离
		var distance = end - start;
		// 计算速度
		// 计算运动的步数，以50ms为一步
		var steps = parseInt(time / 20);
		// 计算 px/步
		var speed = distance / steps;
		obj.timer = setInterval(function () {
			
			// 往前走一步
			start += speed
			obj.style[attr] = start + "px";
			
			if(Math.abs(start - end) < Math.abs(speed)) {
				clearInterval(obj.timer);
				
				obj.style[attr] = end + "px";
			}
		},20);
		
	},
	
	move: function (obj, attr, end) {
		console.log("move");
		// 清除上一次的定时器
		clearInterval(obj.timer);
		// 获取起点
		var start = parseInt(this.getStyle(obj, attr));
		// 开始运动
		obj.timer = setInterval(function () {
			console.log(11);
			// 剩下的距离
			var distance = end - start;
			// 速度
			
			var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);
			// 修改start
			start += speed;
			obj.style[attr] = start + "px";
			// 判断终点
	
			if(start === end) {
				clearInterval(obj.timer);
				console.log("end");
			}
		}, 20);
	},
	
	
	showCenter : function (obj) {
	
		obj.style.display = "block";
		
		let _this = this;
		function center () {
			var _top = (_this.getBody().height - obj.offsetHeight) / 2;
			var _left = (_this.getBody().width - obj.offsetWidth) / 2;
			console.log(obj.offsetHeight, obj.offsetWidth);
			_this.setStyle(obj, {
				position :"absolute",
				left : _left + "px",
				top : _top + "px"
			});
		};
		center();
		
		window.onresize = center;
	}
}


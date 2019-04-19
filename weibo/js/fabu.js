class fabu {
	constructor(btn) {
		// 找到点击弹框按钮
		// 传参或者直接查找根据实际情况决定
	    this.btn = document.querySelector(btn);
		this.container = document.querySelector("#container");
		
		this.date = new Date();
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth() + 1;
		this.tian = this.date.getDate();
		this.hours = this.date.getHours();
		this.minutes = this.date.getMinutes();
		this.seconds = this.date.getSeconds();
		this.str = this.year + "年" + this.month + "月" + this.tian +"日" 
		+ this.hours + "时" + this.minutes + "分" + this.seconds + "秒";
		this.shijian = this.date.getTime();
		this.bindEvents();
	}
	
	bindEvents () {
		// 给发布弹框按钮绑定事件
		/* this.btn.onclick = () => {
			console.log(this);
		} */
		let _this = this;
		this.btn.onclick = function () {
			//console.log(_this);
			// 给container插入内容
			_this.container.innerHTML = '<h4>用户发布</h4>'+
			'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
			'<p><label>用户名：<input id="username" type="text"></label></p>'+
			'<p><label>内　容：<textarea id="content"></textarea></label></p>'+
			'<p><button id="fabuBtn" class="fabuBtn" type="button">发布</button></p>';
			// container显示并且居中
			tools.showCenter(_this.container);
			// 模态层
			_this.modal = document.createElement("div");
			_this.modal.className = "modal";
			document.body.appendChild(_this.modal);
			
			// container可拖拽
			new Drag(_this.container, "h4").init();
		}
		
		// 给删除按钮绑事件（委托给container）
		this.container.onclick = function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			
			
			// case穿透
			switch(target.id) {
				case "fabuBtn":
					_this.fabuBtn();
				break;
				case "closeBtn" :
					_this.container.style.display = "none";
					document.body.removeChild(_this.modal);
			}	
		}
		
	}
	fabuBtn(){
		let username = document.querySelector("#username").value;
		let content = document.querySelector("#content").value;
		
		// --- 发送到页面上 ----
		document.body.innerHTML = `
			<div id = "box">
			<p><label>用户名：${username}</label></p> 
			<p><label>内　容：${content} </label></p> 
			<p><label>发布时间：${this.str}</label></p>
			</div>
			`;
		this.div = document.body.querySelector("#box");
		this.div.oncontextmenu = e =>{
			if(e.preventDefault) {
				e.preventDefault();
				this.chexiao = document.createElement("button");
				this.chexiao.className = "cheBtn";
				this.chexiao.innerHTML = "撤销";
				this.div.appendChild(this.chexiao);
				this.cheBtn = this.div.querySelector(".cheBtn")
				this.nowTime = new Date();
				this.now = this.nowTime.getTime();
				this.two = this.now - this.shijian;
				this.cheBtn.onclick = this.cheBtnClick.bind(this);
				console.log(this.now, this.shijian,this.two);
				}
			else  {window.event.returnValue = false;}
		}
		
	}
	cheBtnClick(){
		if(this.two <= 7200000){
			document.body.remove("#box");
			 }else{
				 alter("很抱歉，超过两分钟了哦");
			 }
	}

}

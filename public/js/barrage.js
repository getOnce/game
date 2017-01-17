var $canvas = document.getElementById("js-canvas"),
		blah_1 = [
			'现在能赚多少啊?',
			'每天满世界跑，怎么也不见涨工资啊?',
			'做了运营一直写小广告没前途吧?',
			'不要跳槽了，年轻人不要那么浮造!',
			'学了计算机要给领导修电脑吗?',
			'产品经理是不是不能算经理啊?',
			'方案又被客户毙了不要气馁啊!',
			'怎么天天加班?',
			'我看你朋友圈为什么老说要给客户改稿子啊?',
			'到这个年纪就别到处疯玩儿啦!',
		],
		blah_2 = [
			'打不打算安顿下来呀?',
			'你们俩准备什么时候结婚呢?',
			'做了运营一直写小广告没前途吧?',
			'那个姑娘我瞅着可以，你自己也努努力呀!',
			'都这么大了，还挑什么劲儿啊?',
			'春节要带朋友回家吗?',
			'到这个年纪就别到处疯玩儿啦!',
			'方案又被客户毙了不要气馁啊!',
			'我看你朋友圈为什么老说要给客户改稿子啊?',
			'老大不小了!',
			'上次我看那个小伙子不错，怎么后来没信儿了!',
			'想不想要孩子呀?'
		],
		color = [
			'#000',
			'#e500d9',
			'#0031ec',
			'#00f000',
			'#fd0000',
			'#dd6c00'
		],
		size = [
			'2rem Open Sans, Microsoft YaHei',
			'.2rem Open Sans, Microsoft YaHei',
			'.1rem Open Sans, Microsoft YaHei',
			'.4rem Open Sans, Microsoft YaHei',
			'.3rem Open Sans, Microsoft YaHei',
		],
		position = [
			{
				left: $canvas.width,
				top: 10
			},
			{
				left: $canvas.width -60,
				top: 20
			},
			{
				left: $canvas.width - 30,
				top: 30
			},
			{
				left: $canvas.width - 70,
				top: 40
			},
			{
				left: $canvas.width - 10,
				top: 50
			},
			{
				left: $canvas.width - 80,
				top: 60
			},
			{
				left: $canvas.width - 40,
				top: 70

			},
			{
				left: $canvas.width - 90,
				top: 90
			},
			{
				left: $canvas.width - 50,
				top: 110
			},
			{
				left: $canvas.width - 20,
				top: 130
			}
		],
		barrage = {
			$canvas: document.getElementById("js-canvas"),
			ctx: $canvas.getContext('2d'),
			width: $canvas.width,
			height: $canvas.height,
			strokeStyle: function(color){
				this.ctx.strokeStyle = color;
				return this;
			},
			fillStyle: function(color){
				this.ctx.fillStyle = color;
				return this;
			},
			strokeText: function(text, left, top){
				this.ctx.strokeText(text, left, top);
				return this;
			},
			fillText: function(text, left, top){
				this.ctx.fillText(text, left, top);
				return this;
			},
			clear: function(){
				this.ctx.clearRect(0, 0, this.width, this.height);
				return this;
			},
			setBaseLine: function(baseline){
				this.ctx.textBaseline = baseline || "hanging";
				return this;
			},
			setFont: function(fonts){
				this.ctx.font = fonts || '1rem Open Sans, Microsoft YaHei';
				return this;
			},
			setLineWidth: function(border){
				this.ctx.lineWidth = border || 3;
				return this;
			},
			random: function(number){
				return Math.floor(Math.random() * number);
			},
			renderText: function(size, color, text, left, top){

				this
					.setLineWidth()
					.setBaseLine()
					.setFont(size)
					.fillStyle(color)
					.strokeStyle('#fff')
					.strokeText(text, left, top)
					.fillText(text, left, top);
				return this;
			},
			renderTexts: function(){
				var me = this;
				me.words = me.words.map(function(item, index, array){
					me.renderText(
							item.size, 
							item.color, 
							item.text,
							item.left,
							item.top
						);
					item.left = item.left - item.speed;
					
					if(item.left <= -300){
						return {
							left: item.originLeft,
							originLeft: item.originLeft,
							top: item.top,
							speed: me.random(4) - 0 + 1,
							text: me.blah[me.random(me.blah.length)],
							color: color[me.random(color.length)],
							size: size[me.random(size.length)]
						}
					}
					return item;
				});

			},
			display: function(){
				this.width = $(window).width();
				this.height = 400;
				this.$canvas.width = this.width;
				this.$canvas.height = this.height;
				return this;
			},
			words: [],
			move: function(){
				this.clear()
					.renderTexts();
			},
			timer: null,
			raf: function(){
				var f = window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
              || window.mozRequestAnimationFrame
              || window.oRequestAnimationFrame
              || window.msRequestAnimationFrame
              || function(callback) {
                return window.setTimeout(callback, 1000 / 60);
              };
              return f(...Array.from(arguments));
          	},
          	craf: function(){
          		var cf = window.cancelRequestAnimationFrame
		              || window.webkitCancelRequestAnimationFrame
		              || window.mozCancelRequestAnimationFrame
		              || window.oCancelRequestAnimationFrame
		              || window.msCancelRequestAnimationFrame
		              || function(callback) {
		                return window.clearTimeout(callback);
		              };
		        return cf(...Array.from(arguments));  
          	},
			init: function(blah){
				this.blah = blah;
				//this.renderTexts();
				var me = this, 
					length = position.length,
					max = this.blah.length;
				me.words = [];	
				position.forEach(function(item, index, array){
					var obj = {
						left: item.left,
						originLeft: item.left,
						top: item.top,
						speed: me.random(4) - 0 + 1,
						text: me.blah[max - 1 > index? index: index % (max - 1)],
						color: color[me.random(color.length)],
						size: size[me.random(size.length)]
					}
					me.words.push(obj);
				});
				return this;
			},
			start: function(){
				var me = this;
				this.move();
				if(this.timer){
					this.craf(this.timer);
				}
				this.timer = this.raf(function(){
					me.start();
				});
				return this;
			},
			stop: function(){
				if(this.timer){
					this.craf(this.timer);
				}
				this.init(this.blah);
				return this;
			}
		}
		barrage
			.init(blah_1)
			.start();
		


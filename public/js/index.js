import {Map} from './Map';
import {Player} from './Player';
import {Line} from './Line';
import {Tween} from './Tween';
import {collision} from './collision';
import {util} from './util';
import {AOP} from './AOP';
import {main_settings as MS, colors_source, STATE} from './config';
const $ = util.$,
	  getStyle = util.getStyle;

let colors = [],
	map = null,
	role = null,
	movingLine = null,
	barrier = null,
	movingLineBeen = 0;

/* 地图 */
{
	map = new Map({
		$el: $('#js-canvas'),
		width: MS.mapWidth,
		height: MS.mapHeight
	});
	map.init();
}

/* 角色 = 玩家 */
{
	role = new Player({
		$el: $('#js-canvas'),
		url: MS.roleUrl,
		sx: MS.roleSx, //可选。开始剪切的 x 坐标位置。
		sy: MS.roleSy, //可选。开始剪切的 y 坐标位置。
		swidth: MS.roleSwidth, //可选。被剪切图像的宽度。
		sheight: MS.roleSheight, //可选。被剪切图像的高度。
		x: MS.roleX,	//在画布上放置图像的 x 坐标位置。
		y: MS.roleY,	//在画布上放置图像的 y 坐标位置。
		width: MS.roleWidth,	//可选。要使用的图像的宽度。（伸展或缩小图像）
		height: MS.roleHeight //可选。要使用的图像的高度。（伸展或缩小图像）
		
	});
	role.after('getimg', function(){
		role.render();
		role.rolePerform = MS.rolePerform;
	});
	role.changePerform = function(){
		role.rolePerform = role.rolePerform >= 3? 0: ++role.rolePerform;
		role.autoChangePerform();
	}
	role.changePerformTimer = null;
	role.autoChangePerform = function(){
		role.changePerformTimer = setTimeout(role.changePerform, 200);
	}
	role.stopChangePerform = function(){
		if(role.changePerformTimer){
			clearTimeout(role.changePerformTimer);
			role.changePerformTimer = null;
		}
	}
}

/* 路线 */
{
	movingLine = new Line({
		$el: $('#js-canvas')
	});
}

/* 障碍物 */
{
	barrier = new Player({
		$el: $('#js-canvas'),
		url: MS.barrierUrl,
		sx: MS.barrierSx, 
		sy: MS.barrierSy, 
		swidth: MS.barrierSwidth,
		sheight: MS.barrierSheight,
		x: MS.barrierX,	
		y: MS.barrierY,	
		width: MS.barrierWidth,	
		height: MS.barrierHeight 
	});
}
/* render all */
const main = {
	status: STATE[0], //当前状态 [wait, playing, pause, fail, ] = ['待开始', '游戏进行中', '游戏暂停中', '失败']
	$start: $('.js-start'),
	$reset: $('.js-reset'),
	$canvas: $('#js-canvas'),
	/**
	*检测两个图象是否有交集
	*@param role {object} 图像1
	*	role.x 横坐标	
	*	role.y 纵坐标
	*	role.width 宽度
	*	role.width 高度
	*@param barrier {object} 图像2
	*	barrier.x 横坐标	
	*	barrier.y 纵坐标
	*	barrier.width 宽度
	*	barrier.width 高度
	*@return {array} [x, y, x0, y0];
	*/
	simpleCheck(role, barrier){
		return collision.check(
					 role.x,
					 role.y, 
					 role.width, 
					 role.height,
					 barrier.x,
					 barrier.y,
					 barrier.width,
					 barrier.height
				);
	},
	/**
	*检测两个图象是否有交集 - 深度检测是否有像素重叠
	*@param role {object} 图像1
	*	role.x 横坐标	
	*	role.y 纵坐标
	*	role.width 宽度
	*	role.height 高度
	*	role....
	*@param barrier {object} 图像2
	*	barrier.x 横坐标	
	*	barrier.y 纵坐标
	*	barrier.width 宽度
	*	barrier.height 高度
	*	barrier....
	*@return {boolean};
	*/
	deepCheck(role, barrier, status){
		return collision.atomCheck_2(
				{
					img: role.img,
					x: role.x,
					y: role.y,
					sx: role.sx,
					sy: role.sy,
					swidth: role.swidth, 
					sheight: role.sheight, 
					width: role.width,	
					height: role.height
				}, 
				{
					img: barrier.img,
					x: barrier.x,
					y: barrier.y,
					sx: barrier.sx, 
					sy: barrier.sy, 
					swidth: barrier.swidth, 
					sheight: barrier.sheight, 
					width: barrier.width,	
					height: barrier.height
				},
				status
			);
	},
	barrierFactory(){ //创建障碍物方法
		return new Player({
			$el: $('#js-canvas'),
			url: MS.barrierUrl,
			sx: MS.barrierSx,
			sy: MS.barrierSy,
			swidth: MS.barrierSwidth,
			sheight: MS.barrierSheight,
			x: MS.barrierX,	
			y: MS.barrierY,	
			width: MS.barrierWidth,
			height: MS.barrierHeight
		});
	},
	createBarrier(){ //调用创建障碍物方法
		barrier = this.barrierFactory();
	},
	setBarrierX(){ //设置障碍物横坐标
		let $canvas = this.$canvas,
			width = parseInt(getStyle($canvas, 'width'), 10);
		barrier.x = width + MS.barrierHideWidth;
		MS.barrierX = width + MS.barrierHideWidth;
		return this;
	},
	renderLine(){ //加载线路
		colors
			.forEach(function(item, index, array){
				
				let pos = {
					ox: MS.movingLineItem * index - movingLineBeen,
					oy: MS.movingLineOY,
					x: MS.movingLineItem * (index + 1) - movingLineBeen,
					y: MS.movingLineY
				};
				if(index == 0){
					pos.ox = 0;
				}
				movingLine
					.beginPath()
					.moveTo(pos.ox, pos.oy)
					.lineTo(pos.x, pos.y)
					.strokeStyle(item || 'black')
					.stroke()
			});
			
	},
	renderAll(){
		const me = this;
		let result = false,
			result2 = false;

		//碰撞检测
		if(barrier.ready && role.ready){
			let status = me.simpleCheck(role, barrier);

			if(status.join('') != '0000' ){
				result = me.deepCheck(role, barrier, status);
			}
		}
		
		//清空画布
		map.clear();
		
		//玩家跳跃动画
		if(role.ready){
			role.sx = (MS.roleSwidth + 2) * role.rolePerform;
			role.render();
			if(role.jump == 'up'){
				role.y -= MS.roleSpeedUp;
				if(role.y <= MS.roleMaxY){
					role.jump = 'down';
				}
			}else if(role.jump == 'down'){
				role.y += MS.roleSpeedDown;
				if(role.y >= MS.roleY){
					role.y = MS.roleY;
					role.jump = false;
				}
			}
		}
		
		//路线移动
		me.renderLine();
		movingLineBeen += MS.movingLineSpeed;
		if(movingLineBeen >= MS.movingLineItem){
			colors
				.shift()
			colors	
				.push(colors_source[util.Random()%colors_source.length]);
			movingLineBeen = 0;	
		}

		//障碍物
		if(barrier.ready && barrier.x > -20){
			barrier.render();
			barrier.x -= MS.barrierSpeed;
		}else{
			this.createBarrier();
		}
		if(result && barrier.x > role.x){
			me.setStatus(STATE[3]);
			return false;
		}

		//碰撞检测
		if(barrier.ready && role.ready){
			let status = me.simpleCheck(role, barrier);
			if(status.join('') != '0000' ){
				let result2 = me.deepCheck(role, barrier, status);
			}	
		}

		//检查到碰撞
		if(result && result2){
			me.setStatus(STATE[3]);
			return false;
			
		}

		//帧动画
		MS.crf = util.raf(function(){
			me.renderAll();
		});
		return this;
	},
	bindEvent(){
		var me = this;
		me.$start
			.addEventListener('click', function(e){
				if(me.status == STATE[1]){
					e.currentTarget.innerText = '开始';
					me
						.clearTimeout()
						.setStatus(STATE[2]);
					
						
				}else if(me.status == STATE[2] || me.status == STATE[0]){
					e.currentTarget.innerText = '停止';
					me
					.renderAll()
					.setStatus(STATE[1]);
					if(!role.changePerformTimer){
						role.autoChangePerform();
					}
				}

			});
		me.$reset	
			.addEventListener('click', function(){
				me.reset();
			})
		$('body')	
			.addEventListener('keydown', function(e){
				if(me.status && e.keyCode == 32){
					role.jump = 'up';
				}
			});
		return this;	
	},
	clearTimeout(){
		if(MS.crf){
			util.cRaf(MS.crf)
		}
		return this;
	},
	reset(){
		this
			.clearTimeout()
			.setStatus()
			.setColors()
			.$start
			.innerText = '开始';
		//清空画布	
		map.clear();
		if(role.ready){
			role
				.reset()
				.render();
		}
		if(barrier.ready){
			this.createBarrier();
		}
		return this;
	},
	setStatus(value){
		this.status = value || STATE[0];
		return this;
	},
	setColors(){	//根据canvas宽度设置颜色
		colors = [];
		let $canvas = this.$canvas, 
			width = parseInt(getStyle($canvas, 'width'), 10),
			length = Math.round(width / MS.movingLineItem) - 0 + 1;
		while(length--){
			colors.push(colors_source[util.Random() % colors_source.length]);
		}
		return this;
	},
	init(){
		this
			.setColors()
			.setBarrierX()
			.bindEvent();

	}
}
AOP.after(
	'setStatus', 
	function(){
		if(main.status != STATE[1]){
			role.stopChangePerform();	
		}
	},
	main
);
main.init();



























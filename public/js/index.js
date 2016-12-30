import {Map} from './Map';
import {Player} from './Player';
import {Line} from './Line';
import {Tween} from './Tween';
import {collision} from './collision';
import {util} from './util';
const $ = util.$,
	  getStyle = util.getStyle;



let main_settings = {
	mapWidth: 1000,
	mapHeight: 170,

	crf:null,	//动画requestAnimationFrame

	roleSpeedUp: 5,
	roleSpeedDown: 3,
	roleX: 10,	//在画布上放置图像的 x 坐标位置。
	roleY: 90,	//在画布上放置图像的 y 坐标位置。
	roleUrl: 'public/images/player.png',
	roleSx: 0,	//可选。开始剪切的 x 坐标位置。
	roleSy: 0,	//可选。开始剪切的 y 坐标位置。
	roleSwidth: 89,	//	可选。被剪切图像的宽度。
	roleSheight: 89,	//	可选。被剪切图像的高度。
	roleWidth: 45,	//可选。要使用的图像的宽度。（伸展或缩小图像）
	roleHeight: 45,	//可选。要使用的图像的高度。（伸展或缩小图像）
	roleMaxY: 0,	//跳到最高点

	movingLineBeen: 0,	//路线向前行经过的路程
	movingLineItem: 60,	//路线分段的长度
	movingLineOY: 140,	//路线结束点横坐标
	movingLineY: 140,	//路线结束点纵坐标
	movingLineSpeed: 5,	//路线移动速度

	barrierUrl: 'public/images/cacti.png',
	barrierSx: 0,
	barrierSy: 0,
	barrierSwidth: 46,
	barrierSheight: 92,
	barrierWidth: 23,
	barrierHeight: 46,
	barrierX: 380,
	barrierY: 92,
	barrierSpeed: 4,
},
colors = [];
const colors_source = [//路线颜色可选值
	'red',
	'blue',
	'orange',
	'yellow',
	'purple',
	'black'
]
/* 根据canvas宽度设置颜色 */
function setColors(){
	let $canvas = $('#js-canvas'), 
		width = parseInt(getStyle($canvas, 'width'), 10),
		length = Math.round(width/main_settings.movingLineItem) - 0 + 1;
	while(length--){
		colors.push(colors_source[util.Random()%colors_source.length]);
	}
}
setColors();


/* 地图 */
let map = new Map({
	$el: $('#js-canvas'),
	width: main_settings.mapWidth,
	height: main_settings.mapHeight
});
map.init();

/* 角色 = 玩家 */
let role = new Player({
		$el: $('#js-canvas'),
		url: main_settings.roleUrl,
		sx: main_settings.roleSx,//	可选。开始剪切的 x 坐标位置。
		sy: main_settings.roleSy,//	可选。开始剪切的 y 坐标位置。
		swidth: main_settings.roleSwidth,//	可选。被剪切图像的宽度。
		sheight: main_settings.roleSheight,//	可选。被剪切图像的高度。
		x: main_settings.roleX,	//在画布上放置图像的 x 坐标位置。
		y: main_settings.roleY,	//在画布上放置图像的 y 坐标位置。
		width: main_settings.roleWidth,	//可选。要使用的图像的宽度。（伸展或缩小图像）
		height: main_settings.roleHeight//可选。要使用的图像的高度。（伸展或缩小图像）
	});
role.after('getimg', function(){
	role.render();
});

/* 路线 */
let movingLine = new Line({
		$el: $('#js-canvas')
	}),
	movingLineBeen = 0;
const renderLine = function(){
	colors
		.forEach(function(item, index, array){
			
			let pos = {
				ox: main_settings.movingLineItem * index - movingLineBeen,
				oy: main_settings.movingLineOY,
				x: main_settings.movingLineItem * (index + 1) - movingLineBeen,
				y: main_settings.movingLineY
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
		
}


/* 障碍物 */

let barrier = new Player({
		$el: $('#js-canvas'),
		url: main_settings.barrierUrl,
		sx: main_settings.barrierSx,//	可选。开始剪切的 x 坐标位置。
		sy: main_settings.barrierSy,//	可选。开始剪切的 y 坐标位置。
		swidth: main_settings.barrierSwidth,//	可选。被剪切图像的宽度。
		sheight: main_settings.barrierSheight,//	可选。被剪切图像的高度。
		x: main_settings.barrierX,	//在画布上放置图像的 x 坐标位置。
		y: main_settings.barrierY,	//在画布上放置图像的 y 坐标位置。
		width: main_settings.barrierWidth,	//可选。要使用的图像的宽度。（伸展或缩小图像）
		height: main_settings.barrierHeight//可选。要使用的图像的高度。（伸展或缩小图像）
	});
barrier.after('getimg', function(){
	role.render();
});



/* render all */
const main = {
	renderAll(){
		const me = this;
		//清空画布
		map.clear();
		//玩家跳跃动画
		if(role.ready){
			role.render();
			if(role.jump == 'up'){
				role.y -= main_settings.roleSpeedUp;
				if(role.y <= main_settings.roleMaxY){
					role.jump = 'down';
				}
			}else if(role.jump == 'down'){
				role.y += main_settings.roleSpeedDown;
				if(role.y >= main_settings.roleY){
					role.y = main_settings.roleY;
					role.jump = false;
				}
			}
		}
		//路线移动
		renderLine();
		movingLineBeen += main_settings.movingLineSpeed;
		if(movingLineBeen >= main_settings.movingLineItem){
			colors
				.shift()
			colors	
				.push(colors_source[util.Random()%colors_source.length]);
			movingLineBeen = 0;	
		}
		//障碍物
		if(barrier.ready && barrier.x > -20){
			barrier.render();
			barrier.x -= main_settings.barrierSpeed;
		}else{
			barrier = new Player({
				$el: $('#js-canvas'),
				url: main_settings.barrierUrl,
				sx: main_settings.barrierSx,//	可选。开始剪切的 x 坐标位置。
				sy: main_settings.barrierSy,//	可选。开始剪切的 y 坐标位置。
				swidth: main_settings.barrierSwidth,//	可选。被剪切图像的宽度。
				sheight: main_settings.barrierSheight,//	可选。被剪切图像的高度。
				x: main_settings.barrierX,	//在画布上放置图像的 x 坐标位置。
				y: main_settings.barrierY,	//在画布上放置图像的 y 坐标位置。
				width: main_settings.barrierWidth,	//可选。要使用的图像的宽度。（伸展或缩小图像）
				height: main_settings.barrierHeight//可选。要使用的图像的高度。（伸展或缩小图像）
			});
		}

		//碰撞检测
		if(barrier.ready && role.ready){
			let status = collision.check(role.x,
						 role.y, 
						 role.width, 
						 role.height,
						 barrier.x,
						 barrier.y,
						 barrier.width,
						 barrier.height);
			if(status.join('') != '0000' ){

				let result = collision.atomCheck_2(
								{
									img: role.img,
									pos: {
										x: role.x,
										y: role.y
									},
									size: {
										x: role.width,
										y: role.height,
									}
								}, 
								{
									img: barrier.img,
									pos: {
										x: barrier.x,
										y: barrier.y
									},
									size: {
										x: barrier.width,
										y: barrier.height,
									}
								},
								status);

				if(result){
					return false;
				}							
			}
			
		}
		

		//帧动画
		main_settings.crf = util.raf(function(){
			me.renderAll();
		});
		return this;
	},
	bindEvent(){
		var me = this;
		util
			.$('.js-start')
			.addEventListener('click', function(){
				me
					.renderAll()
					.on = true;

			});
		util
			.$('body')	
			.addEventListener('keydown', function(e){
				if(me.on && e.keyCode == 32){
					role.jump = 'up';
				}
			});
		return this;	
	},
	reset: function(){
		this.on = false;
	},
	init(){
		this
			.bindEvent();
	}
}

main.init();



























const colors_source = [//路线颜色可选值
	'red',
	'blue',
	'orange',
	'yellow',
	'purple',
	'black'
],
STATE = [
	'wait',		//待开始
	'playing',	//游戏进行中
	'pause',	//游戏暂停中
	'fail'		//游戏失败
];

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
	barrierHideWidth: 0
}
export {main_settings, colors_source, STATE}
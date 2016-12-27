webpackHotUpdate(0,{

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Map = __webpack_require__(79);

	var _Player = __webpack_require__(81);

	var _Line = __webpack_require__(84);

	var _Tween = __webpack_require__(85);

	var _util = __webpack_require__(86);

	var $ = _util.util.$;

	var main_settings = {
		mapWidth: 360,
		mapHeight: 170,

		crf: null, //动画requestAnimationFrame

		roleSpeedUp: 4,
		roleSpeedDown: 4,
		roleX: 10, //在画布上放置图像的 x 坐标位置。
		roleY: 90, //在画布上放置图像的 y 坐标位置。
		roleUrl: 'public/images/player.png',
		roleSx: 0, //可选。开始剪切的 x 坐标位置。
		roleSy: 0, //可选。开始剪切的 y 坐标位置。
		roleSwidth: 89, //	可选。被剪切图像的宽度。
		roleSheight: 89, //	可选。被剪切图像的高度。
		roleWidth: 45, //可选。要使用的图像的宽度。（伸展或缩小图像）
		roleHeight: 45, //可选。要使用的图像的高度。（伸展或缩小图像）
		roleMaxY: 30, //跳到最高点

		movingLineBeen: 0, //路线向前行经过的路程
		movingLineItem: 60, //路线分段的长度
		movingLineOY: 140, //路线结束点横坐标
		movingLineY: 140, //路线结束点纵坐标
		movingLineSpeed: 5 //路线移动速度
	},
	    colors = [//路线颜色
	'red', 'black', 'blue', 'black', 'yellow', 'purple', 'black'];

	var colors_source = [//路线颜色可选值
	'red', 'blue', 'orange', 'yellow', 'purple', 'black'];

	/* 地图 */
	var map = new _Map.Map({
		$el: $('#js-canvas'),
		width: main_settings.mapWidth,
		height: main_settings.mapHeight
	});
	map.init();

	/* 角色 = 玩家 */
	var role = new _Player.Player({
		$el: $('#js-canvas'),
		url: 'public/images/player.png',
		sx: main_settings.roleSx, //	可选。开始剪切的 x 坐标位置。
		sy: main_settings.roleSy, //	可选。开始剪切的 y 坐标位置。
		swidth: main_settings.roleSwidth, //	可选。被剪切图像的宽度。
		sheight: main_settings.roleSheight, //	可选。被剪切图像的高度。
		x: main_settings.roleX, //在画布上放置图像的 x 坐标位置。
		y: main_settings.roleY, //在画布上放置图像的 y 坐标位置。
		width: main_settings.roleWidth, //可选。要使用的图像的宽度。（伸展或缩小图像）
		height: main_settings.roleHeight //可选。要使用的图像的高度。（伸展或缩小图像）
	});
	role.after('getimg', function () {
		role.render();
	});

	/* 路线 */

	var movingLine = new _Line.Line({
		$el: $('#js-canvas')
	}),
	    movingLineBeen = 0;

	var renderLine = function renderLine() {
		colors.forEach(function (item, index, array) {

			var pos = {
				ox: main_settings.movingLineItem * index - movingLineBeen,
				oy: main_settings.movingLineOY,
				x: main_settings.movingLineItem * (index + 1) - movingLineBeen,
				y: main_settings.movingLineY
			};
			if (index == 0) {
				pos.ox = 0;
			}
			movingLine.beginPath().moveTo(pos.ox, pos.oy).lineTo(pos.x, pos.y).strokeStyle(item || 'black').stroke();
		});
	};

	var render = function render() {
		//清空画布
		map.clear();
		//玩家跳跃动画
		if (role.ready) {
			role.render();
			if (role.jump == 'up') {
				role.y -= main_settings.roleSpeedUp;
				if (role.y <= main_settings.roleMaxY) {
					role.jump = 'down';
				}
			} else if (role.jump == 'down') {
				role.y += main_settings.roleSpeedDown;
				if (role.y >= main_settings.roleY) {
					role.y = main_settings.roleY;
					role.jump = false;
				}
			}
		}
		//路线移动
		renderLine();
		movingLineBeen += main_settings.movingLineSpeed;
		if (movingLineBeen >= main_settings.movingLineItem) {
			colors.shift();
			colors.push(colors_source[_util.util.Random() % colors_source.length]);
			movingLineBeen = 0;
		}
		//帧动画
		main_settings.crf = _util.util.raf(function () {
			render();
		});
	};
	render();

	document.querySelector('#js-switch').addEventListener('click', function () {
		role.jump = 'up';
	});

/***/ }

})
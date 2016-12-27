webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	module.exports = __webpack_require__(78);


/***/ },

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
		movingLineOY: 140,
		movingLineY: 140
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
	}).after('getimg', function () {
		role.render();
	});

	document.querySelector('#js-switch').addEventListener('click', function () {
		role.jump = 'up';
	});

	/* 路 */

	var movingLine = new _Line.Line({
		$el: $('#js-canvas')
	}),
	    settings = movingLine.settings,
	    been = 0;

	var renderLine = function renderLine() {
		colors.forEach(function (item, index, array) {

			var pos = {
				ox: main_settings.movingLineItem * index - been,
				oy: main_settings.movingLineOY,
				x: main_settings.movingLineItem * (index + 1) - been,
				y: main_settings.movingLineY
			};
			if (index == 0) {
				pos.ox = 0;
			}
			movingLine.beginPath().moveTo(pos.ox, pos.oy).lineTo(pos.x, pos.y).strokeStyle(item || 'black').stroke();
		});
	};

	var render = function render() {
		map.clear();
		renderLine();
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
		crf = _util.util.raf(function () {
			been++;
			if (been >= main_settings.movingLineItem) {
				colors.shift();
				colors.push(colors_source[_util.util.Random() % colors_source.length]);
				been = 0;
			}
			render();
		});
	};
	render();

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Map = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _OO2 = __webpack_require__(80);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Map = function (_OO) {
		_inherits(Map, _OO);

		function Map(arg) {
			var _ref;

			_classCallCheck(this, Map);

			var _this = _possibleConstructorReturn(this, (_ref = Map.__proto__ || Object.getPrototypeOf(Map)).call.apply(_ref, [this].concat(_toConsumableArray(Array.from(arguments)))));

			_this.width = arg.width || 300;
			_this.height = arg.height || 300;
			_this.color = arg.color || 'rgba(255, 255, 255, 1)';
			return _this;
		}

		_createClass(Map, [{
			key: 'setHeight',
			value: function setHeight(height) {
				this.$el.height = height || this.height;
				return this;
			}
		}, {
			key: 'setWidth',
			value: function setWidth(width) {
				this.$el.width = width || this.width;
				return this;
			}
		}, {
			key: 'setDom',
			value: function setDom(width, height) {
				this.setWidth(width);
				this.setHeight(height);
				return this;
			}
		}, {
			key: 'clearRect',
			value: function clearRect() {
				this.ctx.clearRect(0, 0, this.width, this.height);
				return this;
			}
		}, {
			key: 'clear',
			value: function clear() {
				this.clearRect();
				return this;
			}
		}, {
			key: 'fillStyle',
			value: function fillStyle(color) {
				this.ctx.fillStyle = color || this.color;
				return this;
			}
		}, {
			key: 'fillRect',
			value: function fillRect() {
				this.ctx.fillRect(0, 0, this.width, this.height);
				return this;
			}
		}, {
			key: 'strokeStyle',
			value: function strokeStyle(color) {
				this.ctx.strokeStyle = color || this.color;
				return this;
			}
		}, {
			key: 'render',
			value: function render() {
				this.clear().fillStyle().fillRect();
				return this;
			}
		}, {
			key: 'init',
			value: function init() {
				this.setDom().render();
			}
		}]);

		return Map;
	}(_OO2.OO);

	exports.Map = Map;

/***/ },

/***/ 80:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OO = function () {
		function OO(arg) {
			_classCallCheck(this, OO);

			this.lang = arg.lang || 'cn';
			//canvas dom
			this.$el = arg.$el;
			this.ctx = arg.ctx || this.$el && this.$el.getContext('2d');
		}

		_createClass(OO, [{
			key: 'after',
			value: function after(fnName, fn) {
				var me = this;
				me._add(me, fnName, null, fn);
			}
		}, {
			key: 'before',
			value: function before(fnName, fn) {
				var me = this;
				me._add(me, fnName, fn, null);
			}
		}, {
			key: 'wrapper',
			value: function wrapper(fnName, before, after) {
				var me = this;
				return _add(me, fnName, before, after);
			}
		}, {
			key: '_add',
			value: function _add(o, name, before, after) {
				var flag = typeof o == 'function',
				    old = void 0,
				    f = void 0;
				//重载，如果o是函数
				if (flag) {
					old = o;
					after = before;
					before = name;
				} else {
					old = o[name];
				}
				f = old;
				if (typeof before == 'function') {
					f = this.getFunc(before, f, 1);
					for (var k in old) {
						f[k] = old[k];
					}
				}
				if (typeof after == 'function') {
					f = this.getFunc(f, after, 0);
					for (var k in old) {
						f[k] = old[k];
					}
				}

				if (!flag) {
					o[name] = f;
				}
				return f;
			}
		}, {
			key: 'getFunc',
			value: function getFunc(before, after, returnVal) {
				return function () {
					var v1 = before.apply(this, arguments),
					    v2 = after.apply(this, arguments);
					return returnVal == 0 ? v1 : v2;
				};
			}
		}]);

		return OO;
	}();

	exports.OO = OO;

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Player = undefined;

	var _ImgRole2 = __webpack_require__(82);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Player = function (_ImgRole) {
		_inherits(Player, _ImgRole);

		function Player(arg) {
			var _ref;

			_classCallCheck(this, Player);

			var _this = _possibleConstructorReturn(this, (_ref = Player.__proto__ || Object.getPrototypeOf(Player)).call.apply(_ref, [this].concat(_toConsumableArray(Array.from(arguments)))));

			_this.x = arg.x; //画布上的横坐标
			_this.y = arg.y; //画布上的纵坐标
			return _this;
		}

		return Player;
	}(_ImgRole2.ImgRole);

	exports.Player = Player;

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ImgRole = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Role2 = __webpack_require__(83);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ImgRole = function (_Role) {
		_inherits(ImgRole, _Role);

		function ImgRole(arg) {
			var _ref;

			_classCallCheck(this, ImgRole);

			var _this = _possibleConstructorReturn(this, (_ref = ImgRole.__proto__ || Object.getPrototypeOf(ImgRole)).call.apply(_ref, [this].concat(_toConsumableArray(Array.from(arguments)))));

			_this.url = arg.url || '';
			_this.img = arg.img || '';
			_this.getImgByUrl();
			_this.sx = arg.sx; //	可选。开始剪切的 x 坐标位置。
			_this.sy = arg.sy; //	可选。开始剪切的 y 坐标位置。
			_this.swidth = arg.swidth; //	可选。被剪切图像的宽度。
			_this.sheight = arg.sheight; //	可选。被剪切图像的高度。
			_this.x = arg.x; //在画布上放置图像的 x 坐标位置。
			_this.y = arg.y; //在画布上放置图像的 y 坐标位置。
			_this.width = arg.width; //可选。要使用的图像的宽度。（伸展或缩小图像）
			_this.height = arg.height; //可选。要使用的图像的高度。（伸展或缩小图像）
			return _this;
		}

		_createClass(ImgRole, [{
			key: 'getImgByUrl',
			value: function getImgByUrl(url) {
				var me = this,
				    $img = new Image();
				$img.src = url || this.url;
				$img.onload = function () {
					me.img = $img;
					me.ready = true;
					me.getimg();
				};
			}
		}, {
			key: 'getimg',
			value: function getimg() {
				return this.img;
			}
		}, {
			key: 'drawImage',
			value: function drawImage() {
				var _ctx;

				var arg = Array.from(arguments);
				(_ctx = this.ctx).drawImage.apply(_ctx, _toConsumableArray(arg));
				return this;
			}
		}, {
			key: 'render',
			value: function render() {
				var arg = [];
				if (arguments.length > 0) {
					arg = Array.from(arguments);
				} else {
					arg = [this.img, //规定要使用的图像、画布或视频。
					this.sx, //	可选。开始剪切的 x 坐标位置。
					this.sy, //	可选。开始剪切的 y 坐标位置。
					this.swidth, //	可选。被剪切图像的宽度。
					this.sheight, //	可选。被剪切图像的高度。
					this.x, //在画布上放置图像的 x 坐标位置。
					this.y, //在画布上放置图像的 y 坐标位置。
					this.width, //可选。要使用的图像的宽度。（伸展或缩小图像）
					this.height //可选。要使用的图像的高度。（伸展或缩小图像）
					];
				}

				this.drawImage.apply(this, arg);
				return this;
			}
		}]);

		return ImgRole;
	}(_Role2.Role);

	exports.ImgRole = ImgRole;

/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Role = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _OO2 = __webpack_require__(80);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Role = function (_OO) {
	    _inherits(Role, _OO);

	    function Role() {
	        var _ref;

	        _classCallCheck(this, Role);

	        return _possibleConstructorReturn(this, (_ref = Role.__proto__ || Object.getPrototypeOf(Role)).call.apply(_ref, [this].concat(_toConsumableArray(Array.from(arguments)))));
	    }

	    _createClass(Role, [{
	        key: 'fillStyle',
	        value: function fillStyle(color) {
	            this.ctx.fillStyle = color || me.color;
	            return this;
	        }
	    }, {
	        key: 'strokeStyle',
	        value: function strokeStyle(color) {
	            this.ctx.strokeStyle = color || me.color;
	            return this;
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(x, y) {
	            this.ctx.moveTo(x, y);
	            return this;
	        }
	    }, {
	        key: 'lineTo',
	        value: function lineTo(x, y) {
	            this.ctx.lineTo(x, y);
	            return this;
	        }
	    }, {
	        key: 'stroke',
	        value: function stroke() {
	            this.ctx.stroke();
	            return this;
	        }
	    }, {
	        key: 'closePath',
	        value: function closePath() {
	            this.ctx.closePath();
	            return this;
	        }
	    }, {
	        key: 'beginPath',
	        value: function beginPath() {
	            this.ctx.beginPath();
	            return this;
	        }
	    }]);

	    return Role;
	}(_OO2.OO);

	exports.Role = Role;

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Line = undefined;

	var _Role2 = __webpack_require__(83);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Line = function (_Role) {
		_inherits(Line, _Role);

		function Line(arg) {
			var _ref;

			_classCallCheck(this, Line);

			/* 线的样式坐标等 */
			var _this = _possibleConstructorReturn(this, (_ref = Line.__proto__ || Object.getPrototypeOf(Line)).call.apply(_ref, [this].concat(_toConsumableArray(Array.from(arguments)))));

			_this.settings = arg.settings || {};
			return _this;
		}

		return Line;
	}(_Role2.Role);

	exports.Line = Line;

/***/ },

/***/ 85:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Tween = {
	    Linear: function Linear(t, b, c, d) {
	        return c * t / d + b;
	    },
	    Quad: {
	        easeIn: function easeIn(t, b, c, d) {
	            return c * (t /= d) * t + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return -c * (t /= d) * (t - 2) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	            return -c / 2 * (--t * (t - 2) - 1) + b;
	        }
	    },
	    Cubic: {
	        easeIn: function easeIn(t, b, c, d) {
	            return c * (t /= d) * t * t + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return c * ((t = t / d - 1) * t * t + 1) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t + 2) + b;
	        }
	    },
	    Quart: {
	        easeIn: function easeIn(t, b, c, d) {
	            return c * (t /= d) * t * t * t + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	        }
	    },
	    Quint: {
	        easeIn: function easeIn(t, b, c, d) {
	            return c * (t /= d) * t * t * t * t + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	        }
	    },
	    Sine: {
	        easeIn: function easeIn(t, b, c, d) {
	            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return c * Math.sin(t / d * (Math.PI / 2)) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	        }
	    },
	    Expo: {
	        easeIn: function easeIn(t, b, c, d) {
	            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if (t == 0) return b;
	            if (t == d) return b + c;
	            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	        }
	    },
	    Circ: {
	        easeIn: function easeIn(t, b, c, d) {
	            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	        }
	    },
	    Elastic: {
	        easeIn: function easeIn(t, b, c, d, a, p) {
	            if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
	            if (!a || a < Math.abs(c)) {
	                a = c;var s = p / 4;
	            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        },
	        easeOut: function easeOut(t, b, c, d, a, p) {
	            if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
	            if (!a || a < Math.abs(c)) {
	                a = c;var s = p / 4;
	            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d, a, p) {
	            if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
	            if (!a || a < Math.abs(c)) {
	                a = c;var s = p / 4;
	            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	        }
	    },
	    Back: {
	        easeIn: function easeIn(t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            return c * (t /= d) * t * ((s + 1) * t - s) + b;
	        },
	        easeOut: function easeOut(t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	        },
	        easeInOut: function easeInOut(t, b, c, d, s) {
	            if (s == undefined) s = 1.70158;
	            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	        }
	    },
	    Bounce: {
	        easeIn: function easeIn(t, b, c, d) {
	            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
	        },
	        easeOut: function easeOut(t, b, c, d) {
	            if ((t /= d) < 1 / 2.75) {
	                return c * (7.5625 * t * t) + b;
	            } else if (t < 2 / 2.75) {
	                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	            } else if (t < 2.5 / 2.75) {
	                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	            } else {
	                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	            }
	        },
	        easeInOut: function easeInOut(t, b, c, d) {
	            if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	        }
	    }
	};
	exports.Tween = Tween;

/***/ },

/***/ 86:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var util = {
	  raf: function raf() {
	    var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	      return window.setTimeout(callback, 1000 / 60);
	    };
	    return f.apply(undefined, _toConsumableArray(Array.from(arguments)));
	  },
	  cRaf: function cRaf() {
	    var cf = window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function (callback) {
	      return window.clearTimeout(callback);
	    };
	    return cf.apply(this, arguments);
	  },
	  $: function $(selector) {
	    return document.querySelector(selector);
	  },
	  on: function on(type, fn, c) {
	    return document.addEventListener(type, fn, c === true ? true : false);
	  },
	  Random: function Random() {
	    return Math.round(Math.random() * 10);
	  }
	};
	exports.util = util;

/***/ }

})
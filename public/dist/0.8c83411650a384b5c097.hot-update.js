webpackHotUpdate(0,{

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

/***/ }

})
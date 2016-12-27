import {Role} from './Role';
class ImgRole extends Role{
	constructor(arg){
		
		super(...Array.from(arguments));
		this.url = arg.url || '';
		this.img = arg.img || '';
		this.getImgByUrl();
		this.sx = arg.sx;//	可选。开始剪切的 x 坐标位置。
		this.sy = arg.sy; //	可选。开始剪切的 y 坐标位置。
		this.swidth = arg.swidth;//	可选。被剪切图像的宽度。
		this.sheight = arg.sheight; //	可选。被剪切图像的高度。
		this.x = arg.x; //在画布上放置图像的 x 坐标位置。
		this.y = arg.y; //在画布上放置图像的 y 坐标位置。
		this.width = arg.width; //可选。要使用的图像的宽度。（伸展或缩小图像）
		this.height = arg.height;//可选。要使用的图像的高度。（伸展或缩小图像）
	}
	getImgByUrl(url){
		let me = this,
			$img = new Image();
		$img.src = url || this.url;
		$img.onload = function(){
			me.img = $img;
			me.ready = true;
			me.getimg();
		}
	}
	getimg(){
		return this.img;
	}
	drawImage(){
		let arg = Array.from(arguments);
		this.ctx.drawImage(...arg);
		return this;
	}
	render(){
		let arg = [];
		if(arguments.length > 0){
			arg = Array.from(arguments);
		}else{
			arg = [
				this.img, //规定要使用的图像、画布或视频。
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
}
export {ImgRole};

















import {ImgRole} from './ImgRole';
class Player extends ImgRole{
	constructor(arg){
		super(...Array.from(arguments));
		this.x = arg.x; //画布上的横坐标
		this.y = arg.y; //画布上的纵坐标
	}
}
export {Player};
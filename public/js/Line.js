import {Role} from './Role';
class Line extends Role{
	constructor(arg){
		super(...Array.from(arguments));
		/* 线的样式坐标等 */
		this.settings = arg.settings || {};
	}
}

export {Line}
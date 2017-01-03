import {Role} from './Role';
class Line extends Role{
	constructor(arg){
		super(...Array.from(arguments));
		/* 线的样式坐标等 */
		this.settings = arg.settings || {};
		if(arg){
			this.initialData = {};
			for(var key in arg){
				this.initialData[key] = arg[key];
			}
		}
	}
	reset(){
		for(var key in this.initialData){
			this[key] = this.initialData[key];
		}
		return this;
	}
}

export {Line}
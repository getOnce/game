class Route extends ImgRole{
	constructor(arg){
		super(...Array.from(arguments));
		/* 路的样式坐标等 */
		this.settings = arg.settings || {};
	}
}

export {Route}
import {OO} from './OO';
class Map extends OO{
	constructor(arg){
		super(...Array.from(arguments));
		this.width = arg.width || 300;
		this.height = arg.height || 300;
		this.color = arg.color || 'rgba(255, 255, 255, 1)';
	}
	setHeight(height){
		this.$el.height = height || this.height;
		return this;
	}
	setWidth(width){
		this.$el.width = width || this.width;
		return this;
	}
	setDom(width, height){
		this.setWidth(width);
		this.setHeight(height);
		return this;
	}
	clearRect(){
		this.ctx.clearRect(0, 0, this.width, this.height);
		return this;
	}
	clear() {
        this.clearRect();
        return this;
    }
    fillStyle(color){
		this.ctx.fillStyle = color || this.color;
		return this;
	}
	fillRect(){
		this.ctx.fillRect(0, 0, this.width, this.height);
		return this;
	}
    strokeStyle(color){
        this.ctx.strokeStyle = color || this.color;
        return this;
    }
    render() {
        this
        	.clear()
        	.fillStyle()
        	.fillRect();
		return this;        
    }
    init(){
    	this
    		.setDom()
    		.render();
    }
}
export {Map}
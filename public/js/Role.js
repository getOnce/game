import {OO} from './OO';
class Role extends OO{
	constructor(){
		super(...Array.from(arguments));
	}
	fillStyle(color){
		this.ctx.fillStyle = color || me.color;
		return this;
	}
    strokeStyle(color){
        this.ctx.strokeStyle = color || me.color;
        return this;
    }
    moveTo(x, y){
        this.ctx.moveTo(x, y);
        return this;
    }
    lineTo(x, y){
        this.ctx.lineTo(x, y);
        return this;
    }
    stroke(){
        this.ctx.stroke();
        return this;
    }
    closePath(){
        this.ctx.closePath();
        return this;
    }
    beginPath(){
        this.ctx.beginPath();
        return this;
    }
}
export {Role};
let collision = {
	/**
    *检查两个图像是否有相交的部分，<检测规则矩形>
    *@param A {number} 矩形一左上角顶点坐标x值
    *@param B {number} 矩形一左上角顶点坐标y值
    *@param C {number} 矩形一宽度width
    *@param D {number} 矩形一高度height
    *@param E {number} 矩形二左上角顶点坐标x值
    *@param F {number} 矩形二左上角顶点坐标y值
    *@param G {number} 矩形二宽度width
    *@param H {number} 矩形二高度height
    *@condition 如果相交，假设相交矩形对角坐标 左上角点坐标(x0, y0) 右下角点坐标(x1, y1) -- x1 > x0 & y1 > y0
    *@return [x0, y0, x1, y1]
    *相交面积大于 0 即为碰撞
    *(x1 - x0) * (y0 - y1) > 0; 
    */
    check(A, B, C, D, E, F, G, H) {
        // 转为对角线坐标
        C += A, 
        D += B, 
        G += E, 
        H += F;
        // 没有相交
        if (C <= E || G <= A || D <= F || H <= B)
          return [0, 0, 0, 0];

        var tmpX, tmpY;

        if (E > A) {
         tmpX = G < C ? [E, G] : [E, C];
        } else {
         tmpX = C < G ? [A, C] : [A, G];
        }

        if (F > B) {
         tmpY = H < D ? [F, H] : [F, D];
        } else {
         tmpY = D < H ? [B, D] : [B, H];
        }
        return [tmpX[0], tmpY[0], tmpX[1], tmpY[1]];
    },
    /**
    *像素级检测
    *@thoery 同时检测两图在相交矩形内的像素，若存在一点在两个图上的 alpha 值不为 0，则发生碰撞。
    *@param a {object} 
    	被检测的对象 :
    	{
    		img: img dom元素<即两个碰撞物其中一个>, 
    		pos: {x: 坐标x, y: 坐标y}, 
    		size:{x: width, y: height}
    	}
    *@param b{object}	
    	被检测的对象 :
    	{
    		img: img dom元素<即两个碰撞物其中一个>, 
    		pos: {x: 坐标x, y: 坐标y}, 
    		size:{x: width, y: height}
    	}
    *@param rect {array} 数组，由check返回的值
    */
    atomCheck(a, b, rect){
    	 // 离屏 canvas
  		let canvas = document.createElement('canvas'),
  			_ctx = canvas.getContext('2d');

  		_ctx.drawImage(a.img, 0, 0, a.size.x, a.size.y);
  		// 相对位置
  		let data1 = _ctx.getImageData(rect[0] - a.pos.x, 
  			rect[1] - a.pos.y, 
  			rect[2] - rect[0], 
  			rect[3] - rect[1]).data;

  		_ctx.clearRect(0, 0, b.size.x, b.size.y);
  		_ctx.drawImage(b.img, 0, 0, b.size.x, b.size.y);

  		let data2 = _ctx.getImageData(rect[0] - b.pos.x, 
  			rect[1] - b.pos.y, 
  			rect[2] - rect[0], 
  			rect[3] - rect[1]).data;

  		canvas = null;

  		  for(let i = 3; i < data1.length; i += 4) {
  		    if(data1[i] > 0 && data2[i] > 0) 
  		      return true; // 碰撞
  		  }
  		  return false;
    },
    /**
    *像素级检测方法2
    *@thoery 先画一张图，然后将混合模式改为source-in，这时再画图， 
    	新图片会仅仅出现与原有内容重叠的地方 ，其他地方透明度变为 0，
    	这时就可以通过判断是否所有像素都透明来判断碰撞了。
    *@param a {object} 
    	被检测的对象 :
    	{
    		img: img dom元素<即两个碰撞物其中一个>, 
    		pos: {x: 坐标x, y: 坐标y}, 
    		size:{x: width, y: height}
    	}
    *@param b{object}	
    	被检测的对象 :
    	{
    		img: img dom元素<即两个碰撞物其中一个>, 
    		pos: {x: 坐标x, y: 坐标y}, 
    		size:{x: width, y: height}
    	}
    *@param rect {array} 数组，由check返回的值
    */
    atomCheck_2(a, b ,rect){
    	// 离屏 canvas
		let canvas = document.createElement('canvas'),
		  	_ctx = canvas.getContext('2d');

		  // 将 (0, 0) 作为基准点，将 a 放入 (0, 0) 位置
		_ctx.drawImage(a.img, 0, 0, a.size.x, a.size.y);
		_ctx.globalCompositeOperation = 'source-in';
		_ctx.drawImage(b.img, b.pos.x - a.pos.x, 
			b.pos.y - a.pos.y, 
			b.size.x, b.size.y);

		let data = _ctx.getImageData(rect[0] - a.pos.x, 
		  	rect[1] - a.pos.y, 
		  	rect[2] - rect[0], 
		  	rect[3] - rect[1]).data;

		  canvas = null;
		  
		_ctx.globalCompositeOperation = 'source-over';
		    
		for(let i = 3; i < data.length; i += 4) { 
		    if (data[i]) return true;  // 碰撞
		}

		return false;
    }

}

export {collision};




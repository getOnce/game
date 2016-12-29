let util = {
	raf(){
		var f = window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
              || window.mozRequestAnimationFrame
              || window.oRequestAnimationFrame
              || window.msRequestAnimationFrame
              || function(callback) {
                return window.setTimeout(callback, 1000 / 60);
              };
              return f(...Array.from(arguments));
    },         
    cRaf(){
     	var cf = window.cancelRequestAnimationFrame
              || window.webkitCancelRequestAnimationFrame
              || window.mozCancelRequestAnimationFrame
              || window.oCancelRequestAnimationFrame
              || window.msCancelRequestAnimationFrame
              || function(callback) {
                return window.clearTimeout(callback);
              };
        return cf.apply(this, arguments);      
    },
    $(selector){
    	return document.querySelector(selector);
    },
    on(type, fn, c){
      return document.addEventListener(type, fn, c === true? true: false);
    },
    Random(){
      return Math.round(Math.random() * 10);
    }
           
}
export {util};





  


















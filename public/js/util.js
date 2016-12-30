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
        return cf(...Array.from(arguments));      
    },
    $(selector){
    	return document.querySelector(selector);
    },
    on(type, fn, c){
      return document.addEventListener(type, fn, c === true? true: false);
    },
    Random(){
      return Math.round(Math.random() * 10);
    },
    getStyle(dom, property){
      return window.getComputedStyle(dom)[property];
    }
           
}
export {util};





  


















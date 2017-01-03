let AOP = {
	core(o, name, before, after) {
		let flag = (typeof(o) == 'function'), old, f;
		//重载，如果o是函数
		if(flag) {
			old = o;
		after = before;
			before = name;
		} else {
			old = o[name];
		}
		f = old;
		if(typeof(before) == 'function') {
			f = this.getFunc(before, f, 1);
			for(var k in old) {
				f[k] = old[k];
			}
		}
		if(typeof(after) == 'function') {
			f = this.getFunc(f, after, 0);
			for(var k in old) {
				f[k] = old[k];
			}
		}
			
		if(!flag) {
			o[name] = f;
		}
		return f;
	},
	after(fnName, fn, context){
		AOP.core(context, fnName, null, fn);
	},
	before(fnName, fn, context) {
		AOP.core(context, fnName, fn, null);
	},
	wrapper( fnName, before, after, context) {
		return core(context, fnName, before, after);
	},
	getFunc(before, after, returnVal) {
		return function() {
			var
			v1 = before.apply(this, arguments),
			v2 = after.apply(this, arguments);
			return returnVal == 0 ? v1 : v2;
		};
	}
}


export {AOP}
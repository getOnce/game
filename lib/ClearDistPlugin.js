const exec = require('child_process').exec;
function ClearDistPlugin(url){
	this.url = url;
}
ClearDistPlugin.prototype.apply = function(compiler){
	var me = this;
	compiler.plugin('compile', (params) => {
		exec('rm -rf ' + me.url, (err, stdout, stderr) => {
			console.log('clear dist success');
		});
	});
}
module.exports = ClearDistPlugin;
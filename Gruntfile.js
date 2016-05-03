// 包装函数
module.exports = function(grunt) {
	// 任务配置，所有插件配置信息
	grunt.initConfig({
		// 获取 package.json
		pkg: grunt.file.readJSON("package.json")
	});
	// 执行grunt命令后执行项
	grunt.registerTask("default", []);
};

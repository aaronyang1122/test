!function(){var e=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.sortUserInfo=e({1:function(e,a,n,r,s){var t,i=e.escapeExpression;return'<h2>请选择宝贝年龄：</h2>\r\n<div class="content userInfo">\r\n	<h3>'+i(e.lambda(null!=(t=null!=a?a.user:a)?t.nickName:t,a))+" "+i((n.babyAge||a&&a.babyAge||n.helperMissing).call(null!=a?a:{},null!=(t=null!=a?a.user:a)?t.birthday:t,{name:"babyAge",hash:{},data:s}))+'岁</h3>\r\n	<a href="" class="btn-base btn-inline-1" id="showBabySort">只显示适合她的活动</a>\r\n	<a href="userInfo.html" class="edit-age" id="changeBabyAge">更改宝贝年龄</a>\r\n</div>\r\n'},3:function(e,a,n,r,s){return'<h2>请选择宝贝年龄：</h2>\r\n<div class="content userInfo">\r\n	<h3>您尚未登录</h3>\r\n	<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3fa0c56bd36c7469&redirect_uri=http%3a%2f%2fwww.imiaoxiu.com%2fbabypass-server%2fuser%2fbind%3fcityId%3d1&response_type=code&scope=snsapi_base&state=123#wechat_redirect" class="btn-base btn-inline-1" id="setBabyAge">设置宝贝年龄</a>\r\n</div>\r\n'},compiler:[7,">= 4.0.0"],main:function(e,a,n,r,s){var t;return null!=(t=n["if"].call(null!=a?a:{},null!=a?a.user:a,{name:"if",hash:{},fn:e.program(1,s,0),inverse:e.program(3,s,0),data:s}))?t:""},useData:!0})}();
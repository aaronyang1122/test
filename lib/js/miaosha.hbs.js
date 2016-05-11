!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.miaosha=n({1:function(n,a,l,s,i){var r,d,e=null!=a?a:{},t=l.helperMissing,o=n.escapeExpression,c="function";return(null!=(r=l["if"].call(e,null!=a?a.albums:a,{name:"if",hash:{},fn:n.program(2,i,0),inverse:n.noop,data:i}))?r:"")+'	\r\n<section>\r\n	<div class="skuInfo">\r\n		<div class="row row-1">\r\n			<div class="col-1">\r\n					<div class="row">\r\n					<div class="col-1">\r\n						<div class="discount-price"><i>￥</i>'+o((l.miaoshajia||a&&a.miaoshajia||t).call(e,a,{name:"miaoshajia",hash:{},data:i}))+'</div>\r\n					</div>\r\n					<div class="col-2">\r\n						<div class="store-price">￥'+o((l.yuanjia||a&&a.yuanjia||t).call(e,a,{name:"yuanjia",hash:{},data:i}))+'</div>\r\n						<div class="saled-num">'+o((d=null!=(d=l.appointedTimes||(null!=a?a.appointedTimes:a))?d:t,typeof d===c?d.call(e,{name:"appointedTimes",hash:{},data:i}):d))+'已售</div>\r\n					</div>\r\n				</div>	\r\n			</div>\r\n			<div class="col-2">\r\n				<div class="total-num">限量'+o((d=null!=(d=l.totalNum||(null!=a?a.totalNum:a))?d:t,typeof d===c?d.call(e,{name:"totalNum",hash:{},data:i}):d))+'份</div>\r\n			</div>\r\n		</div>\r\n		<div class="row row-2">\r\n			<div class="col-1">\r\n					<h1 class="shop-name">'+o((d=null!=(d=l.title||(null!=a?a.title:a))?d:t,typeof d===c?d.call(e,{name:"title",hash:{},data:i}):d))+'</h1>\r\n			</div>\r\n		</div>\r\n		<div class="row row-3">\r\n			<div class="col-1">\r\n				<a href="" class="address" id="showMap">'+o((d=null!=(d=l.address||(null!=a?a.address:a))?d:t,typeof d===c?d.call(e,{name:"address",hash:{},data:i}):d))+'</a>\r\n			</div>\r\n			<div class="col-2">\r\n				<p><span class="icon-location"></span>'+o((d=null!=(d=l.distance||(null!=a?a.distance:a))?d:t,typeof d===c?d.call(e,{name:"distance",hash:{},data:i}):d))+' km</p>\r\n			</div>\r\n		</div>\r\n		\r\n		<div class="count-down" id="countDown">\r\n			<div class="row">\r\n				<div class="col-1">\r\n					<ul class="time-down" id="timer">\r\n						<li><span id="timerHH">00</span></li>\r\n						<li><span id="timerMM">00</span></li>\r\n						<li><span id="timerSS">00</span></li>\r\n					</ul>\r\n				</div>\r\n				<div class="col-2">\r\n					<span class="jijiangkaishi">即将开始...</span>\r\n				</div>\r\n			</div>\r\n			<!--<div class="mask"></div>\r\n			<span class="sold-out"></span>\r\n			<input type="button" name="" id="submit" value="已秒完" class="submit_null" disabled="disabled" />-->\r\n			<!--<input type="button" name="" id="submit" value="立即秒杀" class="submit" disabled="disabled" />-->\r\n		</div>\r\n	</div>\r\n</section>\r\n			\r\n<section class="notice">\r\n	<h1><span>购买须知</span></h1>\r\n	<div class="content">\r\n		<dl>\r\n			<dt>有效期</dt>\r\n			<dd>工作日周末通用，法定节假日以商户营业时间为准</dd>\r\n'+(null!=(r=l["if"].call(e,null!=a?a.valid:a,{name:"if",hash:{},fn:n.program(5,i,0),inverse:n.noop,data:i}))?r:"")+"		</dl>\r\n"+(null!=(r=l["if"].call(e,null!=a?a.intro:a,{name:"if",hash:{},fn:n.program(7,i,0),inverse:n.noop,data:i}))?r:"")+"	</div>\r\n</section>\r\n"},2:function(n,a,l,s,i){var r,d,e,t=null!=a?a:{},o=l.helperMissing,c='	<div class="slide">\r\n		<ul>\r\n';return d=null!=(d=l.albums||(null!=a?a.albums:a))?d:o,e={name:"albums",hash:{},fn:n.program(3,i,0),inverse:n.noop,data:i},r="function"==typeof d?d.call(t,e):d,l.albums||(r=l.blockHelperMissing.call(a,r,e)),null!=r&&(c+=r),c+"			</ul>\r\n			"+n.escapeExpression((l.dot||a&&a.dot||o).call(t,null!=a?a.albums:a,{name:"dot",hash:{},data:i}))+"\r\n	</div>\r\n"},3:function(n,a,l,s,i){var r;return'			  <li><img src="'+n.escapeExpression((r=null!=(r=l.image||(null!=a?a.image:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"image",hash:{},data:i}):r))+'"></li>\r\n'},5:function(n,a,l,s,i){var r;return"				<dd>"+n.escapeExpression((r=null!=(r=l.valid||(null!=a?a.valid:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"valid",hash:{},data:i}):r))+"</dd>\r\n"},7:function(n,a,l,s,i){var r;return"		<dl>\r\n			<dt>温馨提示</dt>\r\n			<dd>"+n.escapeExpression((r=null!=(r=l.intro||(null!=a?a.intro:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"intro",hash:{},data:i}):r))+"</dd>\r\n		</dl>\r\n"},9:function(n,a,l,s,i){return'<div class="noData" id="noData">\r\n	啊哦，没有符合你要求的商户哦~\r\n</div>\r\n'},compiler:[7,">= 4.0.0"],main:function(n,a,l,s,i){var r;return null!=(r=l["if"].call(null!=a?a:{},a,{name:"if",hash:{},fn:n.program(1,i,0),inverse:n.program(9,i,0),data:i}))?r:""},useData:!0})}();
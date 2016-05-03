Handlebars.registerHelper({
	"dot": function(res, options) {
		var outer = '<div class=\"dot\">';
		for (var i = 0; i < res.length; i++) {
		if (i === 0) {
				outer += '<span class=\"cur\"></span>';
			} else {
				outer += '<span></span>';
			}
		}
		outer += '</div>';
		return new Handlebars.SafeString(outer);
	},
	"noResult": function(res, options) {
		if ((res == null || res.length == 0) && _init.list._data.pageNo == 1) {
			$("#loading").hide();
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	},
	"textTag": function(res, options) {
		var outer = "",
				age = "";
		for(var x in res){
			if((x == "regionName" && res[x] != null) || (x == "categoryName" && res[x] != null) || (x == "stars" && res[x] != null) || (x == "ageFrom" && res[x] != null) || (x == "ageTo" && res[x] != null)){
				if(x == "stars"){
					outer += "<span class=\"tag-text\">" + res[x] +"分</span>";
				}else if(x == "ageFrom"){
					age += Math.floor(res[x]/12)+"岁-";
				}else if(x == "ageTo"){
					age += Math.floor(res[x]/12)+"岁";
					outer += "<span class=\"tag-text\">" + age +"</span>";
				}else{
					outer += "<span class=\"tag-text\">" + res[x] + "</span>";
				}
			}
		}
		return new Handlebars.SafeString(outer);
	},
	"showTags": function(res, options) {
		if(res != undefined && res.length > 0){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	},
	"currentClass": function(res) {
		if(res == true){
			return "current";
		}
	},
	"babyAge": function(res) {
		return _method._getAge(res,"y");
	},
	"showDiscount": function(res) {
		var _discount = "", _s = parseInt(res.childStorePrice), _d = parseInt(res.childDiscountPrice);	
		if(_s === 0){
			_discount = 0;
		}else{
			_discount = Math.round((_d/_s)*100)/10;
		}
		return _discount;
	},
	"transformToAge": function(res) {
		var _age = "";
		_age = Math.floor(res/12);
		return _age; 
	},
	"cutDate": function(res) {
		var _date = res.split(/\s+/g);
		return _date[0];
	},
	"cutTime": function(res) {
		var _time = res.split(/\:/g);
		_time.pop();
		return _time.join(":");
	},
	"showPhoneNum": function(res) {
		if(!res) return;
		var _phone = res.split(/\s+/g);
		return _phone[0];
	},
	"hasSku": function(res, options) {
		if(res == true){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	},
	"czkStatus": function(res, options){
		switch(res)
		{
			case 0:
			return new Handlebars.SafeString("<span class=\"standby\">等待确认</span>");
			case 1:
			return new Handlebars.SafeString("<span class=\"success\">预约成功</span>");
			case 5:
			return new Handlebars.SafeString("<span class=\"canceled\">已取消</span>");
			case 6:
			return new Handlebars.SafeString("<span class=\"used\">已使用</span>");
			case 7:
			return new Handlebars.SafeString("<span class=\"expired\">已过期</span>");
		}
	},
	"czkDk": function(res, options){
		if(res == 1){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	},
	"czk": function(res, options){ 
		if(res == 1){
			return options.fn(this);
		}else{
			switch(res)
			{
				case 5:
				return new Handlebars.SafeString("<img src=\"../img/icon-canceled-mark.png\" class=\"cancel-ico\">");
				case 7:
				return new Handlebars.SafeString("<img src=\"../img/icon-guoqi-mark.png\" class=\"expired-ico\">");
				case 6:
				return new Handlebars.SafeString("<img src=\"../img/icon-used-mark.png\" class=\"used-ico\">");
			}
		}
	},
	"formatDate": function(res, options) {
		var _date = res.split(/\s+/g)[0];
		var _time = res.split(/\s+/g)[1];
		var _yy = _date.split(/\-/g)[0];
		var _mm = _date.split(/\-/g)[1];
		var _dd = _date.split(/\-/g)[2];
		var _dateCN = _yy+"年"+_mm+"月"+_dd+"日";
		_time = Handlebars.helpers.cutTime(_time);
		return _dateCN +" "+ _time;
	},
	"czkDaka": function(res, options){
		switch(res)
		{
			case 1:
			return new Handlebars.SafeString("<span class=\"baoyueka\">包月卡订单</span>");
			case 2:
			return new Handlebars.SafeString("<span class=\"chuzhika\">储值卡订单</span>");
		}
	},
	"showChangci": function(res, options){
		switch(res)
		{
			case 0:
				return options.fn(this);
			case 1:
				return options.inverse(this);
		}
	}
});
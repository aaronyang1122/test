_method = {
	//获取url参数值
	getQueryString: function(name) {
		if(!name){
			console.log("缺少参数：name");
			return;
		} 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURI(r[2])
		}
		return null
	},
	//校验手机号码
	checkPhoneNum: function(num) {
		if(!num) {
			console.log("缺少参数：num");
			return;
		}
		var b = num.val();
		var c = /^1[0-9]{10}$/g;
		return c.test(b);
	},
	//ios 显示页面title
	reloadTitle: function(title) {
		if(!title) {
			console.log("缺少参数：title");
			return;
		}
		var $body = $('body');
		document.title = title;
		var $iframe = $('<iframe src="img/favicon.ico"></iframe>');
		$iframe.on('load', function() {
			setTimeout(function() {
				$iframe.off('load').remove();
			}, 0);
		}).appendTo($body);
	},
	//userAgent
	os: function() {
	      var ua = navigator.userAgent,
	              isWindowsPhone = /(?:Windows Phone)/.test(ua),
	              isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
	              isAndroid = /(?:Android)/.test(ua),
	              isFireFox = /(?:Firefox)/.test(ua),
	              isChrome = /(?:Chrome|CriOS)/.test(ua),
	              isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
	              isPhone = /(?:iPhone)/.test(ua) && !isTablet,
	              isPc = !isPhone && !isAndroid && !isSymbian,
	              isWeiXin = /(?:MicroMessenger)/.test(ua);
	      return {
	          isTablet: isTablet,
	          isPhone: isPhone,
	          isAndroid : isAndroid,
	          isPc : isPc,
	          isWeiXin : isWeiXin
	      };
	}(),
	//ajax
	getData: function(_url,_callback,_type,_data,start) {
		if(!_url || !_callback) {
			console.log("缺少参数：_url\_callback");
			return;
		}
 		$.ajax({
			type: !_type?"GET":_type,
			timeout: 5000,
//			contentType : "application/json",
			contentType : function(){
				if(_data){
					if(_type == "GET" || !_type){
						return "application/x-www-form-urlencoded";
					}else{
						return "application/json";
					}
				}
			}(),
			dataType: "json",		
			data: function(){
				if(_data){
					if(_type == "GET" || !_type){
						return _data;
					}else{
						return JSON.stringify(_data);
					}
				}
			}(),
			url: _url,
			success: function(res) {
				setTimeout(function() {
					_callback.success(res,start);
				}, 200);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				_callback.failed(XMLHttpRequest, textStatus, errorThrown);
			}
		});
	},
	//isShowMore
	isShowMore: {
		check: function(total, dataLength) {
			if (total == dataLength) {
				this.result = true;
			} else if (total > dataLength) {
				this.result = false;
			}
		},
		result: true
	},
	//isShowMore
	_loading: {
		'$loading': "#loading",
		'showLoading': function() {
			$(this.$loading).show();
			$(this.$loading).appendTo($(this.$loading).parent());
		},
		'removeLoading': function() {
			$(this.$loading).remove();
		}
	},
	//scrollLoading
	scrollLoad: function(arg) {
		$('body').scrollTop(0); //初始化scrollTop
		var $window = $(window), $document = $(document);
		$window.on('scroll', function() {
			if (($document.scrollTop() + $window.height()) == $document.height() && this._method.isShowMore.result) {
				this._method.getData(arg._url,arg._callback,arg._type,arg._data);
			}
		})
	},
	overlay: {
    start: function(a) {
        $("#swipeCont-" + a).show().siblings().hide();
    },
    showLeft: function() {
        var contShow = $("#swipeTop"),swipeTabCont = $("#swipeTopCont"),bodyCont = $("body"),rightCate = $("#rightCate");
        bodyCont.append('<div id="leftmask" class="right-mask"><div class="infor hide"><div class="cont"><span class="r"></span><span class="l"></span></div></div></div>');
        $("#leftmask").css("height", bodyCont.height());
        rightCate.show();
        rightCate.css({height: bodyCont.height()});
        swipeTabCont.children('ul').css({height: bodyCont.height()});
        this.translation(contShow[0], {x: '0px'},function() {
            setTimeout(function(){_method.overlay.goTop();},300);
        });
    },
    hideLeft: function() {
        var contShow = $("#swipeTop"),swipeTabCont = $("#swipeTopCont"),bodyCont = $("body"),rightCate = $("#rightCate");
        this.translation(rightCate[0], {x: '-275px'},function() {
            $("#leftmask").remove();
            rightCate.hide();
            rightCate.attr("style", "");
            contShow.attr("style", "");
        });
    },
    //运动函数
    translation: function (b, a, fn) {
        a = $.extend({
            duration: "0.4s",
            origin: "0 0"
        },a || {});
        b = b.style; ! b.webkitTransitionProperty && (b.webkitTransitionProperty = "-webkit-transform");
        b.webkitTransitionDuration !== a.duration && (b.webkitTransitionDuration = a.duration);
        b.webkitTransformOrigin !== a.origin && (b.webkitTransformOrigin = a.origin);
        "hidden" !== b.webkitBackfaceVisibility && (b.webkitBackfaceVisibility = "hidden");
        "preserve-3d" !== b.webkitTransformStyle && (b.webkitTransformStyle = "preserve-3d");
        if (null != a.x || null != a.y) b.webkitTransform = "translate(" + (a.x ? a.x + ",": "0px,") + (a.y ? a.y : "0px") + ")",
            setTimeout(fn, 500 * parseFloat(a.duration))
    },
    goTop: function (acceleration, time) {
        acceleration = acceleration || 0.1;
        time = time || 16;
        var y1 = 0,y2 = 0,y3 = 0;
        if (document.documentElement) {y1 = document.documentElement.scrollTop || 0;}
        if (document.body) {y2 = document.body.scrollTop || 0;}
        y3 = window.scrollY || 0;
        var y = Math.max(y1, Math.max(y2, y3));
        // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
        var speed = 1 + acceleration;
        window.scrollTo(0, Math.floor(y / speed));
        // 如果距离不为零, 继续调用迭代本函数
        if(y > 0) {
            var invokeFunction = "this.goTop(" + acceleration + ", " + time + ")";
            window.setTimeout(invokeFunction, time);
        }
    }
	},
	pop_show: function(){//显示弹层
		var popwrap = $('#popCate'),
				glide = $(".wrap"),
				applyMain = $('#J_pop');
		var scrolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		popwrap.show();
		setTimeout(function() {
			glide.each(function(i, ele) {
				_method.overlay.translation(ele, {
					x: '100%'
				}, function() {});
			});
			_method.overlay.translation(applyMain[0], {
				x: '0px'
			}, function() {
				$('body').height(applyMain.height());
				setTimeout(function() {
					_method.overlay.goTop();
				}, 300);
			});
		}, 1);
		$("body, html").css({
			"overflow": "hidden"
		});
	},
	pop_hide: function(){
		var popwrap = $('#popCate'),
				glide = $(".wrap"),
				applyMain = $('#J_pop');
		glide.show();
		setTimeout(function() {
			glide.each(function(i, ele) {
				_method.overlay.translation(ele, {
					x: '0px'
				}, function() {
					$(ele).attr("style", "");
					$("body, html").attr("style", "");
				});
			});
			_method.overlay.translation(applyMain[0], {
				x: '-100%'
			}, function() {
				popwrap.attr("style", "");
				applyMain.attr("style", "");
				//              window.scrollTo(0, scrolltop)
			});
		}, 1);
	},
	deepCopy: function(source) { 
		var result={};
		for (var key in source) {
		      result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
		} 
	  return result; 
	},
	queryString: function(res) {
		if(!res && res.constructor === Object) return;
		var _queryString = "?";
		for(var x in res){
			_queryString += x+"="+res[x]+"&";
		}
		return _queryString.substring(0,_queryString.length-1);
	},
	LS: {
		_set: function(key,val){
			if(!key || !val){
				console.log("缺少参数：val\key");
				return;
			}
			var newVal = JSON.stringify(val);
			window.localStorage.setItem(key, newVal);
		},
		_get: function(key){
			if(!key){
				console.log("缺少参数：key");
				return;
			}
			var _val = window.localStorage.getItem(key);
			return JSON.parse(_val);
		},
		_remove: function(key){
			if(!key){
				console.log("缺少参数：key");
				return;
			}
			window.localStorage.removeItem(key);
		},
		_clear: function(){
			console.log("remove all localStorage");
			window.localStorage.clear();
		}
	},
	SS: {
		_set: function(key,val){
			if(!key || !val){
				console.log("缺少参数：val\key");
				return;
			}
			var newVal = JSON.stringify(val);
			window.sessionStorage.setItem(key, newVal);
		},
		_get: function(key){
			if(!key){
				console.log("缺少参数：key");
				return;
			}
			var _val = window.sessionStorage.getItem(key);
			return JSON.parse(_val);
		},
		_remove: function(key){
			if(!key){
				console.log("缺少参数：key");
				return;
			}
			window.sessionStorage.removeItem(key);
		},
		_clear: function(){
			console.log("remove all sessionStorage");
			window.sessionStorage.clear();
		}
	},
	toQueryParams: function(){ 
		var search = this.replace(/^\s+/,'').replace(/\s+$/,'').match(/([^?#]*)(#.*)?$/);//提取location.search中'?'后面的部分 
		if(!search) return {};  
		var searchStr = search[1]; 
		var searchHash = searchStr.split('&'); 
		var ret = {}; 
		for(var i = 0, len = searchHash.length; i < len; i++){ //这里可以调用each方法 
			var pair = searchHash[i]; 
			if((pair = pair.split('='))[0]){ 
				var key = decodeURIComponent(pair.shift()); 
				var value = pair.length > 1 ? pair.join('=') : pair[0]; 
				if(value != undefined){ 
					value = decodeURIComponent(value); 
				} 
				if(key in ret){ 
					if(ret[key].constructor != Array){ 
						ret[key] = [ret[key]]; 
					} 
					ret[key].push(value); 
				}else{ 
					ret[key] = value; 
				} 
			} 
		} 
		return ret; 
	},
	objSort: function(arr,obj){
		if(!arr || !obj){
				console.log("缺少参数：arr\obj");
				return;
		}
		var _newObj = {};
		for(var x in obj){
			if(this.containsSort(arr,x)){
				_newObj[x] = obj[x];
			}
		}
		return _newObj;
	},
	containsSort: function(arr,str){  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] == str) {  
            return true;  
        }  
    }  
    return false;  
	},
	isBYK: function(arr,boo){
		var _obj = {};
		var _arr = [];
		for(var i=0 ; i< arr.length; i++){
			if(arr[i].constructor == Array){
				if(boo){
					_arr[i] = arr[i][0];
				}else{
					_arr[i] = arr[i][1];
				}
			}else{
				_arr[i] = arr[i];
			}
		}
		_obj.menu = _arr;
		return _obj;
	},
	_double: function(e,month){
		if(month){
			e += 1;
			if(e<10){
				return "0"+ e.toString();
			}else{
				return e.toString();
			}
		}else{
			if(e<10){
				return "0"+ e.toString();
			}else{
				return e.toString();
			}
		}
	},
	_newDate: function(n){
		var _date = new Date();
		var _yy = _date.getFullYear();
		var _mm = _date.getMonth();
		var _dd = _date.getDate();
		if(!n){
			return _yy + "-" + this._double(_mm,true) + "-" + this._double(_dd);
		}else{
			// 根据传入参数返回+n个月后的Date
			_date.setMonth(_mm+n);
			_mm = _date.getMonth();
			return _yy + "-" + this._double(_mm,true) + "-" + this._double(_dd);
		}
	},
	_getAge: function(n,type){
		//type = "m" 返回多少个月
		//type = "y" 返回多少年
		if(!n || !type){
			console.log("缺少参数：n、type");
			return null;
		}
		var _n = n.replace(/-/g, "/");
		var _now = new Date();
		var _birthday = new Date(_n);
		var _dv;
		_dv = _now.getTime() - _birthday.getTime();
		switch(type)
		{
			case "m":
			return Math.floor(_dv/(24*3600*1000*30));
			case "y":
			return Math.floor(_dv/(24*3600*1000*30*12));
		}
	},
	_formatDate: function(){
		var _date = this;
		_date = _date.split(/\s+/g);
		return _date[0];
	},
	_formatDateToMonth: function(){
		var _date = _method._formatDate.call(this);
		var _arrDate = _date.split(/\-/g);
		_arrDate.pop();
		return _arrDate.join("-");
	},
	_wxScan: function (userId,userSign,cityId,category) {
    // 调微信扫一扫
    wx.ready(function () {
      wx.scanQRCode({
          needResult: 1,
          success: function (res) {
            var redirect_url = res.resultStr;
            if(userId && userSign && cityId && category){
            	switch(category)
	              {
	              	case "1":
	              	// 包月卡
	              		redirect_url += "&userId=" + userId + "&userSign=" + userSign + "&cityId=" + cityId + "&openId=" + _localParam.openId;
	              		break;
	              	case "2":
					default:
	              	// 储值卡
	              		redirect_url += "&userId=" + userId + "&userSign=" + userSign + "&cityId=" + cityId + "&redirect=card" + "&openId=" + _localParam.openId;
	              		break;
	              }
	              window.location.href = redirect_url;
            }else{
            	var _param = {
									_url: "http://www.imiaoxiu.com/babypass-server/shop_center/appointList",
									_type: "GET",
									_data: {
										"userId": _localParam.userId,
										"sign": _localParam.sign,
									},
									_callback:{
										success: function(res){
											var list = res.data;
											_method.SS._set("appointList", res.data);
				              // 只有一条预约记录
			              	if(list.length == 1){
			              		switch(list[0].category)
					              {
					              	case 1:
					              	// 包月卡
					              		redirect_url += "&userId=" + list[0].userId  + "&userSign=" + list[0].privateKey + "&cityId=" + _localParam.cityId  + "&openId=" + _localParam.openId;
					              		break;
					              	case 2:
					              	default:
					              	// 储值卡
					              		redirect_url += "&userId=" + list[0].userId  + "&userSign=" + list[0].privateKey + "&cityId=" + _localParam.cityId + "&redirect=card" + "&openId=" + _localParam.openId;
					              		break;
					              }
			              		$.get("http://www.imiaoxiu.com/babypass-server/shop_center/calendarScheduleCzk",{ userId: _localParam.userId, flag: 1, sign: _localParam.sign },
				              		function(_res){
				              			var _arr = _res.data.appointments;
				              			for(var i = 0; i< _arr.length; i++){
				              				if(list[0].id == _arr[i].id){
				              					_method.SS._set("tempOrderData", _arr[i]);
				              				}
				              				window.location.href = redirect_url;
				              			}
			              		});
			                }else if(list.length > 1){
			                	// 多条预约记录
			                	var _url = encodeURIComponent(redirect_url)
			                  window.location.href = "daka.html?url="+_url;
			                }
										},
										failed: function(XMLHttpRequest, textStatus, errorThrown){
												layer.open({
													style: "width:100%;max-width:240px;font-size:16px;text-align:center;padding:1rem 0 0;",
												    content: "<p>你今天没有预约哦！</p>",
												    btn: ["返回"],
												    shadeClose: true,
												    time: 2
												});
										}
									}
							}
							_method.getData(_param._url, _param._callback, _param._type, _param._data);           
            }    
          }
      });
    });
  },
  _hasMemShip: {
		_url: "http://www.imiaoxiu.com/babypass-server/cardUser/userStatus",
		_type: "POST",
		_data: {},
		_callback: {
			success: function(res,start){
				// 把res所有参数赋值到_localParam
				_localParam = res.data;
				_method._hasMemShip._data.userId != 0?_localParam.userId=_method._hasMemShip._data.userId:null;
				_method._hasMemShip._data.sign != 0?_localParam.sign=_method._hasMemShip._data.sign:null;
				_method._hasMemShip._data.openId != 0?_localParam.openId=_method._hasMemShip._data.openId:null;
				// 更新sessionStorage
				_method.SS._set("queryParams",_localParam);
				start?start():null;
			},
			failed: function(XMLHttpRequest, textStatus, errorThrown){
//			console.log(XMLHttpRequest, textStatus, errorThrown);
			}
		},
		_query: function(start){
			_method.getData(this._url,this._callback,this._type,this._data,start);
		}
	},
	timer: {
		_timer: function(start,callback){
				if(!start){
					console.log("缺少参数：start");
					return null;
				}
				var ts = new Date(start) - new Date();//计算剩余的毫秒数
				if(ts > 0){
					var hh = parseInt(ts / 1000 / 60 / 60);//计算剩余的小时数
					var mm = parseInt(ts / 1000 / 60 % 60);//计算剩余的分钟数
					var ss = parseInt(ts / 1000 % 60);//计算剩余的秒数
					$("#timerHH").text(this._checkTime(hh));
					$("#timerMM").text(this._checkTime(mm));
					$("#timerSS").text(this._checkTime(ss));
				}else{
					// 到点了
					window.clearInterval(_setInterval);
					console.log("clearInterval success");
					callback();
				}
				
		},
		_checkTime: function checkTime(i){  
      if (i < 10) {  
        i = "0" + i;  
      }  
      return i;  
    },
    _start: function(start,callback){
    	var _start = start.replace(/-/g, "/");
    	_setInterval = setInterval(function() {
				_method.timer._timer(_start,callback);
			}, 0);
    }

	}
};

(function($){
    /*日历插件*/
    $.fn.datepicker = function(options){
        var defaults = {
                id:'',//日历ID
                insertPosition:'',//插入指定位置
                showBtn:true,//是否显示功能按钮
                isShow:false,//是否显示日历
                showVal:true,//是否显示默认值
                count:1,//日历个数
                year:'',//指定年份
                month:'',//指定月份
                onComplete:'',//点击日历后的回调函数
                tInput:false,//是否是文本框
                dateFormat:'-,-,-,-',//输出格式,默认格式是2013-11-12 星期二
				showFormat:'-,-',//点击选择日期后文本框内的显示内容
                minDate:'',//设定最小日期格式如2013-11-01；当数字前面补0
                maxDate:'',//设定最大日期
                orderDate:false,//酒店预订时间，从今日开始算起，如输入1-10,表示1个月连10天
                orders:null,//已经预订的时间段
                selChangeable:false,//年月份是否是select下拉
                weekendColor:false,//周末字体改变颜色
                data:false,//设置初始日期为文本内容
                price:'',//设定价格
				sPrice:false,
				hotelprice:'',
                prohibit:'',//禁止日期
                openweek:''//周日-周一代表 0,1,2,3,4,5,6
            },target = $(this),
			solarholidy={
				'01-01':"元旦",
				'05-01':"五一",
				'10-01':"国庆",
				'12-25':"圣诞"
			},
			lunarholidy={
				'除夕':['2014-01-30','2015-02-18','2016-02-07','2017-01-27'],
				'春节':['2014-01-31','2015-02-19','2016-02-08','2017-01-28'],
				'元宵':['2014-02-14','2015-03-05','2016-02-22','2017-02-11'],
				'清明':['2014-04-05','2015-04-05','2016-04-04','2017-04-04'],
				'端午':['2014-06-02','2015-06-20','2016-06-09','2017-05-30'],
				'七夕':['2014-08-02','2015-08-20','2016-08-09','2017-08-28'],
				'中秋':['2014-09-08','2015-09-27','2016-09-15','2017-10-04']
				}
            datepicker = {
                init:function(){
                    var that=this;
                    var config = $.extend({},defaults,options);
                    that.aCal = [];//日历对象列表
                    that.insertPosition =config.insertPosition || 'body';//插入指定位置
                    that.id = config.id || "calendar_" + (+new Date());//日历id
                    that.container = document.createElement("div");//日历内容容器
                    that.container.id = this.id;
                    that.bShowBtn = config.showBtn;//是否显示功能(左右按钮)按钮
                    that.orders = config.orders;//已经预订的时间段
                    that.count = config.count || 1;//日历个数
                    that.onComplete = config.onComplete || function() {};//日历创建完毕回调函数
                    that.date = new Date().getDate();//今天
                    that.today = new Date().getFullYear() + "-" + that.format(new Date().getMonth() + 1) + "-" + that.format(that.date);
                    that.setBtn(this.bShowBtn);//配置功能按钮
                    that.addEvent();//添加事件
                    that.tInput = config.tInput;//是否是文本框
                    that.dateFormat = config.dateFormat;//显示格式，默认是y-m-d w
                    that.minDate = config.minDate;//输入最大最小日期格式如2013-11-01
                    that.maxDate = config.maxDate;
                    if(config.price.indexOf('.')>-1){
                        that.price = config.price.substring(0,config.price.indexOf('.'));//价格
                    }else{
                        that.price = config.price
                    }
                    that.prohibit = config.prohibit.split(',');//价格

                    if(config.openweek.indexOf(',')>-1){
                        that.openweek = config.openweek.split(',');//价格
                    }else{
                        that.openweek = config.openweek;
                    }
                    that.orderDate = config.orderDate;//酒店预订天数，从今日开始算格式“月-天数”
                    that._selChage = config.selChangeable;//下拉菜单
                    that.weekendColor = config.weekendColor;
					that.hotelprice = config.hotelprice;
					that.sPrice = config.sPrice;
                    that.data = config.data;
                    that.isShow = config.isShow;
                    var data = null;//设置初始日期文本内容
                    (that.dateFormat=='-,-,-,-')?(data = that.data||(that.today+' '+that.getWeek(that.today))):data = that.data||that.today;
                    config.showVal?(that.tInput?target.val(data):target.text(data)):'';
                    if(that.minDate){
                        that.Year = parseInt(that.minDate.split('-')[0],10);
                        that.Month = parseInt(that.minDate.split('-')[1],10);
                    }else{
                        that.Year = config.year || new Date().getFullYear();//指定年份
                        that.Month = config.month || new Date().getMonth() + 1;//指定月份
                    }
                    that.create();//创建日历

                },

                //创建日历算法
                _Draw: function(iYear, iMonth){
                    var that=this,sp = that.dateFormat.split(',')[0],
                        oContainer = document.createElement("div"),
                        oDl = document.createElement("dl"),
                        oDd = document.createElement("dd"),
                        oFrag = document.createDocumentFragment(),
                    //计算当月第一天是星期几
                        firstDay = new Date(iYear, iMonth - 1, 1).getDay(),
                    //计算当月有多少天
                        lastDay = new Date(iYear, iMonth, 0).getDate(),
                    //后面补空个数 = 总天数-（前面占空位置+当月天数）
                        sDay = Math.ceil((firstDay+lastDay)/7)*7 - (firstDay+lastDay),
                    //日历头
                        aTmp = [
                            "<dt>周日</dt>",
                            "<dt>周一</dt>",
                            "<dt>周二</dt>",
                            "<dt>周三</dt>",
                            "<dt>周四</dt>",
                            "<dt>周五</dt>",
                            "<dt>周六</dt>"
                        ],
                        arr = [],cur, oA, i, len, sValue, classIndex;
                    for(i = 1; i <= firstDay; i++) arr.push(0);
                    for(i = 1; i <= lastDay; i++) arr.push(i);
                    for(i = 1; i <= sDay; i++) arr.push(0);
                    while(arr.length)
                    {
                        for(i = 1, len = arr.length; i <= len; i++)
                        {
                            if(arr.length)
                            {
                                oA = document.createElement("a");
                                $(oA).attr({'wid': i-1});
                                sValue = arr.shift();//获取数组的第一个值
                                if(that.openweek){//格式为0-6，分别代表周日到周六
                                    $(oA).addClass('disabled');
                                    for(var o = 0;o<that.openweek.length;o++){
                                        if((i==1||i==8||i==15||i==22||i==29||i==36)&&(that.openweek[o]==0)){$(oA).removeClass('disabled');}//周日
                                        if(i % 7==0&&(that.openweek[o]==6)){$(oA).removeClass('disabled');}//周六
                                        if((i==2||i==9||i==16||i==23||i==30||i==37)&&(that.openweek[o]==1)){$(oA).removeClass('disabled');}//周一
                                        if((i==3||i==10||i==17||i==24||i==31||i==38)&&(that.openweek[o]==2)){$(oA).removeClass('disabled');}//周2
                                        if((i==4||i==11||i==18||i==25||i==32||i==39)&&(that.openweek[o]==3)){$(oA).removeClass('disabled');}//周3
                                        if((i==5||i==12||i==19||i==26||i==33||i==40)&&(that.openweek[o]==4)){$(oA).removeClass('disabled');}//周4
                                        if((i==6||i==13||i==20||i==27||i==34||i==41)&&(that.openweek[o]==5)){$(oA).removeClass('disabled');}//周5
                                    }
                                }
                                if(!sValue)//获取到是0则置空
                                {
                                    oA.innerHTML = " ";
                                    $(oA).addClass('disabled');
                                }
                                else{
                                    oA["data-date"] = iYear + sp + this.format(iMonth) + sp + that.format(sValue);
                                    oA["data-week"] = that.getWeek(oA["data-date"]);
                                    oA.href = "javascript:void(0);";
                                    $(oA).attr({'date': oA["data-date"]});//给日期加上date属性									
                                    if(that.prohibit!=''){
                                        for(var j=0,l=that.prohibit.length;j<l;j++){
                                            if(oA["data-date"]==that.prohibit[j]){$(oA).addClass('disabled');}
                                        }
                                    }
                                    oA.innerHTML = '<em class="calendar_date">'+sValue+'</em>';
                                    that.minDate?(parseInt(oA["data-date"].replace(/-/g, "")) < parseInt(that.minDate.replace(/-/g, "")) && (oA.className = "disabled")):'';
                                    that.maxDate?(parseInt(oA["data-date"].replace(/-/g, "")) > parseInt(that.maxDate.replace(/-/g, "")) && (oA.className = "disabled")):'';
                                    if(that.orderDate){
                                        parseInt(oA["data-date"].replace(/-/g, "")) < parseInt(that.today.replace(/-/g, "")) && (oA.className = "disabled");//屏蔽今天以前的日期选择
                                        var tsplit = that.today.split('-');
                                        var osplit = that.orderDate.split('-');
                                        var orderd = tsplit[0]+''+that.format(parseInt(osplit[0])+parseInt(tsplit[1]))+''+that.format(that.date+parseInt(osplit[1])-1);
                                        parseInt(oA["data-date"].replace(/-/g, "")) > parseInt(orderd) && (oA.className = "disabled");
                                    }
                                    if(new RegExp(oA["data-date"]).test(that.today)){
                                    	$(oA).addClass('selected').find(".calendar_date").text("今天");
                                    }
                                    //周六日加色处理
                                    if(that.weekendColor){
                                        if(!$(oA).hasClass('disabled')){
                                            if(i % 7==0){$(oA).addClass('sat_weekend');}
                                            if(i==1||i==8||i==15||i==22||i==29||i==36){$(oA).addClass('sun_weekend');}
                                        }
                                    }
								
									//阳历节假日开始
									var solar=oA["data-date"].substring(5,10);
									for(var v in solarholidy){		
										solar==v?$(oA).find('.calendar_date').hide():'';								
										solar==v?$('<em class="calendar_date">'+solarholidy[v]+'</em>').appendTo($(oA)):'';
										}
									//阳历节假日结束
									//阴历节假日开始
									var lunar=oA["data-date"];
									for(var v in lunarholidy){
										for(var j=0;j<lunarholidy[v].length;j++){
											lunar==lunarholidy[v][j]?$(oA).find('.calendar_date').hide():'';
											lunar==lunarholidy[v][j]?$('<em class="calendar_date">'+v+'</em>').appendTo($(oA)):'';
											}
										}
									
									//阴历节假日结束
									//酒店价格显示
								if(that.hotelprice){
									var hotel_price=that.hotelprice.split(',');
									var hotel_price_len=hotel_price.length;
										for(var j=0;j<hotel_price_len;j++){
											var h_hotel=hotel_price[j].split(':');
											var oB=h_hotel[0];
											var oP=h_hotel[1];
											var oM=h_hotel[2];
											if(oM=='register'){
												if(oB==oA["data-date"]){
													$(oA).addClass('calendar_register');
													$('<em class="calendar_price calendar_price1">登记</em><br/><input type="hidden" value="'+oP+'" />').appendTo($(oA))
												}
											}else{
												if(parseInt(oP)>=0){//显示价格
													if(oP.indexOf('.')>-1){
														float=parseInt(oP.substring(oP.indexOf('.')+1));
														if(float>0){oP = "&yen;"+oP}
														else{oP ='&yen;'+oP.substring(0,oP.indexOf('.'));}//价格
													}else{
														oP ='&yen;'+oP
													}
												}
												else{//显示有房状态
													oP =oP
												}
												if(oB==oA["data-date"]){
													$('<em class="calendar_price calendar_price1">'+oP+'</em><br/>').appendTo($(oA))
													}
											}
										}
											
										
									}
                                    //订单时间处理
//                                  if(that.orders!=null)that.isHaveOrder(oA);
//                                  if(!$(oA).hasClass('disabled')&&that.price){$(oA).append('<em class="calendar_price calendar_price1">&yen;'+that.price+'</em>');}

                                }
                            }
                            oFrag.appendChild(oA)
                        }
                    }
                    //插入相关元素
                    oDd.appendChild(oFrag);
                    oDl.innerHTML = aTmp.join("");
                    oDl.appendChild(oDd);
                    oContainer.className = "calendar_container";
                    
                    if(target.attr('name')=='sdate'){
                    	$('.bz_tit_hhh').html('选择入住时间');
                    }
					else if(target.attr('name')=='play_time'){
						$('.bz_tit_hhh').html('选择出行时间');
					}
					else if(target.attr('name')=='play_time_jd'){
						$('.bz_tit_hhh').html('选择游玩时间');
					}
					else{
                    	$('.bz_tit_hhh').html('选择离店时间');
                    }
                    
                    if (that._selChage) {//下拉菜单
                        var sel = '';
                        sel += '<select class="ui-calendar-year">';
                        for (i = Math.max(1970, iYear - 10), max = i + 20; i < max; i++) {
                            sel += '<option value="' + i + '" ' + (i == iYear ?
                                'selected="selected"' : '') + '>' + i + '年</option>';
                        }
                        sel += '</select> ';

                        sel += '<select class="ui-calendar-month">';
                        for (i = 1; i <= 12; i++) {
                            sel += '<option value="' + parseInt(i) + '" ' + (i == iMonth ?
                                'selected="selected"' : '') + '>' + parseInt(i) + '月</option>';
                        }
                        sel += '</select>';
                        $(oContainer).append("<div class=\"header\">"+ sel +"</div>");
                        $(oContainer).find('.header>.ui-calendar-year').on('change',function(){
                            that.draw(new Date($(this).val(), 0, 1));

                        });
                        $(oContainer).find('.header>.ui-calendar-month').on('change',function(){
                            //console.log($(this).val())
                            that.draw(new Date(iYear, parseInt($(this).val()-1), 1));
                        });
                    }else{
                        $(oContainer).append("<div class=\"header\">"+ iYear + "年" + iMonth +"月</div>");
                    }
                    oContainer.appendChild(oDl);
                    //记录日历队列
                    that.aCal.push(oContainer);
                    //返回生成好的日历
                    return oContainer
                },

                //创建日历
                create: function(){
                    var that=this,
                        year = that.Year,
                        month = that.Month,
                        i = 0;
                    that.container.className = "calendar"; //※指定日历控件className
                    //清空日历队列
                    while(that.aCal[0]) that.container.removeChild(that.aCal.shift());
                    //批量生成日历
                    for(i = 0; i < that.count; i++)
                    {
                        year += (month + (i ? 1 : 0)) > 12 ? 1 : 0;
                        month = (month + (i ? 1 : 0)) % 12 || 12;
                        that.container.appendChild(that._Draw(year, month));
//						if(!that.sPrice && $('.calendar_price1').length<=0){that.nextMonth();}
                    }
                    $(that.insertPosition).append(that.container);//将日历插入页面, 如果未指定插入位置则插入BODY
//                      console.log("$('.calendar_price1').length="+$('.calendar_price1').length);
//                      if(!that.sPrice && $('.calendar_price1').length<=0){that.nextMonth();}					
                    return this;
                },

                //按钮设置(显示/隐藏)
                setBtn:function(boolean){
                    var that=this;
                    var $obj = $(that.container);
                    $(that.oPrev).html('&lt;&lt;');
                    $(that.oNext).html('&gt;&gt;');
                    //如果按钮没有创建过并且设置为显示, 则创建按钮, 并添加已创建标记
                    if(!that.mark && boolean){
                        $obj.append('<span class="calendar_prev" title="上一月"></span>');
                        $obj.append('<span class="calendar_next" title="下一月"></span>');
                        //添加已创建标记
                        that.mark = true
                    }
                    //如果按钮已经创建过, 则设置其显示/隐藏
                    $('.calendar_prev,.calendar_next').css('display',boolean ? "block" : "none");
                },

                //添加事件
                addEvent:function(){
                    var that = this,
                        obj = that.container,
                        handler = null;
                    handler = function(e){
                        e = e || event
                        var oTarget = e.target || e.srcElement;
                        switch(oTarget.className)
                        {
                            case "calendar_prev":
                                that.prevMonth();
                                break;
                            case "calendar_next":
                                that.nextMonth();
                                break;
                        }
                         if(oTarget.tagName.toUpperCase() === "A" && !$(oTarget).hasClass('disabled')){
                         	if(!$(oTarget).hasClass('calendar_register')){
                            	that.onSelectDay(oTarget);
                        	}else{
                        		that.onRegisterDay(oTarget);
                        	}
                        }
                        if((oTarget.tagName.toUpperCase() === "SPAN" && oTarget.parentNode.tagName.toUpperCase() === "A") ||(oTarget.tagName.toUpperCase() === "EM" && oTarget.parentNode.tagName.toUpperCase() === "A") && !$(oTarget.parentNode).hasClass('disabled')){
                            if($(oTarget.parentNode).hasClass('calendar_register')){
                        		that.onRegisterDay(oTarget);
                        	}
                        	else{
                            	that.onSelectDay(oTarget.parentNode);
                        	}
                        }
                    }
                    //为日历控件添加CLICK事件监听
                    $(obj).on('click',handler);
                },

                //格式化数字, 不足两位补0
                format:function(str){
                    return str.toString().replace(/^(\d)$/, "0$1");
                },

                //获取指定日期是星期几 @param date string yyyy-mm-dd
                getWeek:function(date){
                    var aWeek = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
                        arr = date.split(/-/g);
                    return "\u661f\u671f" + aWeek[new Date(arr[0], arr[1] - 1, arr[2]).getDay()]
                },

                //计算是否有订房
//              isHaveOrder:function(obj){
//                  var that=this;
//                  if(new RegExp(obj["data-date"]).test(that.orders.join())){
//                      obj.className ="order";
//                      obj["data-week"] ="已预订";
//                      obj["data-order"] ="1";
//                      obj.innerHTML = "<span>"+ obj.innerHTML +"</span>";
//                  }
//              },

                //根据日期创建日历
                draw:function(date){
                    var that=this;
                    that.Year = date.getFullYear();
                    that.Month = date.getMonth() + 1;
                    that.create()
                },

                //当前月
                nowMonth:function(){
                    var that=this;
                    that.draw(new Date());
                },

                //下月
                nextMonth:function(){
                    var that=this;
                    that.draw(new Date(that.Year, that.Month + (that.count - 1), 1));
                },

                //上月
                prevMonth: function(){
                    var that=this;
                    that.draw(new Date(that.Year, that.Month - (that.count + 1), 1));
                },

                //显示日历
                show: function(){
                    var that = this;
                    if(!that.isShow){
                        var offset=target.offset(),//日历自动位置
                            box_h = $(that.container).height()+20,
                            tar_top = offset.top+target.height()+parseInt(target.css('padding-bottom'))+parseInt(target.css('padding-top')),
                            tar_left = offset.left,
                            scrtop = parseInt($(window).scrollTop());
                        if(parseInt(tar_top - scrtop)<610){
                            $(that.container).css({position:'absolute',top:tar_top,left:tar_left});
                        }else{
                            $(that.container).css({position:'absolute',top:(offset.top-box_h)+'px',left:tar_left+'px'});
                        }
                        $(that.container).show();
                    }else{
//                      $(that.container).css({position:'absolute',display:'inline-block'});
                    }
					var pricelen=function(){
					if(options.sPrice && $('.calendar_price1').length<=0){
					datepicker.nextMonth();
					pricelen();
						}
					}
					pricelen();

                },

                //隐藏日历
                hide: function(){
                    $(this.container).hide();
                },
                onRegisterDay:function(obj){
                	var d = this,
                        val = null;
                    if(d.dateFormat.split(',').length==3){
                        val = obj['data-date'];
                    }else{
                        val = obj['data-date']+' '+obj['data-week'];
                    }
                    d.tInput?target.val(val):target.text(val);
                    $(obj).addClass('act').siblings().removeClass('act');
                    d.onComplete(obj);//点击日后callback函数
                },
               onSelectDay:function(obj){
                    var d = this,
                        val = null;
                    if(d.dateFormat.split(',').length==3){
                        val = obj['data-date'];
                    }else{
                        val = obj['data-date']+' '+obj['data-week'];
                    }
                    d.tInput?target.val(val):target.text(val);
                    d.isShow?'':$(d.container).hide('fast');
                    $(obj).addClass('act').siblings().removeClass('act');
                    d.onComplete(obj);//点击日后callback函数
                }

            };
        datepicker.init();
        if(datepicker.isShow){
            datepicker.show();
        }else{
            $(datepicker.container).click(function(e){//去除表格点击的事件
                e.preventDefault();
                e.stopPropagation();
            });
            $(document).click(function(e){//点击calendar外隐藏该aclendar
                if(e.target != $(target)[0]){datepicker.hide();}
            });
            target.click(function(){
            	var pricelen=function(){
		   		if(options.sPrice && $('.calendar_price1').length<=0){
				datepicker.nextMonth();
				pricelen();
					}
				}
            	pricelen();
                datepicker.show();
            });
        }
    };
})(jQuery);
function transdate(endTime){
	var date=new Date(endTime);
//	date.setFullYear(endTime.substring(0,4));
//	date.setMonth(endTime.substring(5,7)-1);
//	date.setDate(endTime.substring(8,10));
//	date.setHours(endTime.substring(11,13));
//	date.setMinutes(endTime.substring(14,16));
//	date.setSeconds(endTime.substring(17,19));
	return Date.parse(date)/1000-28800;
	}
function formatDate(now) { 
	var year=now.getFullYear(); 
	var month=now.getMonth()+1; 
	var date=now.getDate(); 
	var hour=now.getHours(); 
	var minute=now.getMinutes(); 
	var second=now.getSeconds()-1;
//	year = year.toString();
//	alert(year);
	if(month<10){
		month = '0'+month;
	}
	if(parseInt(date)<10){
		date = '0'+date;
	}
	return month+"-"+date; 
	}
/**year.substring(2,4)+"-"++"-"+date"+hour+":"+minute+":"+second*/
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title>全城遛娃</title>
    <link rel="stylesheet" type="text/css" href="../css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../css/common.css"/>
    <link rel="stylesheet" type="text/css" href="../css/index_2.css"/>
    <link rel="stylesheet" type="text/css" href="../css/index_3.css"/>
    <link rel="stylesheet" type="text/css" href="../css/searchBar.css"/>
</head>
<body>
<!-- searchBar -->
<div id="searchWrap">
        <div class="searchBar">
                <div class="col-1">
                        <input type="text" name="searchOutter" id="searchOutter" value="" placeholder="输入商家、分类、名称" />
                </div>
                <div class="col-2">
					<a href="#" class="scan" id="wxScan"></a>
                        <!--<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http%3a%2f%2f${domain}%2fbabypass-server%2fuser%2fmy%3fcityId%3d1&response_type=code&scope=snsapi_base&state=123#wechat_redirect">我的</a>-->
                </div>
        </div>

        <div class="searchBlock" id="searchBlock">
                <div class="searchBarGray">
                        <div class="col-1">
                                <form action="../shop/listshop" method="get" id="search">
                                
                                        <input type="hidden" name="cityId" value="${cityId}" />
                                        <input type="hidden" name="categoryIds" value="" />
                                        <input type="hidden" name="distance" value="5" />
                                        <input type="hidden" name="level" value="1,2" />
                                        <input type="hidden" name="lat" value="${(lat)!0}" />
                                        <input type="hidden" name="lng" value="${(lng)!0}" />
                                                               
                                        <input type="text" name="keyword" id="keyword" value="" placeholder="输入商家、分类、名称" />
                                        <input type="submit" value="搜索" id="submitBtn"/>
                                </form>
                        </div>
                        <div class="col-2">
                                <a href="" class="cancel-btn" id="cancelBtn">取消</a>
                        </div>
                </div>
        </div>
        
</div>
<!--new add html -->
<div class="slide" id="indexSlide">
    <ul></ul>
</div>
<!-- end -->

<ul class="type-of-lesson section-border" id="lessonType"></ul>

<!--<div class="ad-wrapper section-border" id="indexBanner">
    <div class="index-banner">
        <h1></h1>

        <p></p>

        <div class="shop-list" id="shop-name-list"></div>
    </div>
    <!--<div class="tab-cells">
        <div class="cells-item icon-dapai">
            <h1>大牌抢购</h1>
            <p>全场1元起拍</p>
        </div>
        <div class="cells-item icon-baogao">
            <h1>体验报告</h1>
            <p>写报告奖礼品</p>
        </div>
    </div>
</div>-->
<div class="tab-cells" id="custom">
	<div class="cells-item">
		<!--自定义模块-->
		<a href=""><img src="../img/pic-qc.png"></a>
	</div>
	<div class="cells-item">
		<!--附近top10模块-->
		<a href=""><img src="../img/pic-near.png"></a>
	</div>
</div>

<script id="chosen-template" type="text/x-handlebars-template">
		{{#showChosen this}}
		<div class="section-chosen section-border">
			<h1>{{title}}<i>{{slogan}}</i></h1>
			<ul class="tab-3-cells">
				{{#items}}
				<li>
					<a href="{{link}}">
						<img src="{{img}}">
						<i>{{title}}</i>
					</a>
				</li>
				{{/items}}
			</ul>
		</div>
		{{/showChosen}}
</script>

<div class="list-wrapper" id="shop-list">
    <h1 class="list-title icon-cnxh">猜你喜欢</h1>
    <!--<h1 class="list-title icon-location-loading">正在定位...</h1>-->

    <div class="loading" id="loading">
        <span class="icon-loading"></span>
        <span class="text">加载中...</span>
    </div>
</div>


<div class="btm">
	<p class="location-reload" id="reLocation">点击刷新定位</p>
			<ul class="menu">
				<li class="current">
					<a href="#" class="index">首页</a>
				</li>
				<li>
					<a href="#" class="near">附近</a>
				</li>
				<li>
					<a href="#" class="orders">订单</a>
				</li>
				<li>
					<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http%3a%2f%2f${domain}%2fbabypass-server%2fuser%2fmy%3fcityId%3d1&response_type=code&scope=snsapi_base&state=123#wechat_redirect" class="my">我</a>
				</li>
			</ul>
</div>


<!-- landing Page temp -->
		<script id="slide-temp" type="text/x-handlebars-template">
			<div class="gray-p-wrap" id="landingPage">
				<input type="image" name="close" id="closeLandingPage" value="close" class="closeLandingPage" />
				<div class="landingPageSlide" id="landingPageSlide">
				    <ul>
				    {{#each slide}}	
				    	{{#item @index}}
				    		<li><img src="{{img}}" alt="{{alt}}"></li>
				    		{{else}}
				    		<li><img src="{{img}}" alt="{{alt}}"><a href="#" class="btmButton" id="goTo">去遛娃</a></li>
				    	{{/item}}
				    {{/each}}
				    </ul>
				    {{dot slide}}
				</div>
			</div>
		</script>
		
<!-- end -->


<script src="//cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
<script src="//cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js"></script>
<script src="//cdn.bootcss.com/handlebars.js/4.0.5/handlebars.min.js"></script>
<script src="//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
<!--<script src="../js/jquery-1.11.3.min.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/handlebars-v3.0.3.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/fastclick.js" type="text/javascript" charset="utf-8"></script>-->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="../js/UA.js" type="text/javascript" charset="utf-8"></script>
<#--<script src="../js/top-notice.js" type="text/javascript" charset="utf-8"></script>-->
<!--new Import js -->
<script src="../js/swipeSlide.min.js"></script>
<script id="slide-template" type="text/x-handlebars-template">
    {{#each this}}
    <li>
        <a href="javascript:void(0);"  data-index={{index}}>
            <img src="{{img}}" alt="">
        </a>
    </li>
    {{/each}}
</script>
<!-- end -->

<script id="lesson-type-template" type="text/x-handlebars-template">
    {{#type}}
    <li class="type-{{categoryId}} lesson-type" data-url="{{url}}">
        
        <span class="icon"></span>
        <i class="name"></i>
    </li>
    {{/type}}
</script>
<script id="shop-list-template" type="text/x-handlebars-template">
    {{#shops}}
    <a href="#" class="pic-link" data-id="{{id}}" data-name="{{name}}">
        <div class="top">
            <h6 class="item-title">{{name}}{{branchName}}</h6>
             {{#showDistance ../gotLocation}}
                    <span class="item-distance">{{distance}}km</span>
                    {{else}}
            {{/showDistance}}
        </div>
        <div class="shop-pic">
            <img src="" data-original="{{image}}"/>
            {{#showIcon level}}
            <span class="vip-icon"></span>
            {{else}}
            {{/showIcon}}
        </div>
        <p class="comment">{{comment}}</p>

        <p class="condition">适合年龄：{{ageRange}}</p>
    </a>
    {{/shops}}
</script>
<!--<script id="shop-list-template2" type="text/x-handlebars-template">
    {{#shops}}
    <a href="#" class="pic-link" data-id="{{id}}" data-name="{{name}}">
        <div class="top">
            <h6 class="item-title">{{name}}{{branchName}}</h6>
            <span class="item-distance"></span>
        </div>
        <div class="shop-pic">
            <img src="{{image}}"/>
            {{#showIcon level}}
            <span class="vip-icon"></span>
            {{else}}
            {{/showIcon}}
        </div>
        <p class="comment">{{comment}}</p>

        <p class="condition">适合年龄：{{ageRange}}</p>
    </a>
    {{/shops}}
</script>-->
<script id="banner-template" type="text/x-handlebars-template">
    {{#shops}}
    <span>{{name}}</span>
    {{/shops}}
</script>
<script type="text/javascript">
    //var hasGotLocation = <#if (lat ==0 && lng==0)>false<#else>true</#if>;
    
    var _wxLat = ${lat};
    var _wxLng = ${lng};
    var ua = UA();
    wx.config({
                debug: true,
                appId: '${appId}',
                timestamp: '${timeStamp}',
                nonceStr: '${noncestr}',
                signature: '${sign}',
                jsApiList: [
                    'getLocation'
                ]
            });

    var getListLink = function (categoryId) {
        if (ua == 0 ||ua == 1) {
            return "listshop?cityId=${cityId}&categoryIds=" + categoryId + "&distance=5&date=&from=&to=&lat=" + _wxLat + "&lng=" + _wxLng + "&level=1,2";
        } else if (ua == 2 || ua == 4 || ua == 5) {
            return "objc://goShopList:/${cityId}/" + categoryId + "/${distance}/${date}/${from}/${to}/${lat}/${lng}/0/8//0";
        } else if (ua == 3) {
            return "${cityId}/" + categoryId + "/${distance}/${date}/${from}/${to}/${lat}/${lng}/0/8//0";
        }
    }
    var _data = {
                gotLocation: '${gotLocation}',
                shops: [
                <#list shops as shop>
                    <#if (shop_index!=0)>,</#if>
                    {
                        id: ${shop.id},
                        name: "${shop.name}",
                        branchName: "${shop.branchName}",
                        address: "${shop.address}",
                        image: "${shop.image}",
                        distance: "${shop.distance}",
                        comment: "${shop.comment}",
                        ageRange: "${shop.ageRange}",
                        level: ${shop.level}
                    }
                </#list>
                ],
                param: {
                    cityId: ${cityId},
                    categoryIds: "${categoryIds}",
                    distance: ${distance},
                    date: "${date}",
                    from: "${from}",
                    to: "${to}",
                    lat: ${lat},
                    lng: ${lng},
                    pageSize: 10,
                    currentId: null,          //shop-list  当前ID
                    currentUrl: null,         //lessonType 当前ID
                    postUrl: "query",
                    postUrlExactly: "queryExactly",  //精确匹配地址
                    postType: "POST",
                    initNo: 1,
                    actionLessonType: function () {        //lessonType 方法
//                                                              console.log(this.currentUrl);
                        if (ua == 3) {
                            var paras = this.currentUrl.split("/");
                            window.app.goShopList(paras[0], paras[1], paras[2], paras[3], paras[4], paras[5], paras[6], paras[7], paras[8], paras[9], paras[10], paras[11]);
                        } else {
                            window.location.href = this.currentUrl;
                        }
                    },
                    actionShopList: function () {          //shop-list  方法
//                console.log(this.currentId);
                        if (ua == 0 || ua == 1) {
                            window.location.href = this.currentId;
                        }
                        if (ua == 2 || ua == 4 || ua == 5) {
                            window.location.href = "objc://goShopDetail:/" + this.currentId + "/" + this.currentName;
                        }
                        if (ua == 3) {
                            window.app.goShopDetail(this.currentId, this.currentName);
                        }

                    },
                    actionBanner: function () {            //banner 跳转方法
                        var url = getListLink("1,2,3,4,5,6,7,8,9");
                        if (ua == 3) {
                            var paras = url.split("/");
                            window.app.goShopList(paras[0], paras[1], paras[2], paras[3], paras[4], paras[5], paras[6], paras[7], paras[8], paras[9], paras[10], paras[11]);
                        } else {
                            window.location.href = url;
                        }
                    }
                },
                type: [
                    {
                        categoryId: 1,
                        url: getListLink(1)
                    },
                    {
                        categoryId: 2,
                        url: getListLink(2)
                    }
                    ,
                    {
                        categoryId: 3,
                        url: getListLink(3)
                    }
                    ,
                    {
                        categoryId: 7,
                        url: getListLink(7)
                    }
                    ,
                    {
                        categoryId: 5,
                        url: getListLink(5)
                    }
                    ,
                    {
                        categoryId: 9,
                        url: getListLink(9)
                    }
                    ,
                    {
                        categoryId: 4,
                        url: getListLink(4)
                    }
                    ,
                    {
                        categoryId: 0,
                        url: getListLink("1,2,3,4,5,6,7,8,9")
                    }
                ],
                 noPopupView : true,
				 chosen: {
				          //本周精选
				          		"title": "本周精选",
				          		"slogan": "花都开好啦，全家一起去踏青吧！",
				          		"items": [
							          		{
							          			"link": "http://www.liuwa.cc",
							          			"img": "../img/temp.png",
							          			"title": "辰山植物园1"
							          		},
							          		{
							          			"link": "http://www.liuwa.cc",
							          			"img": "../img/temp.png",
							          			"title": "辰山植物园2"
							          		},
							          		{
							          			"link": "http://www.liuwa.cc",
							          			"img": "../img/temp.png",
							          			"title": "辰山植物园3"
							          		}
				          		]
				          }
            }
            ;
//    if (ua == 2 || ua == 4 || ua == 5) {
//        window.location.href = "objc://goProductList";
//    }
//    if (ua == 0 || ua == 3) {
//        window.app.goProductList();
//    }

    var lessonTypeClickEvent = function () {
        $("#lessonType").on("click", "li", function () {
            event.preventDefault();
            _data.param.currentUrl = $(this).attr("data-url");
            _data.param.actionLessonType();
        });
    };

    var shopListClickEvent = function () {
        $("#shop-list").on("click", "a", function () {
            event.preventDefault();
            _data.param.currentId = $(this).attr("data-id");
            _data.param.currentName = $(this).attr("data-name");
            _data.param.actionShopList();
        });
    };

    var bannerClickEvent = function () {
        $(".index-banner").on("click", function () {
            _data.param.actionBanner();
        })
    };


    var actionLoadMore = function () {
        $(document).scrollTop(0);                           //初始化scrollTop
        var $window = $(window),
                $document = $(document);

        $window.on('scroll',function(){
                if( ($document.scrollTop()+$window.height()) === $document.height() && isShowMore.result && _data.noPopupView){
                        getData();
                }
        })
    };

    var isShowMore = {
        check: function (total, dataLength) {
            var currentNo = $('#shop-list>a').length;
            if (currentNo < _data.param.pageSize) {
                this.result = false;
            } else if ((currentNo + dataLength) < total) {
                this.result = true;
            } else if ((currentNo + dataLength) >= total) {
                this.result = false;
            }
        },
        result: true
    };

    var showLoading = function () {
        var $loading = $("#loading");
        $loading.appendTo($loading.parent());
        if (isShowMore.result) {
            $loading.show();
        } else {
            $loading.hide();
        }
    };

    var getData = function (isExactly) {
        $.ajax({
            type: _data.param.postType,
            dataType: "text",
            data: {
                cityId: _data.param.cityId,
                categoryIds: _data.param.categoryIds,
                distance: _data.param.distance,
                date: _data.param.date,
                from: _data.param.from,
                to: _data.param.to,
                lat: _data.param.lat,
                lng: _data.param.lng,
                pageNo: isExactly ? 1 : _data.param.initNo += 1,
                pageSize: _data.param.pageSize,
            },
            url: isExactly ? _data.param.postUrlExactly : _data.param.postUrl,
            success: function (data) {
                setTimeout(function () {
                    var dataObj = eval("(" + data + ")");
                    var _shopListTemplate = Handlebars.compile($("#shop-list-template").html());
                    var _bannerTemplate = Handlebars.compile($("#banner-template").html());
                    if (isExactly) {
                        if (dataObj.code == 200) {
                            $("#indexBanner").show();
                            if (dataObj.data.totalCount >= 5) {
                                $('#indexBanner .index-banner h1').html("99元包月，无限次畅玩");
                                $('#indexBanner .index-banner p').html("您周围" + _data.param.distance + "km内的场馆").addClass('point');
                                $('#shop-name-list').html(_bannerTemplate(dataObj.data));
                            } else {
                                $('#indexBanner .index-banner h1').html("99元包月，无限次畅玩");
                                $('#indexBanner .index-banner p').html("100多种活动和课程，给宝贝最多彩的童年");
                            }
                        }
                    } else {
                        isShowMore.check(dataObj.data.totalCount, dataObj.data.shops.length);
                      
                        alert(_data.gotLocation);
                        $('#shop-list').append(_shopListTemplate(dataObj.data));
                        $("#shop-list img").lazyload({
                                        effect : "fadeIn"
                        });
                        showLoading();
                        if (!isShowMore.result) {
                            showLoading();
                            $('#shop-list').append('<div class=\'no-more-tips\'>没有更多了</div>');
                        }
                    }


                }, 200);
            }
        });
    }

    var getLocation = function () {
        if (UA() == 1) {
            wx.ready(function () {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                             var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                             var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                              $.ajax({
                                type:"POST",
                                dataType: "text",
                                data: {
                                        lat: latitude,
                                        lng: longitude,
                                    },
                                    url:"../shop/location",
                                    success: function (data) {
									if(!_data.gotLocation){
										$('#reLocation').slideDown();
										$('#reLocation').on('click',function(){
											window.location.reload();
										})
									}

                                        //alert(JSON.stringify(data));
                                    }
                             })
            
            
                    }
                });
            });
        } else {
            //其他设备坐标传入
        }
    }

    var getLocationMock = function () {
        _data.param.lat = 31.170649;
        _data.param.lng = 121.344346;

        setTimeout(function () {
            window.location.href = "list?cityId=${cityId}&categoryIds=&distance=5&date=&from=&to=&lat=" + _data.param.lat + "&lng=" + _data.param.lng;
        }, 3000);
    }

    $(function () {
        var lessonTypeTemplate,
                shopListTemplate,
				chosenTemp,
				_storage;

        lessonTypeTemplate = Handlebars.compile($("#lesson-type-template").html());
                shopListTemplate = Handlebars.compile($("#shop-list-template").html());
				chosenTemp = Handlebars.compile($("#chosen-template").html());
				_storage = window.localStorage;
				
		
		/*------------landing page handle----------------*/
				if(!_storage.getItem('isSkip')){
					$.get("../config/landingPageConfig.json", function(result) {
						var _template = Handlebars.compile($("#slide-temp").html());
						Handlebars.registerHelper({
							'dot': function(res, options) {
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
							'item': function(res, options) {
								if (res == result.slide.length-1) {
									return options.inverse(this);
								} else {
									return options.fn(this);
								}
							}
						});
	
						$("body").append(_template(result));
						
						//close landing page & skip
						$("#closeLandingPage, #goTo").on("click",function(){
							$("#landingPage").hide();
							_storage.setItem("isSkip",true);
						});
						
						$('#landingPageSlide').swipeSlide({
							autoSwipe: false,
							continuousScroll: false,
							lazyLoad: true,
							transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
							firstCallback: function(i, sum, me) {
								me.find('.dot').children().first().addClass('cur');
							},
							callback: function(i, sum, me) {
								me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
							}
						});
						
					});
				}


/*------------end----------------*/
        //Import Handlebars Helper  2015-11-05
       Handlebars.registerHelper({
					'showIcon': function(res , options){
									if(res == 1){
										return options.fn(this);
									}else{
										return options.inverse(this);
									}		 
					},
					'showDistance': function(res , options){
									if(res){
										return options.fn(this);
									}else{
										return options.inverse(this);
									}		 
					},
					'showChosen': function(res,options){
						if(res.items.length == 3){
							return options.fn(this);
						}else{
							console.log("检查chosen.items.length 是否为 3")
						}
						
					}
				});
                
        //init DOM
        FastClick.attach(document.body);                    //初始化FastLink 解决IOS click事件延迟300ms问题
        $('#lessonType').html(lessonTypeTemplate(_data));   //初始化课程分类
        $("#shop-list").append(shopListTemplate(_data));    //初始化商铺列表
        isShowMore.check();                                 //是否加载更多
        showLoading();
        lessonTypeClickEvent();                             //初始化课程分类click事件
        shopListClickEvent();                               //初始化商铺列表click事件
        bannerClickEvent();                                 //初始化bannerclick事件
        actionLoadMore();                                   //初始化loadMore
		$("#custom").after(chosenTemp(_data.chosen));       //初始化每日精选

        if (_data.gotLocation) {
            getData(true);   //初始化banner
        } else {
            //$(".list-title").html("定位中");
            //$(".list-title").removeClass("icon-cnxh");
            //$(".list-title").addClass("icon-location-loading");
            //Mock
            //getLocationMock();

        }
        getLocation(); 
        
        var bannerPics = [];
        var ua = UA();
        if (ua == 1 || ua == 0) {
            //indxSlider Banner
            bannerPics = [
            <#list banners as banner>
                <#if (banner_index!=0)>,</#if>
                {
                    "img": "${banner.img}",
                    'index' : "${banner_index}",
                    'click' : function(){
                        window.location.href = '${banner.url?replace("{{userId}}", "${userId}")?replace("{{sign}}", "${appSign}")}';
                    }
                }
            </#list>
            ];
        }
        if (ua == 2 || ua == 4 || ua == 5) {
            //indxSlider Banner
            bannerPics = [
            <#list banners as banner>
                <#if (banner_index!=0)>,</#if>
                {
                    "img": "${banner.img}",
                    'index' : "${banner_index}",
                    'click' : function(){
                        window.location.href = 'objc://goDetail:/${banner.url?replace("/","^")?replace("{{userId}}", "${userId}")?replace("{{sign}}", "${appSign}")}/活动页面';
                    }
                }
            </#list>
            ];
        }
        if (ua == 3) {
            //indxSlider Banner
            bannerPics = [
            <#list banners as banner>
                <#if (banner_index!=0)>,</#if>
                {
                    "img": "${banner.img}",
                    'index' : "${banner_index}",
                    'click' : function(){
                        window.app.goDetail('${banner.url?replace("{{userId}}", "${userId}")?replace("{{sign}}", "${appSign}")}', '活动页面');
                    }
                }
            </#list>
            ];
        }

        var Dot = function () {
            var wrap = $("<div class='dot'></div>");
            for (var i = 0; i < bannerPics.length; i++) {
                wrap.append($('<span/>'));
            }
            return wrap;
        }

        //绑定点击事件
        $('#indexSlide').on('click','a',function(){
            var index = $(this).attr('data-index');
            bannerPics[index].click();
        });

        var sliderTemplate = Handlebars.compile($("#slide-template").html());
                
                $("#shop-list img").lazyload({
                                effect : "fadeIn"
                });
                
        $("#indexSlide>ul").html(sliderTemplate(bannerPics));
        $("#indexSlide").append(Dot());

        if (bannerPics.length == 0) {
            $("#indexSlide").hide();
        } else {
            $('#indexSlide').swipeSlide({
                autoSwipe: true,
                continuousScroll: true,
                lazyLoad: true,
                transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                firstCallback: function (i, sum, me) {
                    me.find('.dot').children().first().addClass('cur');
                },
                callback: function (i, sum, me) {
                    me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                }
            });
        }
        
        //searchBox
                        
        if(UA() == 1){
                $('#searchWrap, .btm').show();
                //$('#indexSlide').css('margin-top','2.8rem');
                
                $('#searchOutter').on('click',function(){
                        $('#searchBlock').show();
                        $('#keyword').focus();
                        $('#keyword').val('');
                        $('body, html').css({'overflow':'hidden'});
                        _data.noPopupView = false;
                });
        
                $('#cancelBtn').on('click',function(){
                        event.preventDefault();
                        $('#searchBlock').hide();
                        $('#keyword').val('');
                        $('body, html').css('overflow','initial');
                        _data.noPopupView = true;
                });
                
                $("#search").submit(function(e){
                        if($('#keyword').val() == '' || $('#keyword').val() == null){
                                event.preventDefault();
                        }
                });
        }
      
    });
</script>
</body>
</html>

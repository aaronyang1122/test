$(function(){
	//筛选菜单按钮
	$('.btns').on('click', 'li', function(){
		var $that = $(this);
		if(!$that.hasClass('unfold')){
			$that.addClass('unfold');
			$that.siblings().removeClass('unfold');
			$that.parents('.sortBar').find('.container>li').each(function(index){
			$(this).height(0);
			if($that.index() == index){
					$(this).height($('body').height()-$('.btns').outerHeight()*3);
					$(this).css('overflow','auto');
					$('#sortMask').show();
//					$('#shop-list').height($('body').height()-$('.btns').outerHeight())
//					$('#shop-list').css({'overflow':'hidden','margin-top':'0'});
				}
			})		
		}else{
			closeMask($('#sortMask'));
		}
	});
	
	//关闭
	var closeMask = function(t){
		$('.container>li').height(0);
		t.hide();
		$('.btns>li').removeClass('unfold');
	}
	
	//点击蒙层关闭
	$('#sortMask').on('click', function(){
		closeMask($(this));
	});
	
	//show currentItem
	(function(){
		$('.container>li').each(function(index){
			var initValue = $('.btns>li').eq(index).text();
			if($(this).children('div').hasClass('rangeSelecterMenu')){
				if(initValue == '附近'){
					$(this).find('.col-1 li').eq(0).addClass('currentItem');
					$(this).find('.col-2 .menuList').eq(0).show();
				}else{
					$('.col-2 a').each(function(){
						if(initValue == $(this).text()){
							$('.col-1>li').eq($(this).parents('.menuList').index()).addClass('currentItem');
							$(this).parents('.menuList').show();
							$(this).parents('li').addClass('currentItem');
						}
					})
				}
			}else{
				$(this).children('a').each(function(){
					if($(this).html() == initValue){
						$(this).addClass('currentItem');
					}
				})
			}
		})
	})();
	
	//select distance
//	$('#distanceSelect').on('click', 'li', function(){
//		$(this).siblings('li').removeClass('currentSelect');
//		$(this).addClass('currentSelect');
//	});
	
	//rangeSelect
	$('.rangeSelecterMenu>.col-1').on('click','li',function(){
		var i = $(this).index();
		$(this).addClass('currentItem');
		$(this).siblings().removeClass('currentItem');
		$(this).parents().siblings('.col-2').find('.menuList').each(function(){
			if($(this).index() == i){
				$(this).show();
				$(this).siblings().hide();
			}
		});
	});
	
	//filter
	$('#submit').on('click', function(){
//		$('#distance').val($('#distanceSelect>li').filter('.currentSelect').html());
		$('#packages').val(selectedPackages());
		$('#filter').submit();
		
	});
	
	//packages
	var arr = [];
	$('#packageSelect').on('click', 'li', function(){
		var i = $(this).index();
		if($(this).hasClass('currentSelect')){
			$(this).removeClass('currentSelect');
			arr.splice(i,1);
		}else{
			$(this).addClass('currentSelect');
			arr.push($(this).text());
		}
		$('#packages').val(arr.join());
	});
	
	//initPachages
	var selectedPackages = function(){
		var arr = [];
		$('#packageSelect>li').each(function(){
			if($(this).hasClass('currentSelect')){
				arr.push($(this).text());
			}
		});
		return arr.join();
	}
})

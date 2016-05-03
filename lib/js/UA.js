var UA = function(){
	var ua = window.navigator.userAgent;
	if(/micromessenger/i.test(ua) || /MQQBrowser/i.test(ua)){
		return 1;
	}
	else if(/iphone/i.test(ua)){
		return 2;
	}
	else if(/android/i.test(ua)){
		return 3;
	}
	else if(/ipad/i.test(ua)){
		return 4;
	}
	else if(/ipod/i.test(ua)){
		return 5;
	}
	return 0
}

var os = function() {
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
        }();
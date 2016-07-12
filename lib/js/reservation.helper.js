Handlebars.registerHelper({
		        	'no': function(res , options){
		        		if(!res){
									return options.fn(this);
								}else{
									return options.inverse(this);
								}		 
							},
							'lessonClassName': function(v){
			          switch(v)
									{
										case 1:
										  return "lesson-game";
										  //lessonType:1 = 游乐场 
										case 2:
										  return "lesson-swimming";
										  //lessonType:2 = 亲子游泳 
										case 3:
										  return "lesson-learning";
										  //lessonType:3 = 综合早教 
										case 4:
										  return "lesson-dancing";
										  //lessonType:4 = 音乐舞蹈 
										case 5:
										  return "lesson-english";
										  //lessonType:5 = 少儿英语 
										case 6:
										  return "lesson-sport";
										  //lessonType:6 = 武术运动 
										case 7:
										  return "lesson-drawing";
										  //lessonType:7 = 绘画手工 
										case 8:
										  return "lesson-handwriting";
										  //lessonType:8 = 国学书法
										case 9:
										  return "lesson-lego";
										  //lessonType:9 = 乐高机器人
										case 10:
										  return "lesson-other";
										  //lessonType:10 = 其他 
									}
					   	},
					   	'statusClassName': function(v){
								var _orderStatus = v.status;
								var _category = v.category;
								if(_category == 1){
									switch(_orderStatus){
										case 0:
                        return "reservation-status-0";
                    //待确认
                    case 1:
                        return "reservation-status-1";
                    //已预约（可以取消）
                    case 2:
                    return "reservation-status-2";
                    case 3:
                    return "reservation-status-2";
                    case 5:
                        return "reservation-status-2";
                    //取消
                    case 6:
                        return "reservation-status-3";
                    //已打卡
                    case 4:
                        return "reservation-status-4";
                    //已过期
                    case 7:
                        return "reservation-status-1";
                    //已预约（不能取消）
                    case 8:
                        return "reservation-status-1";
                    //已预约 （打卡）
									}
								}else if(_category == 2){
									switch(v.orderStatus){
										case 1:
											return "reservation-status-1-2";
											//已支付
										case 5:
											return "reservation-status-2";
											//已取消
										case 6:
											return "reservation-status-4-2";
											//已使用
									}
								}
							},
							'showBtn': function(v){
							  var _orderStatus = v.status;
								var _category = v.category;
								if(_category == 1){
								  if(_orderStatus == 0 || _orderStatus == 1){
									//已预约（可以取消）
									return '<button class=\"cancel-btn\">取消订单</button>';
								  }else if(_orderStatus == 8){
									//打卡
									return '<button class=\"registration-btn\">打卡</button>';
								  }
						       }else if(_category == 2){
						       		if(_orderStatus == 1){
						       			return '<button class=\"cancel-2-btn\">退款</button>';
						       		}
						       }
				      },
				      'showSecurityCode': function(v){
			        	var _orderStatus = v.status;
								var _category = v.category;
								if(_category == 1){
									switch(_orderStatus){
										case 1:
											return this.securityCode;
											//已预约（可以取消）
										case 7:
											return this.securityCode;
											//已预约（不能取消）
										case 8:
											return this.securityCode;
											//已预约 （打卡）
									}
								}
			        },
			       'showJiaoBiao': function(v){
								switch(v){
									case 1:
										return "jiaoBiao-1";
										//月卡
									case 2:
										return "jiaoBiao-2";
										//储值卡
								}
			       },
			       'dateChuZhi': function(res , options){
			       	var _date = res.date.replace(/-/g, "/");
			       	
			       	if(res.category == 1){
			       		return options.fn(this);
			       	}else{
			       		var uom = new Date(_date);
			       		uom.setMonth(uom.getMonth() + 2);
			       		return "有效期至 " + uom.getFullYear() + "-" + (uom.getMonth()<9?"0"+(uom.getMonth()+1):uom.getMonth()+1)	+"-"+ uom.getDate();
			       	}
			       }
						});
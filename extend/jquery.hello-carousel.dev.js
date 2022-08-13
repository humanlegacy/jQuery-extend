;(function($, window, undefined) {
	"use strict";
	$.helloExtend.prototype.carousel = function(param) {
		var defaults = {
			ele: '.hello-carousel',
			size: 'fullScreen',
			direction: 'y',	//轮播方向
			index: 0,	//默认显示的轮播索引
			touch: true,	// 是否可拖拽；支持移动与pc端
			flex:80,	//拖拽响应的距离
			horVertical: false,	//容器中内容是否垂直居中
			arrow: {
				show:false,
				html:["<i class='icon-arrow-left'></i>", "<i class='icon-arrow-right'></i>"]
			},
			trigger:{
				show: true,
				position:'bottom',
				type:'dots',  //参数：dots,title
				title:['hello-ui组件发布','无缝轮播插件','GitHub','回调函数','不定期更新']
			},
			autoPlay: false,
			interval: 3000,
			speed: 500,
			onLeave: function(index) {},
			onEnter: function(index) {}
		},
			opts = $.extend({}, defaults, param),
			moveRange = 0,	//鼠标拖拽容器移动的距离
			isMove = false,
			prev = 0,	//拖拽交互中记录轮播索引
			next = 0,
			prevIndex = 0,
			//opts.index = 0,
			pos = {},
			$container = $(opts.ele),
			$width = 0,
			$height = 0,
			$item = $container.find('.carousel-item');
		if (opts.size === 'fullScreen') {
			$width = $(window).width();
			$height = $(window).height();
		} else {
			$width = opts.size[0];
			$height = opts.size[1];
		};
		
		//初始轮播布局
		function display() {
			if (opts.size === 'fullScreen') {
				$('html,body').css({width: '100%',height: '100%'});
				$container.css({width: '100%',height: '100%'});
			} else {
				$container.css({width: opts.size[0] + 'px',height: opts.size[1] + 'px'});
			};
			$item.css({width: $width}).wrapAll('<div class="carousel-wrap"></div>');
			

			//容器是否垂直居中
			if (opts.horVertical === true) {
				$item.each(function() {
					$(this).wrapInner('<div class="table"><div class="table-cell"></div></div>');
				});
			};
			//导航箭头
			if (opts.arrow.show === true) {
				$container.append('<span class="carousel-arrow carousel-arrow-left">' + opts.arrow.html[0] + '</span><span class="carousel-arrow carousel-arrow-right">' + opts.arrow.html[1] + '</span>');
			}
			//触发焦点
			if (opts.trigger.show === true) {
				$container.append('<div class="hello-carousel-trigger"></div>');
				var $trigger = $container.find('.hello-carousel-trigger');
				$trigger.addClass(opts.trigger.position+' '+opts.trigger.type);
				if(opts.trigger.type === 'title'){
					for (var i = 0; i < $item.length; i++) {
						$trigger.append('<i class="trigger" title="'+opts.trigger.title[i]+'">'+opts.trigger.title[i]+'</i>');
					}
				}else{
					for (var i = 0; i < $item.length; i++) {
						$trigger.append('<i class="trigger"></i>');
					}
				}
				$trigger.find('.trigger').eq(opts.index).addClass('current');
			};
			//气泡提示
			if(opts.trigger.showPopUp === true){
				$container.find('.hello-carousel-trigger').addClass('show-popup');
			}
			//滚动方向
			direction();
			//默认显示轮播索引
			$item.eq(opts.index).css(pos.init).siblings().css(pos.minus);
		}
		
		//轮播方向
		function direction() {
			if (opts.direction === 'x') {
				pos = {
					init: {
						left: 0
					},
					add: {
						left: $width
					},
					minus: {
						left: -$width
					}
				};
			} else {
				pos = {
					init: {
						top: 0
					},
					add: {
						top: $height
					},
					minus: {
						top: -$height
					}
				};
			}
		}
		
		//上一张
		function moveMinus() {
			$item.eq(prevIndex).stop(false, true).animate(pos.add, opts.speed);
			$item.eq(opts.index).css(pos.minus).stop(false, true).animate(pos.init, opts.speed, function() {
				callBack();
			});
			current(opts.index);
		}
		
		//下一张
		function moveAdd() {
			$item.eq(prevIndex).stop(false, true).animate(pos.minus, opts.speed).siblings().css(pos.minus);
			$item.eq(opts.index).css(pos.add).stop(false, true).animate(pos.init, opts.speed, function() {
				callBack();
			});
			current(opts.index);
		}
		
		//当前轮播焦点
		function current(index) {
			$container.find('.trigger').eq(opts.index).addClass('current').siblings().removeClass('current');
		}
		
		//自动轮播函数
		function autoPlay() {
			function auto() {
				prevIndex = opts.index;
				opts.index >= $item.length - 1 ? opts.index = 0 : opts.index++;
				moveAdd();
			}
			var timer = setInterval(auto, opts.interval);
			$container.hover(function() {
				clearInterval(timer);
			}, function() {
				timer = setInterval(auto, opts.interval);
			});
		}
		
		//全屏时的浏览器窗口调整大小时的函数
		function resize() {
			$(window).resize(function() {
				var width = $(this).width(),
					height = $(this).height();
				$width = width;
				$height = height;
				$item.css({
					width: width,
					height: height
				});
				direction();
				$item.eq(opts.index).css(pos.init).siblings().css(pos.minus);
			});
		}
		
		//回调函数
		function callBack() {
			if (opts.onLeave) {
				opts.onLeave(prevIndex);
			}
			if (opts.onEnter) {
				opts.onEnter(opts.index);
			}
		}
		
		//变量prevIndex为上一个轮播索引
		$container.on('click', '.carousel-arrow-left', function(e) {
			e.stopPropagation();
			if (!$item.is(":animated")) {
				prevIndex = opts.index;
				opts.index > 0 ? opts.index-- : opts.index = $item.length - 1;
				moveMinus();
			}
		});
		$container.on('click', '.carousel-arrow-right', function(e) {
			e.stopPropagation();
			if (!$item.is(":animated")) {
				prevIndex = opts.index;
				opts.index >= $item.length - 1 ? opts.index = 0 : opts.index++;
				moveAdd();
			}
		});
		
		//比较当前触发焦点索引与上一个轮播索引的大小
		//由此执行上一张还是下一张
		$container.on('mouseover', '.trigger', function(e) {
			e.preventDefault();
			prevIndex = opts.index;
			opts.index = $(this).index();
			if (opts.index > prevIndex) {
				moveAdd();
			} else if (opts.index < prevIndex) {
				moveMinus();
			}
		});

		//触摸拖拽
		function touch() {
			var touchEvents = {};
			$.hello('_isPc') ? touchEvents = {touchstart: "mousedown",touchmove: "mousemove",touchend: "mouseup"}
										 : touchEvents = {touchstart: "touchstart",touchmove: "touchmove",touchend: "touchend"};
		
			$item.addClass('grab');
			$container.find(".carousel-wrap").bind(touchEvents.touchstart, function(e) {
				//e.preventDefault();
				$item.removeClass('grab').addClass('grabbing');
				if (opts.direction === 'x') {
					var mouseX = (e.clientX||e.originalEvent.targetTouches[0].pageX) - $container.offset().left;
				} else {
					var mouseY = (e.clientY||e.originalEvent.targetTouches[0].pageY) - $container.offset().top;
				}
				var $self = $(this);
				$self.bind(touchEvents.touchmove, function(e) {
					isMove = true;
					e.preventDefault();
					if (opts.direction === 'x') {
						moveRange = (e.clientX||e.originalEvent.targetTouches[0].pageX) - $container.offset().left - mouseX;
						var moveG = {
							minus: {left: -$width + moveRange},
							add: {left: $width + moveRange},
							init: {left: moveRange}
						};
					} else {
						moveRange = (e.clientY||e.originalEvent.targetTouches[0].pageY) - $container.offset().top - mouseY;
						var moveG = {
							minus: {top: -$height + moveRange},
							add: {top: $height + moveRange},
							init: {top: moveRange}
						};
					}
					opts.index < 0 ? prev = $item.length - 1 : prev = opts.index - 1;
					opts.index == $item.length - 1 ? next = 0 : next = opts.index + 1;
					$item.eq(prev).css(moveG.minus);
					$item.eq(opts.index).css(moveG.init);
					$item.eq(next).css(moveG.add);
				});
				
				//释放
				$self.bind(touchEvents.touchend, function(e) {
					if (!isMove) {
						return;
					}
					$item.removeClass('grabbing').addClass('grab');
					$self.unbind(touchEvents.touchmove);
					//$self.unbind(touchEvents.touchstart);
					if (Math.abs(moveRange) > opts.flex) {
						if (!$item.is(":animated")) {
							if (moveRange > 0) {
								$item.eq(opts.index).stop(false, true).animate(pos.add, opts.speed);
								$item.eq(prev).stop(false, true).animate(pos.init, opts.speed, function() {
									callBack();
								});
								prevIndex = opts.index;
								opts.index > 0 ? opts.index-- : opts.index = $item.length - 1;
							} else {
								$item.eq(opts.index).stop(false, true).animate(pos.minus, opts.speed);
								$item.eq(next).stop(false, true).animate(pos.init, opts.speed, function() {
									callBack();
								});
								prevIndex = opts.index;
								opts.index >= $item.length - 1 ? opts.index = 0 : opts.index++;
							}
							current(opts.index);
						}
					} else {
						$item.eq(prev).stop(false, true).animate(pos.minus, opts.speed);
						$item.eq(opts.index).stop(false, true).animate(pos.init, opts.speed);
						$item.eq(next).stop(false, true).animate(pos.add, opts.speed);
					}
					isMove = false;
				});
			});
		}
		
		display();
		if (opts.autoPlay) {
			autoPlay();
		}
		if (opts.size === 'fullScreen') {
			resize();
		}
		if (opts.touch) {
			touch();
		}
	}
})(jQuery, window);
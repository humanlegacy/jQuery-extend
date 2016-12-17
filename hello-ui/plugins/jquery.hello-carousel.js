; (function($, window, undefined) {
	$.helloPlug.prototype.carousel = function(param){
		var defaults = {
			ele:'.hello-carousel',
			size: 'fullScreen',  //[700,350]
			startIndex: 0,
			horVertical: true,
			arrow: true,
			arrowText: ["Prev", "Next"],
			dots: true,
			autoPlay: false,
			interval: 3000,
			speed:500,
			onLeave: function(index) {},
			onEnter: function(index) {}
		},
		opts = $.extend({},defaults, param),
		index = oldindex = opts.startIndex,
		$container = $(opts.ele),
		$item = $container.find('.carousel-item');
		opts.size === 'fullScreen' ? $width = $container.width() : $width = opts.size[0];
		function display() {
			if (opts.size === 'fullScreen') {
				$('html,body').css({
					width: '100%',height: '100%'
				});
				$container.css({
					width: '100%',height: '100%'
				});
			} else {
				$container.css({
					width: opts.size[0] + 'px',
					height: opts.size[1] + 'px'
				});
			}
			$item.css({width : $width}).wrapAll('<div class="carousel-wrap"></div>');
			if (opts.horVertical === true) {
				$item.each(function() {
					$(this).wrapInner('<div class="table"><div class="table-cell"></div></div>');
				});
			}
			if (opts.arrow === true) {
				$container.append('<span class="carousel-arrow carousel-arrow-left">' + opts.arrowText[0] + '</span><span class="carousel-arrow carousel-arrow-right">' + opts.arrowText[1] + '</span>');
			}
			if (opts.dots === true) {
				$container.append('<div class="carousel-dots"></div>');
				for (var i = 0; i < $item.length; i++) {
					$container.find('.carousel-dots').append('<i class="dots"></i>');
				}
				$container.find('.carousel-dots .dots').eq(index).addClass('current');
			}
			$item.eq(index).css({left : 0}).siblings().css({left : -$width});
		}
		function autoPlay() {
			if (opts.autoPlay) {
				function auto() {
					oldindex = index;
					index >= $item.length - 1 ? index = 0 : index++;
					moveRight();
				}
				var timer = setInterval(auto, opts.interval);
				$container.hover(function() {
					clearInterval(timer);
				},function() {
					timer = setInterval(auto, opts.interval);
				});
			}
		}
		
		function resize() {
			$(window).resize(function() {
				$item.css({width: $container.width()});
				$item.eq(index).stop().animate({'left': 0}).siblings().css({left: - $container.width()});
				$width = $container.width();
			});
		}
		function callBack() {
			if (opts.onLeave) {
				opts.onLeave(oldindex);
			}
			if (opts.onEnter) {
				opts.onEnter(index);
			}
		}
		function moveLeft() {
			$item.eq(oldindex).stop(false, true).animate({'left': $width},opts.speed);
			$item.eq(index).css({'left': -$width}).stop(false, true).animate({'left': 0},opts.speed,function() {callBack();});
			current(index);
		}
		function moveRight() {
			$item.eq(oldindex).stop(false, true).animate({'left': -$width},opts.speed).siblings().css({'left': -$width});
			$item.eq(index).css({'left': $width}).stop(false, true).animate({'left': 0},opts.speed,function() {callBack();});
			current(index);
		}
		function current(index) {
			$container.find('.dots').eq(index).addClass('current').siblings().removeClass('current');
		}
		$container.on('click','.carousel-arrow-left',function() {
			if (!$item.is(":animated")) {
				oldindex = index;
				index > 0 ? index--:index = $item.length - 1;
				moveLeft();
			}
		});
		$container.on('click','.carousel-arrow-right',function() {
			if (!$item.is(":animated")) {
				oldindex = index;
				index >= $item.length - 1 ? index = 0 : index++;
				moveRight();
			}
		});
		$container.on('mouseover','.dots',function() {
			oldindex = index;
			index = $(this).index();
			if (index > oldindex) {
				moveRight();
			} else if (index < oldindex) {
				moveLeft();
			}
		});
		display();
		resize();
		autoPlay();
	}
})(jQuery, window);
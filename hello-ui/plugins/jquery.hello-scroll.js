; (function($) {
	$.helloPlug.prototype.scroll = function(param){
		var defaults = {
			step: 10,
			animate: null,
			duration: 200,
			barStyle:{},
			scrollEnd: function() {
				console.log('end!');
			}
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
		$wrap = null,
		$content = null,
		$bar = null,
		activeTop = 0,
		moveStep = 0,
		num = 1,
		maxTop = 0;

		function display() {
			$this.wrapInner('<div class="hello-scroll-wrap"></div>');
			$wrap = $this.find(".hello-scroll-wrap");
			$wrap.wrapInner('<div class="hello-scroll-content"></div>');
			$content = $this.find(".hello-scroll-content");
			$wrap.css({
				width : $this.width(),
				height : $this.height()
			});
			if ($content.height() > $wrap.height()) {
				$wrap.append('<span class="hello-scroll-bar"></span>');
				$bar = $this.find(".hello-scroll-bar");
				$bar.css($.extend(opts.barStyle,{'height': $this.height() * $this.height() / $content.height()}));
			}
			maxTop = $wrap.height() - $bar.height();
		}
		function scroll() {
			$bar.on("mousedown",function(e) {
				var $this_ = $(this),mdPos = e.clientY - $(this).offset().top;
				$this.on('mousemove',function(e) {
					$(this).addClass('no-select');
					activeTop = e.clientY - mdPos - $wrap.offset().top;
					if (activeTop < 0) {
						$this_.css({top: 0});
						$content.css({top: 0});
					} else if (activeTop > maxTop) {
						$this_.css({top: maxTop});
						$content.css({top: -maxTop * $content.height() / $this.height()});
						callBack();
					} else {
						$this_.css({top: activeTop});
						if (!opts.animate) {
							$content.css({top: -activeTop * $content.height() / $this.height()});
						} else {
							$content.stop().animate({top: -activeTop * $content.height() / $this.height()},opts.duration, opts.animate);
						}
					}
				});
				$this.on('mouseup',function() {
					$(this).off('mousemove').removeClass('no-select');
					num = Math.ceil(parseInt($bar.css('top')) / moveStep);
				});
			});
		}
		function mousewheel() {
			moveStep = ($wrap.height() - $bar.height()) / opts.step;
			$this.mousewheel(function(event, delta) {
				if (!opts.animate) {
					$bar.css({
						top: num * moveStep
					});
					$content.css({
						top: -num * moveStep * $content.height() / $this.height()
					});
				} else {
					$bar.stop().animate({
						top: num * moveStep
					},opts.duration, opts.animate);
					$content.stop().animate({
						top: -num * moveStep * $content.height() / $this.height()
					},opts.duration, opts.animate);
				}
				if (delta < 0) {
					if (num == opts.step) {
						callBack();
						return;
					}
					num++;
				} else {
					if (num == 0) {
						return;
					}
					num--;
				}
				if (num <= opts.step && num >= 0) {
					event.preventDefault();
				}
			});
		}
		function callBack() {
			if (opts.scrollEnd) {
				opts.scrollEnd();
				opts.scrollEnd = null;
			}
		}
		display();
		scroll();
		mousewheel();
	}
})(jQuery);
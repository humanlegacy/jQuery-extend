; (function($,document) {
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
		function size(){
			$wrap.css({
				width : $this.width(),
				height : $this.height()
			});
			if ($content.height() > $wrap.height()) {
				if($wrap.find(".hello-scroll-bar").length==0){
					$wrap.append('<span class="hello-scroll-bar"></span>');
					$bar = $this.find(".hello-scroll-bar");
				}
				$bar.css($.extend(opts.barStyle,{'height': $this.height() * $this.height() / $content.height()}));
				maxTop = $wrap.height() - $bar.height();
				scroll();
				mousewheel();
			}else{
				if($(".hello-scroll-bar").length>0){
					$bar.remove();
				}
			}
		}
		
		function display() {
			$this.wrapInner('<div class="hello-scroll-wrap"></div>');
			$wrap = $this.find(".hello-scroll-wrap");
			$wrap.wrapInner('<div class="hello-scroll-content"></div>');
			$content = $this.find(".hello-scroll-content");
			size();
			$(window).resize(function(){
				size();
				$bar.css({top: 0});
				$content.css({top: 0});
			});
		}
		function scroll() {
			$this.on("mousedown.scroll",$bar,function(e) {
				var $this_ = $(this),mdPos = e.clientY - $bar.offset().top;
				$this.on('mousemove.scroll',function(e) {
					$wrap.addClass('no-select');
					activeTop = e.clientY - mdPos - $wrap.offset().top;
					if (activeTop < 0) {
						$bar.css({top: 0});
						$content.css({top: 0});
					} else if (activeTop > maxTop) {
						$bar.css({top: maxTop});
						$content.css({top: -maxTop * $content.height() / $this.height()});
						callBack();
					} else {
						$bar.css({top: activeTop});
						if (!opts.animate) {
							$content.css({top: -activeTop * $content.height() / $this.height()});
						} else {
							$content.stop().animate({top: -activeTop * $content.height() / $this.height()},opts.duration, opts.animate);
						}
					}
				});
				$('body').on('mouseup.scroll',function() {
					$this.off('mousemove.scroll');
					$wrap.removeClass('no-select');
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

	}
})(jQuery,document);
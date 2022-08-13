; (function($) {
	$.helloExtend.prototype.tabs = function(param){
		var defaults = {
			ele:'.tabs',
			triggerName: ['Black', 'Red', 'Yellow', 'White', 'Green'],
			autoPlay: false,
			interval: 1000,
			event: 'mouseover'
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
		$trigger = null,
		$container = null,
		timer = null,
		times = 1;

		function display() {
			var dom = '<ul class="hello-tabs-trigger">';
			for (var i = 0; i < opts.triggerName.length; i++) {
				dom += '<li>' + opts.triggerName[i] + '</li>';
			}
			dom += '</ul>';
			$this.prepend(dom);
			$trigger = $this.find('.hello-tabs-trigger');
			$container = $this.find('.hello-tabs-container');
			$this.find($trigger).children().first().addClass('current');
			$container.children().first().addClass('current');
			if (opts.event != 'mouseover' && opts.event != 'click') return;
			$this.find($trigger).children().bind(opts.event,function() {
				var index = $(this).index();
				current(index);
			});
			$this.hover(function() {
				clearInterval(timer);
			},function() {
				if (opts.autoPlay) {
					var index = $container.children(":visible").index();
					times = index + 1;
					autoPlay();
				}
			});
		}
		function current(num) {
			$this.find($trigger).children().eq(num).addClass('current').siblings().removeClass('current');
			$container.children().eq(num).addClass('current').siblings().removeClass('current');
		}
		function autoPlay() {
			function auto(){
				current(times - 1);
				times == opts.triggerName.length ? times = 1 : times++;
			}
			timer = setInterval(auto, opts.interval);
		}
		display();
		if (opts.autoPlay) {
			autoPlay();
		}
	}
})(jQuery);
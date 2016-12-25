;(function($) {
	$.helloPlug.prototype.accordion = function(param){
		var defaults = {
			event:'mouseover',
			speed: 200,
			callBack: function() {}
		},
		opts = $.extend({},defaults, param),
		$trigger = $('.hello-accordion-trigger'),
		$container = $('.hello-accordion-container');
		$trigger.bind(opts.event,function() {
			var $this = $(this),target = $this.data('target');
			$(".hello-accordion-container[data-target='" + target + "']").slideToggle(opts.speed,function() {
				$this.find(".btn").toggleClass("current");
				if (opts.callBack) {
					opts.callBack();
				}
			});
		});
	}
})(jQuery);
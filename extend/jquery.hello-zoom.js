; (function($) {
	$.helloExtend.prototype.zoom = function(param){
		var defaults = {
			ele:'.zoom',
			container: [450, 300],
			glasses: [170, 170],
			scale: 2
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
		$img = $this.find("img").attr("src"),
		Mt = 0,
		Ml = 0;

		function display() {
			$this.append("<div class='glasses'><img src='" + $img + "'></div>");
			$this.css({
				width: opts.container[0] + 'px',
				height: opts.container[1] + 'px'
			}).find(".glasses").css({
				width: opts.glasses[0],
				height: opts.glasses[1]
			}).find("img").css({
				width: opts.container[0] * opts.scale,
				height: opts.container[1] * opts.scale
			});
		}
		function move(e) {
			var $glasses = $this.find('.glasses'),
				   Gw = opts.glasses[0],
				   Gh = opts.glasses[1],
				   Cw = opts.container[0],
				   Ch = opts.container[1],
				   Cleft = $this.offset().left,
				   Ctop = $this.offset().top,
				   Cx = e.pageX - Cleft,
				   Cy = e.pageY - Ctop;
			$glasses.css({
				top: Cy - Gh / 2,
				left: Cx - Gw / 2
			});
			if (Cx > 0 && Cy > 0 && Cx < Cw && Cy < Ch) {
				$this.find(".glasses").fadeIn(150);
			} else {
				$this.find(".glasses").fadeOut(150);
			}
			Ml = - Math.round(Cx / Cw * Cw * opts.scale - Gw / 2);
			Mt = - Math.round(Cy / Ch * Ch * opts.scale - Gh / 2);
		}

		display();
		$this.mousemove(function(e) {
			move(e);
			$(this).find(".glasses>img").css({
				top : Mt , left : Ml
			});
		});
	}
})(jQuery);
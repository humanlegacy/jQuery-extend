; (function($,document) {
	$.helloExtend.prototype.autoComplete = function(param){
		var defaults = {
			ele:'.demo',
			data: [
				{index: 1,item: 'white'},
				{index: 2,item: 'balck'}
			],
			autoFocus: true,
			menu: '.demo-menu',
			callBack: function(data) {}
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele);

		function display() {
			$this.attr("autocomplete", "off");
			$("body").append('<div class="hello-autocomplete ' + opts.menu.substring(1) + '"><ul class="wrap"></ul></div>');
			for (var i = 0; i < opts.data.length; i++) {
				$(opts.menu).find(".wrap").append("<li data-index='" + opts.data[i].index + "'><span>" + opts.data[i].item + "</span></li>");
			}
			$(opts.menu).css({
				width: $this.width() + 1,
				left: $this.offset().left,
				top: $this.offset().top + $this.outerHeight()
			});
		}
		function keyup() {
			$this.keyup(function() {
				$(opts.menu).addClass("current");
			});
		}
		function focus() {
			$this.bind('focus click',function(e) {
				e.stopPropagation();
				$(opts.menu).addClass("current");
			});
		}
		function check() {
			$this.keyup(function(){
				var value = $(this).val();
				if (value.length > 0) {
					$(opts.menu).find("li").each(function() {
						var liStr = $(this).find("span").text(),
						LowerCaseliStr = liStr.toLowerCase();
						LowerCaseliStr.indexOf(value.toLowerCase()) > -1 ? $(this).show() : $(this).hide();
					});
				} else {
					$(opts.menu).find("li").show();
				}
			});
		}
		function select() {
			$(opts.menu).on("click", 'li',function(e) {
				e.stopPropagation();
				var item = $(this).text(),index = $(this).data("index");
				$this.val(item);
				if (opts.callBack) {
					opts.callBack({
						index: index,
						item: item
					});
				}
				$(opts.menu).removeClass("current");
			});
		}
		function hide(){
			$(document).click(function(){
				$(opts.menu).removeClass("current");
			});
		}
		display();
		opts.autoFocus ? focus() : keyup();
		check();
		select();
		hide();
	}
})(jQuery,document);
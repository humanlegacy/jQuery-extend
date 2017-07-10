; (function($) {
	$.helloExtend.prototype.select = function(param){
		var defaults = {
			ele:'.hello-select',
			smartScroll:false,
			title: '请选择',
			city: false,
			split: '-',
			data: 'libs/data.json',
			input: '#id'
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele);
		
		function display(type) {
			opts.smartScroll ? 
				$this.wrapInner('<div class="hello-select-wrap smart-scroll"></div>') :
				$this.wrapInner('<div class="hello-select-wrap"></div>') ;
			
			$this.prepend('<span class="hello-select-btn">' + type + '</span>');
		}
		function open () {
			$this.on('click', '.hello-select-btn',function() {
				$this.toggleClass('current');
			});
		}
		function close() {
			$this.removeClass('current');
		}
		function select() {
			$this.find(".hello-select-list").on('click', 'li',function() {
				var selected = $(this).text();
				$this.find(".hello-select-btn").text(selected);
				opts.input ? $(opts.input).val(selected) : '';
				close();
			});
		}
		function common() {
			display(opts.title);
			open();
			select();
			close();
		}
		function cityOpts(optsList) {
			return '<li>' + optsList + '</li>';
		}

		function city() {
			$this.addClass('hello-city');
			var html = '<div class="hello-select-city">' + '<div class="tabs">' + '<span class="current">省级</span><span>市级</span><span>区级</span>' + '</div>' + '<div class="container-inner"><ul class="current"></ul><ul></ul><ul></ul></div>' + '</div>';
			$this.html(html);
			var M = $this.find(".container-inner"),
				   M1 = M.find("ul").eq(0),
				   M2 = M.find("ul").eq(1),
				   M3 = M.find("ul").eq(2);
			display(opts.title);
			open();
			close();

			$this.find(".tabs").on('click','span',function() {
				var index = $(this).index();
				$(this).addClass("current").siblings().removeClass("current");
				$(this).parent().next().find("ul").eq(index).addClass("current").siblings().removeClass("current");
			});
			M.find("ul").on('click', 'li',function() {
				var index = $(this).parent().index() + 1;
				$(this).addClass('current').siblings().removeClass('current');
				$(this).parentsUntil($this).find(".tabs span").eq(index).addClass("current").siblings().removeClass("current");
				$(this).parent().next().addClass("current").siblings().removeClass("current");
				$(this).parent().nextAll().html("");
			});

			$.getJSON(opts.data,function(result) {$.each(result[0],function(p1) {
					$this.find("ul").eq(0).append(cityOpts(p1));
				});

				var M1s, M2s;
				M1.on('click', 'li',function() {
					M1s = $(this).text();
					$.each(result[0],function(p1, p2) {
						if (M1s == p1) {
							$.each(p2,function(p3, p4) {
								M2.append(cityOpts(p3));
							});
						}
					});
				});

				M2.on("click", "li",function() {
					M2s = $(this).text();
					$.each(result[0],function(p1, p2) {
						$.each(p2,function(p3, p4) {
							if (M2s == p3) {
								$.each(p4.split(","),function() {
									M3.append(cityOpts(this));
								});
							}
						});
					});
				});

				M3.on("click", "li",function() {
					var cityArr = [];
					$this.find('ul').each(function() {
						$(this).find('li').each(function() {
							$(this).hasClass('current') ? cityArr.push($(this).text()) : '';
						});
					});
					$(this).parentsUntil($this).parent().find('.hello-select-btn a').html(cityArr.join(opts.split));
					opts.input ? $(opts.input).val(cityArr.join(opts.split)) : '';
					close();
				});
			});
		}

		opts.city ? city() : common();
		$.hello('_mScroll','.hello-select.current .hello-select-wrap.smart-scroll');
	}
})(jQuery);
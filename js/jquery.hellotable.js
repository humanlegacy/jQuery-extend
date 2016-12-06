; (function($, window, undefined) {
	function Table(ele, opts) {
		this.defaults = {
			width: 550,
			height: 350,
			rowFixed: 2,
			//colFixed:1
		};
		this.opts = $.extend({},
		this.defaults, opts);
		this.table = {
			self: ".hello-table",
			container: ".hello-table-container",
			fixed: ".table-fixed",
			wrap: ".table-wrap",
			header: ".table-header",
			body: ".table-body",
		};
		this.dom = {
			header: "<div class='table-header'><table border='0' cellspacing='0' cellpadding='0'><thead></thead></table></div>",
			body: "<div class='table-body'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>",
			fixed: "<div class='table-fixed'></div>",
			wrap: "<div class='table-wrap'></div>"
		};
		this.$container,
		this.$header,
		this.$body,
		this.fixedHeight;
	}
	Table.prototype = {
		display: function() {
			$(this.table.self).hide().wrap("<div class='hello-table-container'></div>");
			$(this.table.self).find("td").wrapInner("<span></span>");
			$(this.table.container).css({
				width: this.opts.width + 'px',
				height: this.opts.height + 'px'
			});
			$(this.table.container).append(this.dom.fixed);
			$(this.table.container).append(this.dom.wrap);
			$(this.table.fixed).append(this.dom.header + this.dom.body);
			$(this.table.wrap).append(this.dom.header + this.dom.body);
			this.$container = $(this.table.container);
			this.$body = $(this.table.wrap).find(this.table.body);
		},
		colFixed: function(self) {
			this.$container.addClass("col-fixed");
			//冻结列
			$(self.table.fixed).find("thead").append("<tr></tr>");
			for (var i = 1; i <= this.opts.colFixed; i++) {
				$(self.table.fixed).find("thead tr").append($(this.table.self).find('thead').find('td').eq(i - 1));
			}
			$(this.table.self).find('tbody').find("tr").each(function(index) {
				$(self.table.fixed).find("tbody").append("<tr></tr>");
				for (var i = 1; i <= self.opts.colFixed; i++) {
					$(self.table.fixed).find("tbody tr").eq(index).append($(this).find('td').eq(i - 1));
				}
			});
			this.$header = $(this.table.wrap).find(this.table.header);
			//表内容
			$(this.table.self).find('thead tr').appendTo(this.$header.find("thead"));
			$(this.table.self).find('tbody tr').appendTo(this.$body.find("tbody"));
			this.$body.scroll(function() {
				var left = $(this).scrollLeft();
				var top = $(this).scrollTop();
				self.$header.css({
					"margin-left": -left
				});
				$(self.table.fixed).find(self.table.body).css({
					"margin-top": -top
				});
			});
			$(this.table.wrap).css({
				width: this.opts.width - $(this.table.fixed).width(),
				height: this.opts.height
			});

			this.fixedHeight = this.$header.height();
			this.count(self);
		},
		rowFixed: function(self) {
			this.$container.addClass("row-fixed");
			if (this.opts.rowFixed != undefined) {
				$(this.table.self).find("tbody tr").eq(this.opts.rowFixed - 1).nextAll().appendTo(this.$body.find('tbody'));
				$(this.table.fixed).empty().append($(this.table.self).show());
			} else {
				$(this.table.self).find("tbody tr").appendTo(this.$body.find('tbody'));
				$(this.table.self).find("thead tr").appendTo($(this.table.fixed).find("thead"));
			}
			$(this.table.body).scroll(function() {
				var left = $(this).scrollLeft();
				$(self.table.fixed).css({
					"margin-left": -left
				});
			});
			$(this.table.wrap).css({
				width: this.opts.width,
				height: this.opts.height - $(this.table.fixed).height()
			});
			this.$header = $(this.table.fixed).find("thead");
			this.fixedHeight = $(this.table.fixed).height();
			this.count(self);
		},
		count: function(self) {
			this.$header.find("td").each(function(index) {
				var Hw = $(this).find("span").width(),
				Bw = self.$body.find("td").eq(index).find("span").width();
				if (Hw > Bw) {
					self.$body.find("td").eq(index).find("span").css({
						width: Hw + 'px'
					});
				} else {
					$(this).find("span").css({
						width: Bw + 'px'
					});
				}
			});
			this.$body.css({
				height: this.$body.height() < this.opts.height ? this.$body.height() + 'px': this.opts.height - this.fixedHeight + 'px'
			});
		},
		init: function() {
			this.display();
			if (this.opts.colFixed != undefined && typeof(this.opts.colFixed) == 'number') {
				this.colFixed(this);
			} else {
				this.rowFixed(this);
			}
		}
	}

	$.fn.helloTable = function(opts) {
		var fn = new Table(this, opts);
		return fn.init();
	}
})(jQuery, window);
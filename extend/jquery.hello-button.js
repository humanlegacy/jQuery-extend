;(function($) {
	$.helloExtend.prototype.button = function(param){
		var defaults = {
			ele:'.hello-btn',
			scene:'text',
			type:'success',
			msg:'Hello-ui',
			killTime:5,
			callBack: function() {}
		},
		opts = $.extend({},defaults, param);
		
		var btn = {
			text:function($this,data){
				$this.html(opts.msg);
				if(opts.callBack){
					opts.callBack($this,data);
				}
			},
			time:function($this,data){
				var timer = opts.killTime,content = '' ,showTime = setInterval(function() {
					if (timer == 0) {
						$this.attr("disabled",false).removeClass('disabled');
						clearInterval(showTime);
						timer = opts.killTime;
						if(opts.callBack){
							opts.callBack($this,data);
						}
					} else{
						new RegExp("({T})").test(opts.msg) ? content = opts.msg.replace(RegExp.$1,timer) : null;
						$this.html(content).attr("disabled", true).addClass('disabled');
						timer--;
					}
				},1000);
			},
			loading:function($this,data){
				$this.html('<i class="icon-spinner hello-loading"></i> 加载中···').attr("disabled", true).addClass('disabled');
				if(opts.callBack){
					opts.callBack($this,data);
				}
			}
		};
		
		$(opts.ele).each(function(){
			var $this = $(this);
			if(opts.type){$this.addClass(opts.type);}
			$this.click(function(e){
				e.preventDefault();
				var data = $this.html();
				btn[opts.scene]($this,data);
			});
		});
	}
})(jQuery);
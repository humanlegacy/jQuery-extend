;(function($) {
	$.helloPlug.prototype.tip = function(param){
		var defaults = {
			width:230,
			position:'center',
			type:'success',
			msg:'msg!',
			keep:3,
			callBack: function() {}
		},
		opts = $.extend({},defaults, param);
		
		function createTip(){
			var icon = {
			   default:'<i class="icon-bullhorn"></i>',
			   success:'<i class="icon-ok"></i>',
			   error:'<i class="icon-remove"></i>',
			   warning:'<i class="icon-warning-sign"></i>',
			   info:'<i class="icon-info-sign"></i>'
			},
			tip = '<div class="layout-tip"><table><tr><td>'+icon[opts.type]+'</td><td><span class="msg">' + opts.msg + '</span></td></tr></table></div>';
			return $(tip).addClass(opts.type).css({width:opts.width});
		};
		
		var $tip = createTip(),
			  T = opts.keep,
			  $tipLeft  = ( $(window).width() - $tip.outerWidth() ) / 2,
			  $tipTop  = ( $(window).height() - $tip.outerHeight() ) / 2,
			   pos = {
					leftTop:{'top':10,'left':10,'position':'fixed','z-index':'99999'},
					leftBottom:{'bottom':10,'left':10,'position':'fixed','z-index':'99999'},
					rightTop:{'top':10,'right':10,'position':'fixed','z-index':'99999'},
					rightBottom:{'bottom':10,'right':10,'position':'fixed','z-index':'99999'},
					center:{'left':$tipLeft,'top':$tipTop,'position':'fixed','z-index':'99999'},
			   };
		if(opts.position == 'center'){
			$("body").append($tip);
			$tip.css(pos[opts.position]);
		}else{
			if($('.tip-container').length == 0){
				$("body").append('<div class="tip-container"></div>');
				$(".tip-container").css(pos[opts.position]);
			}
			$('.tip-container').prepend($tip);
		}
		setTimeout(function(){$tip.addClass('current');},0);
		
		var showTime = setInterval(function(){
			if (T >1) {
				T--;
			} else {
				clearInterval(showTime);
				T = opts.keep;
				$tip.removeClass('current');
				setTimeout(function(){
					$tip.remove();
					if($(".tip-container").children().length == 0){
						$(".tip-container").remove();
					}
					opts.callBack ? opts.callBack() : null;
				},300);
			}
		}, 1000);

	}
})(jQuery);
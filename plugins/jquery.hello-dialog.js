; (function($, window, undefined) {
	$.helloPlug.prototype.dialog = function(param){
		var defaults = {
			type:'msg',
			title:'hello-ui dialog',
			width:500,
			height:500,
			draggable:true,
			msg:'老司机！',
			url:'http://www.baidu.com',
			async:false,
			method:'post',
			loadBeforeText:'内容加载中，请稍后...',
			cancelBtnTxt:'关闭',
			confirmBtnTxt:'确定',
			confirmFn:function(){
				alert("点击确定");
			},
			cancelFn:function(){
				alert("点击取消");
			}
		},
		opts = $.extend({},defaults, param);
		
		function display(msg) {
			 var html =   '<div class="hello-dialog">'+
								   '<div class="title"><span>' + opts.title + '</span></div>'+
								   '<div class="container">' + msg + '</div>'+
								   '<div class="btng">'+
								   '<a href="javascript:;" class="btns firm">' + opts.confirmBtnTxt + '</a>'+
								   '<a href="javascript:;" class="btns cancel">' + opts.cancelBtnTxt + '</a></div>'+
								   '</div> '+
								   '<div class="hello-dialogMark"></div> ';
			$('body').append(html);
			$('.hello-dialog').css({
				'width': param.width + 'px',
				'height': param.height || 'auto',
				'margin-left': -(param.width / 2) + 'px',
				'margin-top': -($('.hello-dialog').outerHeight() / 2) + 'px'
			});
		}

		function callBack(){
			$(".hello-dialog .firm").on('click',function(){
				if(opts.confirmFn){
					opts.confirmFn();
				};
				close();
			})
			$(".hello-dialog .cancel").on('click',function(){
				if(opts.cancelFn){
					opts.cancelFn();
				}
				close();
			})
		};
	
		function drag() {
			var $this = $('.hello-dialog'),$width = $(window).width(),$height = $(window).height();
			$this.find('.title').mousedown(function(e) {
				var winPosX = e.pageX - $this.offset().left;
				var winPosY = e.pageY - $this.offset().top + $(window).scrollTop();
				$(window).bind('mousemove',function(e) {
					$this.css({
						'top': e.pageY - winPosY,
						'left': e.pageX - winPosX,
						'margin': 0
					});
					if ($this.offset().left > $width - $this.width()) {
						$this.offset({'left': $width - $this.width()});
					}
					if ($this.offset().left < 0) {
						$this.offset({'left': 0});
					}
					if ($this.offset().top > $height - $this.height()) {
						$this.offset({'top': $height - $this.height()});
					}
					if ($this.offset().top < 0) {
						$this.offset({'top': 0});
					}
				});
			}).mouseup(function() {
				$(window).unbind("mousemove");
			});
		}

		function close(){
			$(".hello-dialog").remove();
			$(".hello-dialogMark").remove();
		}

		if(opts.type === 'msg'){
			 display(opts.msg);
			 $(".hello-dialog .cancel").remove();
			 callBack();
		}
		if(opts.type === 'confirm'){
			 display(opts.msg);
			 callBack();
		}
		if(opts.type === 'loader'){
			$.ajax({
				type: opts.method,
				dataType: 'html',
				cache: false,
				timeout: 10000,
				url: opts.url,
				async: opts.async,
				beforeSend: function() {
					display(opts.loadBeforeText);
				},
				success: function(response) {
					$('.hello-dialog').find('.container').html(response);
				},
				error: function() {
					$('.hello-dialog').find('.container').html('读取数据失败');
				}
			});
			callBack(); 
		}
		if(opts.type === 'page'){
			display();
			$('.hello-dialog').find(".btns").remove();
			$('.hello-dialog').find('.title').prepend('<i class="btns close">关闭</i><i class="btns full">全屏</i>');
			var height = param.height - $('.hello-dialog').find(".title").innerHeight();
			$('.hello-dialog').find('.container').css({
				height: height
			});
			$('.hello-dialog').find('.container').html('<iframe src="' + param.url + '"></iframe>');
			$('.hello-dialog').css({
				'margin-top': -($('.hello-dialog').innerHeight() / 2) + 'px'
			});

			$('.hello-dialog').find(".close").bind("click",function() {
				close();
			});

			$('.hello-dialog').find(".full").bind("click",function() {
				if ($('.hello-dialog').hasClass("full")) {
					$('.hello-dialog').removeClass("full");
					var height = param.height - $('.hello-dialog').find(".title").innerHeight();
					$('.hello-dialog').find('.container').css({
						height: height
					});
					$('.hello-dialog').css({
						'margin-top': -($('.hello-dialog').innerHeight() / 2) + 'px',
						'margin-left': -(param.width / 2) + 'px',
						'top': '50%',
						'left': '50%'
					});
					$("body").css("overflow-y", "auto");
				} else {
					$('.hello-dialog').addClass("full");
					var height = $(window).height() - $('.hello-dialog').find(".title").innerHeight();
					$('.hello-dialog').find('.cont').css({
						height: height
					});
					$("body").css("overflow", "hidden");
				}
			}); 
		}
		if(opts.draggable){
		  drag();
		}
	}
})(jQuery, window);
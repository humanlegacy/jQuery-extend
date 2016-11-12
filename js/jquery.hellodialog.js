function html(param){
		var html ='';
		var title = param.title || 'HelloDialog';
		var cont = param.msg || 'HelloDialog到此一游!';
		var firmBtn = param.firmBtn || '确定';
		var cancelBtn = param.cancelBtn || '取消';
		html +='<div class="hello-dialog">';
		html +='<div class="title"><span>'+title+'</span></div>';
		html +='<div class="container">'+cont+'</div>';
		html +='<div class="btng"><a href="javascript:;" class="btns firm">'+firmBtn+'</a><a href="javascript:;" class="btns cancel">'+cancelBtn+'</a></div>';
		html +='</div> ';
		html +='<div class="hello-dialogMark"></div> ';
		$('body').append(html);
		$('.hello-dialog').css({
			'width':param.width+'px',
			'height':param.height || 'auto',
			'margin-left':-(param.width/2)+'px',
			'margin-top':-($('.hello-dialog').innerHeight()/2)+'px'
		});														
}

function drag(){
		    var self = $('.hello-dialog');
			self.find('.title').mousedown(function(e) {
				var winPosX = e.pageX - self.offset().left;
				var winPosY = e.pageY - self.offset().top + $(window).scrollTop();
				$(window).bind('mousemove',function(e) {
					self.css({'top': e.pageY - winPosY,'left': e.pageX - winPosX,'margin':0});
					if (self.offset().left > $(window).width() - self.width()) {
						self.offset({'left': $(window).width() - self.width()});
					}
					if (self.offset().left < 0) {
						self.offset({'left': 0});
					}
					if (self.offset().top > $(window).height() - self.height()) {
						self.offset({'top': $(window).height() - self.height()});
					}
					if (self.offset().top < 0) {
						self.offset({'top': 0});
					}
				});
			}).mouseup(function() {
				$(window).unbind("mousemove");
			});
	}



var Hello = {
	common:function(){
		return $('.hello-dialog,.hello-dialogMark').remove();
	},
	msg:function(param){
		html(param);
		drag();
		$('.hello-dialog .cancel').hide();
		$('.hello-dialog').find(".firm").bind("click",function(){
			Hello.common();
		});
	},
	confirm:function(param){
		Hello.msg(param);
        $('.hello-dialog .cancel').show();
		$('.hello-dialog').find(".firm").bind("click",function(){
			Hello.common();
			if(param.confirmFn){
				param.confirmFn();
			}
		});
		
		$('.hello-dialog').find(".cancel").bind("click",function(){
			Hello.common();
			if(param.cancelFn){
				param.cancelFn();
			}
		});
	},
	load:function(param){
		Hello.msg(param);
		$('.hello-dialog').css({'height':param.height});
		$('.hello-dialog').find('.container').css({'text-align':'left','scroll-y':'auto'});
		$.ajax({
			type:'GET',
			dataType: 'html',
			cache: false,
			timeout:10000,
			url: param.url,
			async: param.async,
			beforeSend	: function(response){
				$('.hello-dialog').find('.container').html('内容加载中，请稍后...');
			},
			success: function(response){
				$('.hello-dialog').find('.container').html(response);
			},
			error: function(response){
				$('.hello-dialog').find('.container').html('读取数据失败');
			}
		});
	},
	page:function(param){
		Hello.msg(param);
		$('.hello-dialog').find(".btns").remove();
		$('.hello-dialog').find('.title').prepend('<i class="btns close">关闭</i><i class="btns full">全屏</i>');
		var height = param.height - $('.hello-dialog').find(".title").innerHeight();
		$('.hello-dialog').find('.container').css({height:height});
		$('.hello-dialog').find('.container').html('<iframe src="'+param.url+'"></iframe>');
		$('.hello-dialog').css({'margin-top':-($('.hello-dialog').innerHeight()/2)+'px'});
		
		$('.hello-dialog').find(".close").bind("click",function(){
			Hello.common();
		});
		
		$('.hello-dialog').find(".full").bind("click",function(){
			if($('.hello-dialog').hasClass("full")){
				$('.hello-dialog').removeClass("full");
					var height = param.height - $('.hello-dialog').find(".title").innerHeight();
					$('.hello-dialog').find('.container').css({height:height});
					$('.hello-dialog').css({'margin-top':-($('.hello-dialog').innerHeight()/2)+'px','margin-left':-(param.width/2)+'px','top':'50%','left':'50%'});
					$("body").css("overflow-y","auto");
			}else{
					$('.hello-dialog').addClass("full");
					var height = $(window).height() - $('.hello-dialog').find(".title").innerHeight();
					$('.hello-dialog').find('.cont').css({height:height});
					$("body").css("overflow","hidden");
			}

		});
	}
	
	
	
	
}


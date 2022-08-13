;(function($,window,document,undefined) {
	"use strict";
	$.helloExtend.prototype.dialog = function(param){
		var defaults = {
			type:'tip',     		//loader page tip		
			width:230,
			height:'auto',
			draggable:true,
			position:'center',
			scene:'success',
			time:5,
			title:'消息来自 hello-ui.com',
			//content:'http://hello/index/dialog_load.html',
			content:'http://www.hello-ui.com',
			async:false,
			method:'post',
			beforeSend:'内容加载中，请稍后...',
			autoClose:true,
			showBtn:false,
			trueBtn:'确定',
			falseBtn:'取消',
			callBack:function(res){
				if(res){
					console.log("确定")
				}else{
					console.log("取消")
				}
			}
		},
		icon = {
		   default:'<i class="icon-bullhorn"></i>',
		   success:'<i class="icon-ok-sign"></i>',
		   error:'<i class="icon-remove-sign"></i>',
		   warning:'<i class="icon-warning-sign"></i>',
		   info:'<i class="icon-info-sign"></i>'
		},
		opts = $.extend({},defaults, param),
		life = opts.time,
		$dialog = null,
	    showTime = null;
		
		//创建容器
		function createDom(icon){
			var html = '';
			html += '<div class="hello-dialog '+opts.scene+'">';
			html += '<div class="hello-dialog-wrap">';
			if(opts.type === 'tip'){
				html += '<div class="hello-dialog-body">';
				html += '<table border="0" cellpadding="0" cellspacing="0">';
				html += '<tbody>';
				html += '<tr>';
				html += '<td>'+icon[opts.scene]+'</td>';
				html += '<td>';
				if(opts.title !== false){
					html += '<div class="hello-dialog-title">' + opts.title + '</div>';
				}
				html += '<div class="hello-dialog-content">'+ opts.content +'</div>';
				html += '</td>';
				html += '</tr>';
				html += '</tbody>';
				html += '</table>';
				html += '</div>';
			}else{
				html += '<div class="hello-dialog-header">';
				html += '<span class="title"><i class="icon-globe"></i> ' + opts.title + '</span>';
				if(opts.type === 'page'){
					html += '<span class="dialog-event-btn" title="关闭" data-event="close"><i class="icon-remove"></i></span>';
					html += '<span class="dialog-event-btn" title="全屏/窗口" data-event="fullscreen"><i class="icon-resize-full"></i></span>';
				}
				html += '</div>';
				html += '<div class="hello-dialog-body">';
				html += '</div>';
			}
			if(opts.showBtn !== false){
				html += '<div class="hello-dialog-footer">';
				if(opts.trueBtn !== false){
					html += '<span class="hello-dialog-btn dialog-event-btn" data-event="true">'+opts.trueBtn+'</span>';
				}
				if(opts.falseBtn !== false){
					html += '<span class="hello-dialog-btn dialog-event-btn" data-event="false">'+opts.falseBtn+'</span>';
				}
				html += '</div>';
			}
			html += '</div>';
			html += '</div>';
			return $(html);
		};
		
		//计算尺寸和位置
		function count(){
			$dialog.css({width:opts.width,height:opts.height});
			var dialogLeft  = ( $(window).width() - $dialog.outerWidth() ) / 2,
					dialogTop  = ( $(window).height() - $dialog.outerHeight() ) / 2;
                $dialog.css({'left':dialogLeft,'top':dialogTop});

		};

		//载入内容
		function showDialog(){
			if($('.hello-dialog-layout').length == 0){
				$("body").append('<div class="hello-dialog-layout"></div>');
			}else{
				$(".hello-dialog-layout").children(':not(.current)').remove();
			}
			$dialog = createDom(icon);
			$('.hello-dialog-layout').prepend($dialog);
			if(opts.type === 'loader'){
				loader();
			}
			if(opts.type === 'page'){
				page();
			}
			count();
			//显示窗口
			$dialog.addClass('current');
			//是否支持拖拽
			if(opts.draggable){
				$.hello('_drag',{
					target:$dialog,
					trigger:'.hello-dialog-header',
					startCallBack:function(){
						$('.hello-dialog').addClass('no-transition');
					},
					endCallBack:function(){
						$('.hello-dialog').removeClass('no-transition');
					}
				});
			};
			//设置窗口关闭倒计时
			if(opts.autoClose){
				showTime = setInterval(killTime, 1000);
			}
		};
		//关闭窗口
		function close(){
			hideLayout();
			$dialog.removeClass('current');
			if(opts.autoClose){
				clearInterval(showTime);
			}
		};
		//关闭窗口倒计时
		function killTime(){
			life>=1 ? life -- : close();
		}
		

		//异步加载内容到窗口
		function loader(){
			$dialog.addClass('dialog-page');
			$.ajax({
				type: opts.method,
				dataType: 'html',
				cache: false,
				timeout: 10000,
				url: opts.content,
				async: opts.async,
				beforeSend: function() {
					showLayout();
					$(".hello-dialog-body").html(opts.beforeSend);
				},
				success: function(res) {
					$(".hello-dialog-body").html(res);
				},
				error: function() {
					$(".hello-dialog-body").html('读取数据失败');
				}
			});
		};
		//从iframe中打开内容
		function page(){
			showLayout();
			$dialog.addClass('dialog-page');
			$(".hello-dialog-body").html('<iframe src="' + opts.content + '"></iframe>');
		}
		
		//窗口按钮点击事件
		$(document).off().on('click','.dialog-event-btn',function(){
			var btnEvent = $(this).data('event');
			if(btnEvent === true || btnEvent === false){
				if(opts.callBack){
					opts.callBack(btnEvent);
				};
				close();
			};
			if(btnEvent === 'close'){
				close();
			};
			if(btnEvent === 'fullscreen'){
				$dialog.toggleClass("fullscreen-toggle");
			};
		});
		
		//显示遮罩
		function showLayout(){
			$("body").css({"overflow":"hidden"});
			$(".hello-dialog-layout").addClass("current");
		}
		//隐藏遮罩
		function hideLayout(){
			$("body").css({"overflow":"auto"});
			$(".hello-dialog-layout").removeClass("current");
		}
		
		showDialog();
	};
})(jQuery,window,document);
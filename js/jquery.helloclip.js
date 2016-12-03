;(function($, window, undefined) {
	function Clip(ele, opts) {
		this.defaults = {
			width:150,
			height:150,
			saveFileName : Date.parse(new Date()) + '.png',
			uploadUrl:"#",
			uploadType:'get',
			formChange:function(){
				alert("上传图片！");
				$(".hello-clip-wrap").prepend("<img src='css/img/hello-clip.jpg' />"); //插入带裁剪图片元素
				$(".helloClip-path").val("css/img/hello-clip.jpg"); //上传后返回的服务器图片地址，等待裁剪
			}
		};
		this.opts = $.extend({},this.defaults, opts);
        this.ele = $(ele);
		this.imgLeft = 0;
		this.imgTop = 0;
		this.imgWidth = 0;
		this.imgHeight = 0;
		this.pre = 1;
		this.canvasID = "hello-clip-" + Date.parse(new Date());
	}
	Clip.prototype = {
		display:function(self){
			var html = '<form action="'+this.opts.uploadUrl+'" enctype="multipart/form-data" method="'+this.opts.uploadType+'">'+
							'<span>点击上传图片</span>'+
							'<input type="file" name="helloClipPic" class="helloClipPic" />'+
							'</form><canvas id="'+this.canvasID+'"></canvas>'+
							'<input type="hidden" name="helloClip-path" class="helloClip-path" value="css/img/hello-clip.jpg"/>';
			$(this.ele).css({
				"width":self.opts.width,
				"height":self.opts.height,
				"line-height":self.opts.height+'px'
			}).append(html);
		},
		loadImg:function(self){
			$(self.ele).find('img').load(function(){
				$(this).css({
					left:-($(this).width() - self.opts.width) / 2,
					top:-($(this).height() - self.opts.height) / 2
				});
				self.imgLeft = -($(self.ele).find('img').width() - self.opts.width) / 2;
				self.imgTop = -($(self.ele).find('img').height() - self.opts.height) / 2;
				self.imgWidth = $(self.ele).find('img').width();
				self.imgHeight = $(self.ele).find('img').height();
				
				$(self.ele).find("form").hide();
				
				self.move(self);
				self.scale(self);
			});
		},
		sync:function(){
			this.imgLeft = parseInt($(this.ele).find('img').css("left"));
			this.imgTop = parseInt($(this.ele).find('img').css("top"));
		},
		move:function(self){
			$(self.ele).find('img').on("mousedown",function(e){
				e.preventDefault();
				var downLeft = e.clientX - self.ele.offset().left ,downTop = e.clientY - self.ele.offset().top;
				$(self.ele).on("mousemove",function(e){
					$(self.ele).find("img").css({
						left :  (e.clientX - self.ele.offset().left) - downLeft + self.imgLeft ,
						top :  (e.clientY - self.ele.offset().top) - downTop + self.imgTop
					});
				});
				$(self.ele).on("mouseup mouseleave",function(e){
					$(this).off("mousemove");
					self.sync();
				});
			}); 	
		},
		scale:function(self){
			var scale = $(".hello-clip-scale") , bar = $(".hello-clip-scale-bar") , preLeft = 0 , preTop = 0;
			bar.css({left:(scale.width() - bar.width()) /2});
			bar.bind("mousedown",function(e){
				preLeft = Math.abs((self.imgWidth * self.pre - self.opts.width) / self.imgLeft );
				preTop = Math.abs((self.imgHeight * self.pre - self.opts.height)  / self.imgTop);
				var left = e.clientX - bar.offset().left;
				$(".hello-clip-tools-wrap").bind("mousemove",function(e){
					if(e.clientX <= scale.offset().left + left){
					   bar.css({left : 0});
					}else if(e.clientX >= scale.offset().left + scale.width() - (bar.width()-left )){
					   bar.css({left : scale.width() - bar.width() });
					}else{
					   bar.css({left :  e.clientX - scale.offset().left - left  });
					}
					self.pre =  parseInt(bar.css("left")) / ((scale.width() - bar.width()) /2) ;
					$(self.ele).find("img").css({
						width : self.imgWidth * self.pre,
						height : self.imgHeight * self.pre,
						left : - (self.imgWidth * self.pre - self.opts.width) / preLeft,
						top : - (self.imgHeight * self.pre - self.opts.height) / preTop
					});
				});
				$(".hello-clip-tools-wrap").bind("mouseup",function(e){
					$(this).unbind("mousemove");
					self.sync();
				});
			});
		},
		delete:function(self){
			$(".hello-clip-delete").click(function(){
				$(self.ele).find('img').remove();
				$(self.ele).find("form").show();
			});
		},
		formChange:function(self){
			$(".helloClipPic").change(function(){
				if(self.opts.formChange){
					self.opts.formChange();
					self.loadImg(self);
				}
			});
		},
		save:function(self){
			$(".hello-clip-save").click(function(){
				var canvas = document.getElementById(self.canvasID),ctx = canvas.getContext("2d");
					   canvas.width = self.opts.width;
					   canvas.height = self.opts.height;   

				var img = new Image();
					img.src = $(".helloClip-path").val();
					img.onload=function(){
						var scalepre = 1/self.pre;
						var scw = self.imgWidth * scalepre;
						var sch = self.imgHeight * scalepre;
						var scl = self.imgLeft* scalepre;
						var scr = self.imgTop* scalepre;
						ctx.drawImage(img,-scl,-scr,scw,sch,0,0,self.imgWidth,self.imgHeight);
											
						var fileName =  self.opts.saveFileName;			
						var data = document.createElement("a");
						      data.href= canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");   
						self.saveFile(data, fileName);
					};
			});
		},
		saveFile:function(data, fileName){
			var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			link.href= data.href;
			link.download = fileName;
			link.width = data.width;
			link.height = data.height;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			link.dispatchEvent(event);
		},
		init:function(){
			var self = this;
			this.display(self);
			this.loadImg(self);
			this.save(self);
			this.delete(self);
			this.formChange(self);
		}
	}     

	$.fn.helloClip = function(opts) {
		var fn = new Clip(this, opts);
		return fn.init();
	}
})(jQuery, window); 
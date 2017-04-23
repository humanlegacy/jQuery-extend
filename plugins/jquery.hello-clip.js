; (function($, window, undefined) {
	$.helloExtend.prototype.clip = function(param){
		var defaults = {
			ele:'.hello-clip',
			width: 150,
			height: 150,
			saveFileName: $.hello('getString',5) + '.png',
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
		$img = $this.find('img'),
		imgLeft = 0,
		imgTop = 0,
		imgWidth = 0,
		imgHeight = 0,
		pre = 1,
		canvasID = "hello-clip-" + $.hello('getString',5);
		
		function display() {
			var html = '<span>点击上传图片</span>' + '<input type="file" name="helloClipPic" class="helloClipPic" />' + 
			'<canvas id="' + canvasID + '"></canvas>' + 
			'<input type="hidden" value="" name="helloClip-path" class="helloClip-path"/>';
			$this.css({
				"width": opts.width,
				"height": opts.height,
				"line-height": opts.height + 'px'
			}).append(html);
		}
		function size() {
			$img.css({
				left: -(imgWidth - opts.width) / 2,
				top: -(imgHeight - opts.height) / 2
			});
			imgLeft = -(imgWidth - opts.width) / 2;
			imgTop = -(imgHeight - opts.height) / 2;
		}
		function sync() {
			imgLeft = parseInt($img.css("left"));
			imgTop = parseInt($img.css("top"));
		}
		function move() {
			$img.on("mousedown",function(e) {
				e.preventDefault();
				var downLeft = e.clientX - $this.offset().left,
				downTop = e.clientY - $this.offset().top;
				$this.on("mousemove",function(e) {
					$this.find("img").css({
						left: (e.clientX - $this.offset().left) - downLeft + imgLeft,
						top: (e.clientY - $this.offset().top) - downTop + imgTop
					});
				});
				$this.on("mouseup mouseleave",function(e) {
					$(this).off("mousemove");
					sync();
				});
			});
		}
		function scale() {
			var scale = $(".hello-clip-scale"),
					bar = $(".hello-clip-scale-bar"),
					preLeft = 0,
					preTop = 0;
			bar.css({
				left: (scale.width() - bar.width()) / 2
			});
			bar.bind("mousedown",function(e) {
				preLeft = Math.abs((imgWidth * pre - opts.width) / imgLeft);
				preTop = Math.abs((imgHeight * pre - opts.height) / imgTop);
				var left = e.clientX - bar.offset().left;
				$(".hello-clip-tools-wrap").bind("mousemove",function(e) {
					if (e.clientX <= scale.offset().left + left) {
						bar.css({
							left: 0
						});
					} else if (e.clientX >= scale.offset().left + scale.width() - (bar.width() - left)) {
						bar.css({
							left: scale.width() - bar.width()
						});
					} else {
						bar.css({
							left: e.clientX - scale.offset().left - left
						});
					}
					pre = parseInt(bar.css("left")) / ((scale.width() - bar.width()) / 2);
					$img.css({
						width: imgWidth * pre,
						height: imgHeight * pre,
						left: -(imgWidth * pre - opts.width) / preLeft,
						top: -(imgHeight * pre - opts.height) / preTop
					});
				});
				$(".hello-clip-tools-wrap").bind("mouseup",function(e) {
					$(this).unbind("mousemove");
					sync();
				});
			});
		}
		function deleteImg() {
			$(".hello-clip-delete").click(function() {
				$img.remove();
				$this.find("input[type=file]").show();
			});
		}
		function formChange() {
			$(".helloClipPic").change(function() {
					var file = this.files[0];
					if(window.FileReader) {  
						var img = new FileReader();  
						img.onloadend = function(e) {  
							data = e.target.result;  
							$this.prepend("<img src='"+data+"' />");
							$this.find("input[type=file]").hide();
							$img = $this.find('img');
							imgWidth = $img.width();
							imgHeight = $img.height();
							size();
							move();
						};  
						img.readAsDataURL(file);  
						
					}else{
						alert('您的浏览器版不支持window.FileReader');
					}  
			});
		}
		function save() {
			$(".hello-clip-save").click(function() {
				var canvas = document.getElementById(canvasID),
				ctx = canvas.getContext("2d");
				canvas.width = opts.width;
				canvas.height = opts.height;

				var img = new Image();
				img.src = $img.attr('src');
				img.onload = function() {
					var scalepre = 1 / pre;
					var scw = imgWidth * scalepre;
					var sch = imgHeight * scalepre;
					var scl = imgLeft * scalepre;
					var scr = imgTop * scalepre;
					ctx.drawImage(img, -scl, -scr, scw, sch, 0, 0, imgWidth, imgHeight);
					var fileName = opts.saveFileName;
					var data = document.createElement("a");
					data.href = canvas.toDataURL("image/png");
					saveFile(data, fileName);
				};
			});
		}
		function saveFile(data, fileName) {
			var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			link.href = data.href;
			link.download = fileName;
			link.width = data.width;
			link.height = data.height;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			link.dispatchEvent(event);
		}
		display();
		size();
		formChange();
		scale();
		save();
		deleteImg();
		
	}
})(jQuery, window);
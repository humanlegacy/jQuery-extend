; (function($, window, undefined) {
	$.helloPlug.prototype.clip = function(param){
		var defaults = {
			ele:'.demo',
			width: 150,
			height: 150,
			saveFileName: $.hello('randomStr',5) + '.png',
			uploadUrl: "upload.php",
			uploadType: 'post',
			formChange: function() {
				alert("上传图片！");
				$(".hello-clip-wrap").prepend("<img src='img/hello-clip.jpg' />"); //插入等待裁剪图片元素
				$(".helloClip-path").val("hello-ui/img/hello-clip.jpg"); //上传后返回的服务器图片地址，等待裁剪
			}
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
		imgLeft = 0,
		imgTop = 0,
		imgWidth = 0,
		imgHeight = 0,
		pre = 1,
		canvasID = "hello-clip-" + $.hello('randomStr',5);
		
		function display() {
			var html = '<form action="' + opts.uploadUrl + '" enctype="multipart/form-data" method="' + opts.uploadType + '">' + '<span>点击上传图片</span>' + '<input type="file" name="helloClipPic" class="helloClipPic" />' + '</form><canvas id="' + canvasID + '"></canvas>' + '<input type="hidden" name="helloClip-path" class="helloClip-path" value="img/hello-clip.jpg"/>';
			$this.css({
				"width": opts.width,
				"height": opts.height,
				"line-height": opts.height + 'px'
			}).append(html);
		}
		function loadImg() {
			$this.find('img').load(function() {
				$(this).css({
					left: -($(this).width() - opts.width) / 2,
					top: -($(this).height() - opts.height) / 2
				});
				imgLeft = -($this.find('img').width() - opts.width) / 2;
				imgTop = -($this.find('img').height() - opts.height) / 2;
				imgWidth = $this.find('img').width();
				imgHeight = $this.find('img').height();
				$this.find("form").hide();
				move();
				scale();
			});
		}
		function sync() {
			imgLeft = parseInt($this.find('img').css("left"));
			imgTop = parseInt($this.find('img').css("top"));
		}
		function move() {
			$this.find('img').on("mousedown",function(e) {
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
					$this.find("img").css({
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
				$this.find('img').remove();
				$this.find("form").show();
			});
		}
		function formChange() {
			$(".helloClipPic").change(function() {
				if (opts.formChange) {
					opts.formChange();
					loadImg();
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
				img.src = $(".helloClip-path").val();
				img.onload = function() {
					var scalepre = 1 / pre;
					var scw = imgWidth * scalepre;
					var sch = imgHeight * scalepre;
					var scl = imgLeft * scalepre;
					var scr = imgTop * scalepre;
					ctx.drawImage(img, -scl, -scr, scw, sch, 0, 0, imgWidth, imgHeight);
					var fileName = opts.saveFileName;
					var data = document.createElement("a");
					data.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
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
		loadImg();
		save();
		deleteImg();
		formChange();
	}
})(jQuery, window);
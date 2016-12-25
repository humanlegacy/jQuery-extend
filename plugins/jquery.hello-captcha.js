;(function($) {
	$.helloPlug.prototype.captcha = function(param){
		var defaults = {
			ele:'.hello-captcha',
			width:70,
			height: 25,
			codeSize:4,
			fontColor:'random', 
			font:'25px arial',
			bgLines:[5,8]
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
		code = $.hello('randomStr',opts.codeSize);
		
		function createCanvas(){
			var canvasID = 'hello-captcha-' + ($.hello('randomStr',1)).toString(16),
					canvasTag = '<canvas id="'+canvasID+'"></canvas>';
			$this.append(canvasTag);
			var canvas = document.getElementById(canvasID);
			canvas.width = opts.width;
			canvas.height = opts.height;
			return canvas;
		}
		
		function fontColor (){
			if(opts.fontColor === 'random'){
				return $.hello('randomColor');
			}else{
				return opts.fontColor;
			}
		}
		
		function background(content){
			content.lineWidth = 1;
			for(var i = 0;i< $.hello('random',opts.bgLines);i++){
				content.strokeStyle = $.hello('randomColor');
				content.beginPath();
				content.moveTo($.hello('random',[0,opts.width]),$.hello('random',[0,opts.height]));
				content.lineTo($.hello('random',[0,opts.width]),$.hello('random',[0,opts.height]));
				content.stroke();
			}
			
		}
		
		function drawCanvas(){
			var canvas = createCanvas(),content = canvas.getContext('2d');
			background(content);
			content.font = opts.font;
			content.fillStyle = fontColor ();
			content.textAlign = 'center';
			content.textBaseline = 'middle';
			content.fillText(code, opts.width/2, opts.height/2);
		}
		
		drawCanvas();
		return code;
	}
})(jQuery);
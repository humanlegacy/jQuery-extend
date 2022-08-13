;(function($) {
    "use strict";
	$.helloExtend.prototype.captcha = function(param){
		var defaults = {
			ele:'.class',
            type:'string', // ['+','-','*']
            range:[1,9],
			width:70,
			height: 28,
			codeSize:4,
			fontColor:'random', 
			font:'25px arial',
			line:[5,8]
		},
		opts = $.extend({},defaults, param),
		$this = $(opts.ele),
        code = null,
        returnCode = null;    
		
		function createCanvas(){
			var canvasID = 'hello-captcha-' + ($.hello('getString',3)).toString(16),
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
		
		function createLine(_canvas){
			_canvas.lineWidth = 1;
			for(var i = 0;i< $.hello('random',opts.line);i++){
				_canvas.strokeStyle = $.hello('randomColor');
				_canvas.beginPath();
				_canvas.moveTo($.hello('random',[0,opts.width]),$.hello('random',[0,opts.height]));
				_canvas.lineTo($.hello('random',[0,opts.width]),$.hello('random',[0,opts.height]));
				_canvas.stroke();
			}
		}

        function createCode(){
            if(opts.type === 'string'){
                code = $.hello('getString',opts.codeSize);
                returnCode = code;
            }else{
                var SUB = $.hello('random',opts.range),
                      SUM = $.hello('randomArray',opts.type),
                      MIN  = $.hello('random',opts.range);
                returnCode = eval(SUB + SUM + MIN);
                code = SUB + (SUM == '*' ? 'x' : SUM) + MIN;
            }
        }
        
		function drawCanvas(){
			var canvas = createCanvas(),
                _canvas = canvas.getContext('2d');
			createLine(_canvas);
			_canvas.font = opts.font;
			_canvas.fillStyle = fontColor ();
			_canvas.textAlign = 'center';
			_canvas.textBaseline = 'middle';
            var returnCode = createCode();
            _canvas.fillText(code, opts.width/2, opts.height/2);
		}
        
		drawCanvas();
        return returnCode;
	}
    
})(jQuery);
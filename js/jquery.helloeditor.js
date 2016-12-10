(function(window,document,undefined){
    if ("undefined" == typeof jQuery) throw new Error("Froala requires jQuery");
   function helloEditor(ele,opts){
        this.defaults = {
            width:700,
            height:350,
            tools:[
			'bold','italic','underline','strikethrough','indent','outdent',
			'JustifyLeft','JustifyCenter','JustifyRight','JustifyFull',
			'InsertOrderedList','InsertUnorderedList',
			]
        };
        this.opts = $.extend({},this.defaults, opts);
        this.ele = $(ele),this.container = null,this.textarea = null,this.tools = null;
		this.select = ['FontName','FontSize','ForeColor'];
        this.menu = {
            FontName:['Arial','Verdana','Tahoma','Impact'],
            FontSize:['1','2','3','4','5','6','7'],
            ForeColor:['red','green','blue','#ccc','#288ce2','#fab008']
        };
    }
    helloEditor.prototype = {
        userSelection:function(){
            return document.selection || window.getSelection();
        },
        getRange:function(){
            var sel = userSelection(), rng;
            if (sel.rangeCount > 0) {
                rng = sel.getRangeAt(0);
            } else {
                rng = sel.createRange();
            }
            return rng;   
        },
        display:function(){
            this.ele.wrapInner('<div class="hello-editor-wrap"></div>');
            this.ele.find('.hello-editor-wrap').wrapInner('<div class="hello-editor-container" contenteditable="true" spellcheck="false" data-placeholder="请输入内容"></div>');
            this.ele.find('.hello-editor-wrap').append('<textarea class="hello-editor-textarea" spellcheck="false"></textarea>');
            this.ele.prepend('<div class="hello-editor-tools"></div>');
            this.container =  this.ele.find('.hello-editor-container');
            this.textarea =  this.ele.find('.hello-editor-textarea');
            this.tools =  this.ele.find('.hello-editor-tools');
			this.displaySize();
			this.createbtn();
        },
		displaySize:function(){
            this.ele.css({width : this.opts.width,height : this.opts.height });
            this.ele.find('.hello-editor-wrap').css({height : this.opts.height - this.tools.height()});
            this.container.css({height : this.opts.height - this.tools.height()-10});	
		},
		createbtn:function(){
            for(s in this.select){
				this.addButton(this.select[s],'menu');				
			}
            for(i in this.opts.tools){
				if(this.select.indexOf(this.opts.tools[i]) <0){
					this.addButton(this.opts.tools[i]);
				}					
			}
			this.addButton('code','custom');
			this.addButton('fullscreen','custom');	
		},
		addButton:function(arr,type='exec'){
			this.ele.find('.hello-editor-tools').append('<div class="hello-editor-btn"><button data-tools="'+arr+'" data-type="'+type+'"><i class="icon-'+arr+'"></i></button></div>'); 
		},
        sync:function(self){
			this.textarea.is(":visible") ? this.container.html(this.textarea.val()) : this.textarea.val($.trim(this.container.html()));
        },
		extend:function(self){
			var extendFunction = {
				fullscreen:function(){
					self.ele.toggleClass('fullscreen');
					if(self.ele.hasClass('fullscreen')){
						self.ele.removeAttr('style');
						self.ele.find('.hello-editor-wrap').css({height : self.ele.height() - self.tools.height()});
						self.container.css({height : self.ele.height() - self.tools.height()-10});
					}else{
						self.displaySize();
					}
				},
				code:function($self){
					self.sync();
					$self.toggleClass('current');
					$self.parent().siblings().find('button').toggleClass('disabled');
					self.ele.toggleClass('code');
					if(self.ele.hasClass('code')){
						$self.parent().siblings().find('button').attr('disabled',true);
					}else{
						$self.parent().siblings().find('button').attr('disabled',false);
					}
				}
			}
			return extendFunction;
		},
        init:function(){
            var self = this;
            this.display();
            this.sync(self);
			
			this.tools.find('button').bind('click',function(){
				var tools = $(this).data('tools' ), type = $(this).data('type'),$self = $(this);
				if(type == 'exec'){
					document.execCommand(tools);
				}else if(type == 'custom'){
					var extendFunction = self.extend(self);
					extendFunction[tools]($self);
				}
			});
			

			
        }
    };
	$.fn.helloEditor = function(opts) {
		var fn = new helloEditor(this, opts);
		return fn.init();
	} 
})(window,document)
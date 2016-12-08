(function(window,document,undefined){
    if ("undefined" == typeof jQuery) throw new Error("Froala requires jQuery");
   function helloEditor(ele,opts){
        this.defaults = {
            width:700,
            height:350,
            tools:[
			'code','bold','italic','underline','strikethrough','indent','outdent',
			'JustifyLeft','JustifyCenter','JustifyRight','JustifyFull',
			'InsertOrderedList','InsertUnorderedList',
			]
        };
        this.opts = $.extend({},this.defaults, opts);
        this.ele = $(ele);
        this.container = null;
        this.textarea = null;
        this.tools = null;
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
            this.ele.css({width : this.opts.width });
            this.ele.find('.hello-editor-container').css({height : this.opts.height + 'px'});
            for(k in this.opts.tools){
               this.ele.find('.hello-editor-tools').append('<button data-tools="'+this.opts.tools[k]+'"><i class="icon-'+this.opts.tools[k]+'"></i></button>');
            }
        },
        sync:function(){
			this.textarea.is(":visible") ? this.container.html(this.textarea.val()) : this.textarea.val($.trim(this.container.html()));
        },
        toggleCode:function(){
            this.sync();
            this.textarea.toggleClass('current');
        },
        eventFun:function(tType){
			if(!document.execCommand(tType)){
				if(tType == 'code'){
					this.toggleCode();
				}
			}
            //document.execCommand('InsertHorizontalRule');
            //document.execCommand(tType);
        },
        event:function(self){
			this.tools.find('button').bind('click',function(e){
				var tType = $(this).data('tools');
				self.eventFun(tType);
			});
        },
        init:function(){
            var self = this;
            this.display();
            this.sync();
            this.event(self);
        }
    };
	$.fn.helloEditor = function(opts) {
		var fn = new helloEditor(this, opts);
		return fn.init();
	} 
})(window,document)















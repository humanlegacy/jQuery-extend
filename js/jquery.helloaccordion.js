; (function($, window, document, undefined) {
    function Accordion(ele, opts) {
        this.defaults = {
            speed: 200,
            fold: true,
            callBack: function() {}
        };
        this.opts = $.extend({},
        this.defaults, opts);
        this.ele = ele;
    }
    Accordion.prototype.init = function() {
        var self = this,
        $this = $(this.ele).find(".trigger");
        $this.click(function() {
            var $this = $(this),
            target = $this.attr('data-target');
            if (self.opts.fold === true) {
                $this.parent().siblings().find(".container").slideUp(self.opts.speed);
                $this.parent().siblings().find(".btn").removeClass("current");
            }
            $(".container[data-target='" + target + "']").slideToggle(self.opts.speed,function() {
                $this.find(".btn").toggleClass("current");
                if (self.opts.callBack) {
                    self.opts.callBack();
                }
            });
        });
    }
    $.fn.helloAccordion = function(opts) {
        var fn = new Accordion(this, opts);
        return fn.init();
    }
})(jQuery, window, document);
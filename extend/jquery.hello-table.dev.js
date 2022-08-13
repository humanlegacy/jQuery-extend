; (function($, window, undefined) {
	$.helloExtend.prototype.table = function(param){

    function Table(param) {
		this.defaults = {
			ele:'.hello-table',
			width: '100%',
			height: '500px',
            total:true,
            totalPos:1,
			totalText:'总分',
            sort:true,
            merge:{},
			rowFixed: 1,
			colFixed: 3
		};
		this.opts = $.extend({},this.defaults,param);
        this.data = [];
        this.total = [];
        this.ele = this.opts.ele; 
	};
	Table.prototype = {
		display: function(self) {
            this.data = [];
            this.total = [];
            var tableSplit =   "<div class='hello-table-container'>"+
                                       "    <div class='table-split table-serial fixed'>"+
                                       "        <div class='table-header'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>"+
                                       "        <div class='table-body'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>"+
                                       "    </div>"+
                                       "    <div class='table-split table-colspan fixed content'>"+
                                       "        <div class='table-header'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>"+
                                       "        <div class='table-body'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>"+
                                       "    </div>"+
                                       "    <div class='table-split table-view content'>"+
                                       "        <div class='table-header'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>"+
                                       "        <div class='table-body'><table border='0' cellspacing='0' cellpadding='0'><tbody></tbody></table></div>"+
                                       "    </div>"+
                                       "</div>";
            
            //统计
            if(this.opts.total){
                $(this.ele).find("tr").each(function(index){
                    var colTotal = 0,tdSize = $(this).find("td").length;
                    if(index == 0){
                        $(this).find("td").eq(self.opts.totalPos-2).after("<td data-sort='true'>"+self.opts.totalText+"</td>");
                    }else{
                        for(var k=self.opts.totalPos-1;k<tdSize;k++){
                            colTotal += parseInt($(this).find("td").eq(k).text());
                        }
                        $(this).find("td").eq(self.opts.totalPos-2).after("<td>"+colTotal+"</td>");
                    }
                }); 
            };
            //创建数据
            $(this.ele).find("tr").each(function(){
                var temp = [];
                $(this).find("td").each(function(index){
                    if($(this).find("span").length != 1){
                        $(this).attr('data-index',index).wrapInner("<span></span>");   
                    };
                    temp.push($(this).clone(true));
                });
                self.data.push(temp);
            }); 
            
            $(this.ele).hide().after(tableSplit);
            //创建表对象
            this.container = $(this.ele).next(".hello-table-container");
            this.serialHeader = $(this.container).find(".table-serial .table-header tbody");
            this.serialBody = $(this.container).find(".table-serial .table-body tbody");
            this.colspanHeader = $(this.container).find(".table-colspan .table-header tbody");
            this.colspanBody = $(this.container).find(".table-colspan .table-body tbody");
            this.viewHeader = $(this.container).find(".table-view .table-header tbody");
            this.viewBody = $(this.container).find(".table-view .table-body tbody");
            $(this.container).css({width:this.opts.width,height:this.opts.height});
        },	
        create:function(data,sort){
            var rowFixed = 0,tr = '<tr></tr>';
            if(!sort){
                rowFixed = this.opts.rowFixed; 
                 //生成表头
                for(var k = 0;k<this.opts.rowFixed;k++){
                    this.colspanHeader.append(tr);
                    for(var v = 0;v<this.opts.colFixed;v++){
                         this.colspanHeader.find("tr").eq(k).append(data[k][v]);
                    }
                };
                for(var k = 0;k<this.opts.rowFixed;k++){
                    this.viewHeader.append(tr);   
                    for(var v = this.opts.colFixed;v<data[k].length;v++){
                         this.viewHeader.find("tr").eq(k).append(data[k][v]);
                    }
                };
            }
            //生成表体
            for(var k = rowFixed;k<data.length;k++){
               this.colspanBody.append(tr);
                for(var v = 0;v<this.opts.colFixed;v++){
                     this.colspanBody.find("tr").eq(k-rowFixed).append(data[k][v]);
                }
            };
            this.total = [];
            for(var k = rowFixed;k<data.length;k++){
                this.viewBody.append(tr);
                var temp = [];
                for(var v = this.opts.colFixed;v<data[k].length;v++){
                   this.viewBody.find("tr").eq(k-rowFixed).append(data[k][v]);
                    temp.push(parseInt(data[k][v].text()));
                }
                this.total.push(temp);
            }
        },
        sort:function(){
            if(this.opts.sort){
                $(this.container).find("td[data-sort='true']").find("span").append("<label data-type='desc' class='table-sort' title='点击排序'><i class='icon-sort'></i></label>");
            };
        },
        serial:function(){
            this.serialHeader.append("<tr><td class='table-refresh'><i class='icon-reorder'></i></td></tr>");
            for(var k = 1;k<this.data.length;k++){
                this.serialBody.append("<tr><td>"+k+"</td></tr>");
            };
        },
        count:function(){
            var $split = $(this.container).find(".table-split"),
                    $view = $(this.container).find(".table-view"),
                    $colspan = $(this.container).find(".table-colspan"),
                    $serial = $(this.container).find(".table-serial");
            $view.find(".table-body").css({height:parseInt(this.opts.height) - $view.find(".table-header").height()});
            $view.css({"margin-left":$colspan.innerWidth()+$serial.innerWidth()});  
            for(var k=0;k<3;k++){
                var $headerBox = $split.eq(k).find(".table-header table"),
                        $bodyBox = $split.eq(k).find(".table-body table"),
                        headerTableWidth = $headerBox.width(),
                        bodyTableWidth = $bodyBox.width();
                $split.eq(k).find(".table-header table,.table-body table").css({
                    width:headerTableWidth > bodyTableWidth ? headerTableWidth : bodyTableWidth
                });
            };  
        },
        merge:function(self){
            if(this.opts.rowFixed == 1){
                $.each(this.opts.merge,function(index,rowspan){
                     if(self.opts.colFixed == 0){
                         var $rowspanTD = self.viewBody.find("td[data-label='"+index+"']");
                     }else{
                         var $rowspanTD = self.colspanBody.find("td[data-label='"+index+"']");
                     }
                    $rowspanTD.eq(0).after('<td data-label="'+index+'" rowspan='+rowspan+' style="background:#f5f5f5;"><span>'+$rowspanTD.eq(0).text()+'</span></td>');
                    $rowspanTD.remove();
                });    
            };
        },
        quickSort:function(arr){
            var size = arr.length,result = [].concat(this.data);
            for (var k = 0; k < size; k++) {
                for (var v = 0; v < size - 1 - k;v++) {
                    if (arr[v] > arr[v+1]) {       
                        var temp = arr[v+1];
                        arr[v+1] = arr[v];
                        arr[v] = temp;
                        var temp_ = result[v+1+this.opts.rowFixed];
                        result[v+1+this.opts.rowFixed] = result[v+this.opts.rowFixed];
                        result[v+this.opts.rowFixed] = temp_;
                    };
                };
            };
            return result;
        },
        refresh:function(data,$self,sort){
            var temp_ = [];
            for(var k = this.opts.rowFixed;k<data.length;k++){
                 temp_.push(data[k]);
            };
            if(sort){
                var type = $self.attr("data-type");
                if(type == 'desc'){
                    temp_.reverse();
                    $self.attr("data-type",'asc');
                }else{
                    $self.attr("data-type",'desc');
                };
            };
            $(this.container).find(".table-split .table-body tr").removeClass("selected");
            $(this.container).find(".table-split.content .table-body tbody").empty();
            this.create(temp_,true);
            this.count();  
        },
		init: function() {
            var self = this;
			this.display(self);
            this.create(this.data);
            this.serial();
            this.sort();
            this.merge(self);
            this.count();
            
            //重载
            $(this.container).on('click','.table-refresh',function(){
                self.refresh(self.data);
                self.merge(self);
            });
			//排序
            $(this.container).on('click','.table-sort',function(){
                var temp_ = [],index = $(this).parent().parent().attr('data-index');
                for(var k=self.opts.rowFixed;k<self.data.length;k++){
                    temp_.push(parseInt(self.data[k][index].text()));
                }; 
                var temp = self.quickSort(temp_);
                self.refresh(temp,$(this),true);
                self.count();
            });
 
            //滚动操作
			$(this.container).find('.table-view .table-body').on('scroll',function() {
				var left = $(this).scrollLeft(),top = $(this).scrollTop();
				$(self.container).find(".table-view .table-header table").css({"margin-left": -left});
                $(self.container).find(".table-split.fixed .table-body table").css({"margin-top": -top});
			});
            
            //鼠标滑过高亮
             $(this.container).on('mouseover','.table-header td',function(){
                var index = $(this).attr('data-index');
                $(self.container).find(".table-split.content .table-body td").removeClass("sort");
                $(self.container).find(".table-split.content .table-body").find("td[data-index='"+index+"']").addClass("sort");
            }).on('mouseleave','.table-header td',function(){
                $(self.container).find(".table-split.content .table-body td").removeClass("sort");
            });
            
            $(this.container).on('mouseover','.table-body tr',function(){
                var index = $(this).index();
                $(this).addClass("hover").siblings().removeClass("hover");
                $(self.container).find(".table-split").each(function(){
                    $(this).find(".table-body tr").eq(index).addClass("hover").siblings().removeClass("hover");
                });
            }).on('mouseleave','.table-body tr',function(){
                $(self.container).find(".table-split").find(".table-body tr").removeClass("hover");
            });
            
            //点选高亮
             $(this.container).on('click','.table-body tr',function(){
                 var index = $(this).index();
                 var tr = $(this).parentsUntil(".table-split").parent().siblings().find(".table-body tr").eq(index);
                 if($(this).hasClass("selected")){
                    $(self.container).find(".table-split").each(function(){
                        $(this).find(".table-body tr").eq(index).removeClass("selected");
                    });
                 }else{
                    $(self.container).find(".table-split").each(function(){
                        $(this).find(".table-body tr").eq(index).addClass("selected");
                    }); 
                 };
             });
            
            //窗口重载
            $(window).resize(function(){
                $(self.container).css({width:self.opts.width,height:self.opts.height});
                $(self.container).find(".table-view .table-body").css({
                    height:$(self.container).height() - $(self.container).find(".table-view .table-header").height()
                });
            });
		}
	};
    var table = new Table(param);
	table.init();
		
	}
})(jQuery, window);
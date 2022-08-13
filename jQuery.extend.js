/*
 * $.Ext v2.7.5 (https://github.com/749264345/jQuery.Ext)
 * auth:Jnst.
 * Copyright 2015-2017 
 */

;
(function ($, window, document, undefined) {
    "use strict";

    var source;

    //判断是否为对象内方法
    function isFn(fnName) {
        if (source[fnName] === undefined) {
            console.warn("[Error] " + fnName + ' is not defined!');
            return false;
        };
        return true;
    };

    //创建deBug调试方法	
    function deBugFn(source, fnName, param) {
        var result = {},
            handler, START, END;
        if (isFn(fnName)) {
            START = new Date().getTime();
            handler = source[fnName](param);
            END = new Date().getTime();
            result[fnName] = (END - START) + 'ms';
            console.log(result);
            return handler;
        }
    };

    $.extend({
        Ext: function (fnName, param, deBug) {
            source = $.extend({}, tools, $.Ext.prototype);
            if (deBug) {
                return deBugFn(source, fnName, param);
            }
            return source[fnName](param);
        }
    });

    var tools = {
        //加载组件
        _loadExt: function (o) {
            function ajax(o) {
                var defer = $.Deferred();
                $.each(o.files, function (i, url) {
                    var path = o.dir + url;
                    $.ajax({
                        url: path,
                        dataType: "script",
                        success: function () {
                            defer.resolve();
                        },
                        error: function (err) {
                            defer.resolve(err);
                        }
                    });
                })
                return defer.promise();
            }
            $.when(ajax(o)).done(function (err) {
                if (o.callback) {
                    o.callback(err);
                }
            });
        },
        //随机获取数组中某一项
        _randArr: function (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },
        //生成指定范围内的随机数
        _rand: function (arr) {
            return Math.floor(Math.random() * (arr[0] - arr[1] + 1)) + arr[1];
        },
        //返回数组中的最大值和最小值
        _getNum: function (arr) {
            return {
                max: Math.max.apply(Math, arr),
                min: Math.min.apply(Math, arr)
            };
        },
        //删除数组中指定元素
        _remove: function (obj) {
            for (var k in obj.array) {
                if (obj.array[k] == obj.del) {
                    obj.array.splice(k, 1);
                    break;
                }
            }
            return obj;
        },
        //返回随机生成指定长度的数字字母组合
        _getString: function (num) {
            var rdmStr = "";
            if (rdmStr.length < num) rdmStr += Math.random().toString(36).substr(2);
            return rdmStr.substr(0, num);
        },
        //返回16进制随机色
        _randColor: function () {
            return "#" + ((Math.random() * (0xFFFFFF).toString(10)).toString(16)).slice(-6);
        },
        //格式化时间："今天是{year}年{month}月{day}日,周{week},第{quarter}季度 {hour}:{minute}:{second}:{ms} 时间戳:{ts}"
        _formatDate: function (str) {
            var D = new Date(),
                item = {
                    "{year}": D.getFullYear(),
                    "{month}": D.getMonth() + 1,
                    "{day}": D.getDate(),
                    "{hour}": D.getHours(),
                    "{minute}": D.getMinutes(),
                    "{second}": D.getSeconds(),
                    "{quarter}": Math.floor((D.getMonth() + 3) / 3),
                    "{ms}": D.getMilliseconds(),
                    "{week}": "日一二三四五六".charAt(D.getDay()),
                    "{ts}": D.getTime()
                };
            for (var k in item) {
                new RegExp("(" + k + ")").test(str) ? str = str.replace(RegExp.$1, item[k]) : null;
            }
            return str;
        }
    };
})(jQuery, window, document);

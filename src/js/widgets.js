(function(){
    'use strict';

    $.fac = $.fac || {};
    //import widget
    $.fac.widget = $.fac.widget || {};
    $.fac.widget = $.extend($.fac.widget, {
        list : [],
        init: function(widget){
            var self = this;
            $.fn.extend(widget);
            for(var key in widget){
                self.list.push(key);
            }
            return self;
        },
        validate: function(xtype, value, allowBlank){
            var value = value || "";
            var xtype = xtype || "string";
            var allowBlank = allowBlank || false;
            var para = {}; 
            
            if(typeof xtype === "object" && typeof xtype !== "string"){              
                para = xtype;
                xtype = para.xtype;
            }

            if(!allowBlank && value === ""){
                return $.fac.EN.TIPS.VALIDATION.NOT_ALLOW_BLANK;
            }
            
            var action = {
                number : function(para){
                    var min = para.min;
                    var max = para.max;
                    var reg = /^\-?\d+\.?\d{0,}$/;
                    if(!value.toString().match(reg)){
                        return $.fac.EN.TIPS.VALIDATION.NOT_A_NUMBER;
                    }else if(parseFloat(value) > max || parseFloat(value) < min){
                        return $.fac.EN.TIPS.VALIDATION.OUT_OF_RANGE.replace(/%1/g, min).replace(/%2/g, max);
                        
                    }
                    return true;
                },
                string : function(){
                    return true;
                }
            };

            return (action[xtype])(para);
        }
    });


    
})();
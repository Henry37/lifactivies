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
        }
    });


    
})();
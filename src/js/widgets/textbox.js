(function(){
    'use strict';

    $.fac = $.fac || {};
    //import widget
    $.fac.widget = $.fac.widget || {};
    $.fac.widget.init({
        "textbox" : function(method){
            var self = this;
            if(typeof method === "object" && typeof method !== "string"){
                self.extend(self, method);
            }

            if(!self._init){
                self.html("<a id='"+ self.id +"' href='https://baidu.com'>click</a>");
                self._init = true;
            }
            self.extend(self, {
                //for widget's method
                show: function(){
                }
            });

            if(typeof method === "string"){
                (self[method])();
            }
            return self;
        }
    });
})();
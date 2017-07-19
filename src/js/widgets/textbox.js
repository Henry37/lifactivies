(function(){
    'use strict';

    $.fac = $.fac || {};
    //import widget
    $.fac.widget = $.fac.widget || {};
    $.fac.widget.init({
        "textbox" : function(method){
            var self = this;
            if(typeof method === "object" && typeof method !== "string" && !self._init){
                //init widget
                self.extend(self, method);
                var date = new Date();
                self.id = self.id || date.getTime().toString();
                self.name = self.name || self.id;
                self.cls = self.cls || "";
                self.labelCls = self.labelCls || "";
                self.inputCls = self.inputCls || "";


                self.addClass("widget-textbox-container"); 
                self.addClass(self.cls);

                var inHTML = "";
                inHTML += "<label class='widget-textbox-fieldLabel " + self.labelCls + "' for='" + self.id + "'>" + self.fieldLabel + "</label>";
                inHTML += "<input class='widget-textbox-input " + self.inputCls + "' id='" + self.id + "'  name='" + self.name + "'/>";
                

                self.html(inHTML);


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
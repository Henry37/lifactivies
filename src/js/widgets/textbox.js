(function(){
    'use strict';

    $.fac = $.fac || {};
    //import widget
    $.fac.widget = $.fac.widget || {};
    $.fac.widget.init({
        "textbox" : function(method, para){
            var self = this;
            if(typeof method === "object" && method!== {} && typeof method !== "string" && !self._init){
                //init widget
                self.extend(self, method);
                var date = new Date();
                self.id = self.id || date.getTime().toString();
                self.name = self.name || self.id;
                self.cls = self.cls || "";
                self.labelCls = self.labelCls || "";
                self.inputCls = self.inputCls || "";
                self.allowBlank = self.allowBlank || true;
                self.validator = self.validator || {};


                self.addClass("widget-textbox-container"); 
                self.addClass(self.cls);

                var inHTML = "";
                inHTML += "<label class='widget-textbox-fieldLabel " + self.labelCls + "' for='" + self.id + "'>" + self.fieldLabel + "</label>";
                inHTML += "<input class='widget-textbox-input " + self.inputCls + "' id='" + self.id + "'  name='" + self.name + "'/>";
                inHTML += "<span class='widget-textbox-desc " + self.descCls + "'>" + self.desc + "</span>";
                inHTML += "<span class='widget-textbox-error " + self.errorCls + "'>"+ self.error + "</span>";
                self.html(inHTML);


                self._init = true;
            }
            self.extend(self, {
                //for widget's method
                validate: function(){
                    if($.fac.widget.validate(self.xtype, self.value, self.allowBlank) !== true){
                        return false;
                    }
                    
                    return true;
                },
                setValue: function(newValue){
                    var newValue = newValue || self.value;
                    self.find("input.widget-textbox-input").val(newValue);
                    self.value = newValue;
                    return self;
                }
            });

            if(typeof method === "string"){
                (self[method])(para);
            }
            return self;
        }
    });
})();
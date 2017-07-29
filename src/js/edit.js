(function(){
    'use strict';

    $.fac = $.fac || {};
    //import edit
    $.fac.edit = $.fac.edit || {};
    $.fac.edit = $.extend($.fac.edit, {
        init: function(){
            var self = this;
            var inHTML = '';
            inHTML += '<div class="components-selector">';
            inHTML += '     <div class="components-selector-head">';
            inHTML += '         <span class="text">Items</span>';
            inHTML += '         <span class="icon">✕</span>';
            inHTML += '     </div>'
            inHTML += '     <div class="components-selector-body">';
            inHTML += '         <div class="components-selector-categroy">Widgets</div>';
            inHTML += '         <ul class="components-selector-list">';

            for(var i = 0; i < $.fac.widget.list.length; i++){
                inHTML += '             <li class="components-selector-item">' + $.fac.widget.list[i] + '</li>';
            }

            inHTML += '         </ul>';

            inHTML += '         <div class="components-selector-categroy">Components</div>';
            inHTML += '         <ul class="components-selector-list">';

            // for(var i = 0; i < $.fac.comoponents.list.length; i++){
            //     inHTML += '             <li class="components-selector-item">' + $.fac.comoponents.list[i] + '</li>';
            // }
            
            inHTML += '         </ul>';
            inHTML += '     </div>';
            inHTML += '</div>';
            
            $("body").append(inHTML);
            var selector = $(".components-selector");

            selector.delegate(".components-selector-head span.icon", "click", function(e){
                selector.hide();
            });

            self.setDraggable(selector, function(e){
                selector.addClass("onDrag");
                selector.originX = e.clientX;
                selector.originY = e.clientY;
                selector.originL = parseInt(selector.css("left").match(/\d+/));
                selector.originT = parseInt(selector.css("top").match(/\d+/));
                selector.isMoving = true;
                
            }, function(e){
                var x = e.clientX;
                var y = e.clientY;
                console.log("dragging");
                if(selector.isMoving){
                    selector.css({
                        top: (selector.originT + e.clientY - selector.originY) + "px",
                        left: (selector.originL + e.clientX - selector.originX) + "px"
                    });
                }
                
            }, function(e){
                selector.removeClass("onDrag");
                selector.isMoving = false;
                
            });
        },

        setDraggable: function(selector, callDragstart, callDrag, callDragend){
            var self = this;
            var selector = selector;

            selector.addClass("draggable");

            selector.on("mousedown", function(e){
                callDragstart(e);
                console.log("on");
            });

            selector.on("mousemove", function(e){
                callDrag(e);
                console.log("move");
            });

            selector.on("mouseup", function(e){
                callDragend(e);
                console.log("up");
            });   
        }
    });


    $(document).ready(function(e){
        $.fac.edit.init();
    });
    
    
})();
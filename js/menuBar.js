'use strict';

define(['components/flight/lib/component'], 
    function(defineComponent) {
        return defineComponent(menuBar);
        
        function menuBar() {
            this.defaultAttrs({
                menuItemSelector: 'li a',
                activeClass: 'active'
            });
            
            this.selectMenuItem = function(ev, data) {
                var eventTarget = $(data.el);

                this.trigger(
                    'switchFrame', 
                    {key: eventTarget.attr("data-key")}
                );
                
                this.select('menuItemSelector').removeClass(this.attr.activeClass);
                eventTarget.addClass(this.attr.activeClass);
                
                event.stopPropagation();
                return false;
            },
            
            this.initializeMenuBar = function() {
                this.select('menuItemSelector').each(function() {
                    var key =  $(this).attr("href").substring(1);
                    $(this).removeAttr("href").attr("data-key", key);
                });
            }
            
            this.after('initialize', function() {
                this.initializeMenuBar();
                
                this.on('click', {
                    'menuItemSelector': this.selectMenuItem
                });
            });
        }
    }
);
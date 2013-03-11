'use strict';

define(['components/flight/lib/component'], 
    function(defineComponent) {
        return defineComponent(frame);
        
        function frame() {
            var frames = {};
            var currentFrame;
            
            this.defaultAttrs({
                initialFrame: "info"
            });
            
            this.switchFrame = function(ev, data) {
                var frame = frames[data.key];
                var background = $("#background");
                
                frame.css("transition", "top 0s");
                frame.css("top", currentFrame.outerHeight()).show();
                
                currentFrame.css("transition", "top 2s");
                currentFrame.css("top", (-1 * currentFrame.outerHeight()));

                frame.css({
                    "transition": "top 2s",
                    "top": "0px"
                });
                
                currentFrame = frame;
                this.$node.css({
                    "transition": "height 2s",
                    "height": currentFrame.outerHeight()
                });
            }
            
            this.initializeFrames = function() {
                this.$node.find(".frame").each(function() {
                    var id = this.id;
                    frames[id] = $(this);
                    frames[id].hide();
                    // fix issue where firefox doesn't animate if
                    // it doesn't have an inital value
                    frames[id].css("top", 0);
                });
                
                currentFrame = frames[this.attr.initialFrame];
                this.$node.css("height", currentFrame.outerHeight());
                currentFrame.show();
            };
            
            this.after('initialize', function() {
                this.initializeFrames();
                this.on(document, 'switchFrame', this.switchFrame);
            });
        }
    }
);
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
                
                // background hack...
                /*if (data.key == "info") { 
                    background.css("transition", "top 0s")
                    background.css({
                        "top": currentFrame.outerHeight()
                    });
                    
                    console.debug(currentFrame.outerHeight());
                    
                    background.css({
                        "transition": "top 2s",
                        "top": "100px"
                    });
                } else {                          
                    $("#background").css({
                        "transition": "top 2s",
                        "top": (-1 * currentFrame.outerHeight())
                    });
                }*/
                
                currentFrame.css({
                    "transition": "top 2s",
                    "top": (-1 * currentFrame.outerHeight())
                });

                frame.css({
                    "transition": "top 2s",
                    "top": "0px"
                });
                
                currentFrame = frame;
                this.$node.css("height", currentFrame.outerHeight());
            }
            
            this.initializeFrames = function() {
                this.$node.find(".frame").each(function() {
                    var id = this.id;
                    frames[id] = $(this);
                    frames[id].hide();
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
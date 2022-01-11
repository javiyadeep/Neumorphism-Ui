/**
 * @author doodlewind
 * @licence MIT
 */
(function($) {
    var easyLoop = function() {
        // use context to save DOM state
        var __loop = function(options, ctx, delta) {
            var needCycle = false;
            var __loopCallback = function() {
                ctx.current += delta;
                // need cycle when reach head/tail
                needCycle = (ctx.current == 0) || (ctx.current > ctx.len);
                if (needCycle) { // set current count from head->tail or from tail->head
                    ctx.current = (ctx.current === 0) ? ctx.len : 1;
                    if (options.axis === "x") {
                        ctx.loopDiv.css({left:  -1 * options.itemWidth * (ctx.current + options.numPerScreen - 1)});
                    } else if (options.axis === "y") {
                        ctx.loopDiv.css({top:  -1 * options.itemHeight * (ctx.current + options.numPerScreen - 1)});
                    }
                }
            };
            if (options.axis === "x") {
                ctx.loopDiv.animate(
                    { left: "+=" + (-1 * options.itemWidth * delta) },
                    { duration: options.duration, complete: __loopCallback });
            } else if (options.axis === "y") {
                ctx.loopDiv.animate(
                    { top: "+=" + (-1 * options.itemHeight * delta) },
                    { duration: options.duration, complete: __loopCallback });
            }
        };
        var __initCSS = function(options) {
            var $loopDiv = $('#' + options.loopDiv);
            var maskWidth = options.itemWidth, maskHeight = options.itemHeight;
            $loopDiv.wrap("<div class='" + options.wrapperClass + "'></div>");
            if (options.axis === "x") {
                maskWidth *= options.numPerScreen;
            } else if (options.axis === "y") {
                maskHeight *= options.numPerScreen;
            }
            $("." + options.wrapperClass).css({
                "width": maskWidth + "px",
                "height": maskHeight + "px",
                "overflow": options.debug ? "visible" : "hidden",
                "margin": options.center ? "auto" : "inherit"
            });
            $loopDiv.css({
                "position": "relative",
                "font-size": 0
            });
            if (options.axis === "x") {
                $loopDiv.css({
                    "left": "-" + options.itemWidth * options.numPerScreen + "px",
                    "white-space": "nowrap" // add nowrap only for horizontal loop
                });
            } else if (options.axis === "y") {
                $loopDiv.css({ "top": "-" + options.itemHeight * options.numPerScreen + "px" });
            }
            $loopDiv.children().css({
                "display": "inline-block",
                "position": "relative",
                "vertical-align": "top",
                "width": options.itemWidth,
                "height": options.itemHeight
            });
        };
        var __initLoop = function(options) {
            var _loopDiv = $('#' + options.loopDiv);
            var context = {
                loopDiv: _loopDiv,
                item: _loopDiv.children(),
                len: _loopDiv.children().length,
                current: 1,
                triggers: $('.' + options.triggerClass)
            };
            for (var i = 0; i < options.numPerScreen; i++) { // copy head & tail items
                var toAppend = context.item.eq(i);
                var toPrepend = context.item.eq(-i - 1);
                _loopDiv.prepend(toPrepend.clone(true));
                _loopDiv.append(toAppend.clone(true));
            }
            context.triggers.click(function() {
                if (_loopDiv.is(':not(:animated)')) {
                    var delta = ($(this).hasClass(options.triggerPrevClass)) ? -1 : 1;
                    __loop(options, context, delta);
                }
            });
            if (options.autoPlay) {
                setInterval(function() {
                    if (_loopDiv.is(':not(:animated)')) __loop(options, context, options.autoPlayDirection);
                }, options.autoPlayInterval);
            }
        };
        var __init = function(options) {
            var $loopDiv = $(this);
            var loopName = $loopDiv.attr("id");
            var defaults = {
                loopDiv: loopName,
                axis: "x",
                itemWidth: 100,
                itemHeight: 100,
                numPerScreen: 1,
                duration: 400,
                autoPlay: true,
                autoPlayInterval: 2000,
                autoPlayDirection: 1,
                center: true,
                triggerClass: loopName + "__btn",
                triggerPrevClass: loopName + "__btn--prev",
                triggerNextClass: loopName + "__btn--next",
                wrapperClass: loopName + "__wrap",
                debug: false
            };
            options = $.extend(defaults, options);
            __initCSS(options);
            __initLoop(options);
        };
        return { init: __init };
    };
    $.fn.extend({
        easyLoop: easyLoop().init
    });
})(jQuery);
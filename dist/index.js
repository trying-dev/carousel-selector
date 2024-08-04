/*
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import React, { useState, useEffect, useRef, useCallback } from "react";
var CarouselSelector = function (_a) {
    var _b = _a.options, options = _b === void 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : _b, onChange = _a.onChange, initialOption = _a.initialOption;
    var initialIndex = options.indexOf(initialOption);
    var initialAngle = (initialIndex / options.length) * 360;
    var _c = useState(-initialAngle), angle = _c[0], setAngle = _c[1]; // Rotate to make initialOption visible
    var _d = useState(false), isDragging = _d[0], setIsDragging = _d[1];
    var _e = useState(0), startX = _e[0], setStartX = _e[1];
    var containerRef = useRef(null);
    var cubicBezier = useCallback(function (controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, time) {
        var coefficientX1 = 3 * controlPoint1X;
        var coefficientX2 = 3 * (controlPoint2X - controlPoint1X) - coefficientX1;
        var coefficientX3 = 1 - coefficientX1 - coefficientX2;
        var coefficientY1 = 3 * controlPoint1Y;
        var coefficientY2 = 3 * (controlPoint2Y - controlPoint1Y) - coefficientY1;
        var coefficientY3 = 1 - coefficientY1 - coefficientY2;
        var x = coefficientX3 * time * time * time +
            coefficientX2 * time * time +
            coefficientX1 * time;
        var y = coefficientY3 * time * time * time +
            coefficientY2 * time * time +
            coefficientY1 * time;
        return y;
    }, []);
    var notifyOnChange = useCallback(function (newAngle) {
        var itemAngle = 360 / options.length;
        var adjustedAngle = newAngle % 360;
        if (adjustedAngle < 0) {
            adjustedAngle += 360;
        }
        var closestItemIndex = Math.round(adjustedAngle / itemAngle) % options.length;
        var itemAtFront = options[(options.length - closestItemIndex) % options.length];
        onChange && onChange(itemAtFront);
    }, [options, onChange]);
    var animateToAngle = useCallback(function (targetAngle) {
        var startAngle = angle;
        var deltaAngle = targetAngle - startAngle;
        if (deltaAngle > 180) {
            deltaAngle -= 360;
        }
        else if (deltaAngle < -180) {
            deltaAngle += 360;
        }
        var duration = 500;
        var startTime = performance.now();
        var animate = function (currentTime) {
            var elapsedTime = currentTime - startTime;
            var progress = Math.min(elapsedTime / duration, 1);
            var easing = cubicBezier(0.42, 0, 0.58, 1, progress);
            setAngle(startAngle + deltaAngle * easing);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
            else {
                notifyOnChange(targetAngle);
            }
        };
        requestAnimationFrame(animate);
    }, [angle, cubicBezier, notifyOnChange]);
    var snapToClosestItem = useCallback(function () {
        var itemAngle = 360 / options.length;
        var adjustedAngle = angle % 360;
        var closestItemIndex = Math.round(adjustedAngle / itemAngle);
        if (adjustedAngle < 0) {
            closestItemIndex = options.length + Math.round(adjustedAngle / itemAngle);
        }
        var newAngle = closestItemIndex * itemAngle;
        animateToAngle(newAngle);
    }, [angle, animateToAngle, options.length]);
    var handleMouseMove = useCallback(function (event) {
        if (isDragging) {
            var dx_1 = event.clientX - startX;
            setAngle(function (prevAngle) { return prevAngle + dx_1 * 0.3; });
            setStartX(event.clientX);
        }
    }, [isDragging, startX]);
    var handleMouseUp = useCallback(function () {
        setIsDragging(false);
        snapToClosestItem();
    }, [snapToClosestItem]);
    var handleMouseDown = function (event) {
        setIsDragging(true);
        setStartX(event.clientX);
    };
    useEffect(function () {
        var container = containerRef.current;
        if (!container)
            return;
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseup", handleMouseUp);
        return function () {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);
    var calculateOpacity = function (itemAngle) {
        var angleDiff = (itemAngle + angle) % 360;
        if (angleDiff < 0) {
            angleDiff += 360;
        }
        if (angleDiff >= 310 && angleDiff <= 310) {
            return 0.7;
        }
        else if (angleDiff >= 310 || angleDiff <= 30) {
            return 1;
        }
        else if (angleDiff >= 30 && angleDiff <= 50) {
            return 0.7;
        }
        else {
            return 0.1;
        }
    };
    return (React.createElement("div", { ref: containerRef, className: "relative w-full h-16 mx-auto perspective-1000 cursor-pointer", onMouseDown: handleMouseDown },
        React.createElement("style", null, "\n        .preserve-3d {\n          transform-style: preserve-3d;\n        }\n\n        .perspective-1000 {\n          perspective: 1000px;\n        }\n      "),
        React.createElement("div", { className: "w-full h-full relative preserve-3d transition-all", style: { transform: "rotateY(".concat(angle, "deg)") } }, options.map(function (item, index) {
            var itemAngle = (index / options.length) * 360;
            var opacity = calculateOpacity(itemAngle);
            return (React.createElement("div", { key: index, className: "absolute w-16 h-12 bg-blue-200 flex items-center justify-center select-none transition-all", style: {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotateY(".concat(itemAngle, "deg) translateZ(150px)"),
                    opacity: opacity,
                } }, item));
        }))));
};
export default CarouselSelector;

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/* global Fluid, CONFIG */

(function (window, document) {
  var _iterator = _createForOfIteratorHelper(document.querySelectorAll('img[lazyload]')),
    _step;
  try {
    var _loop = function _loop() {
      var each = _step.value;
      Fluid.utils.waitElementVisible(each, function () {
        each.removeAttribute('srcset');
        each.removeAttribute('lazyload');
      }, CONFIG.lazyload.offset_factor);
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvZmx1aWQvc291cmNlL2pzL2ltZy1sYXp5bG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUE7O0FBRUEsQ0FBQyxVQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFBQSwyQ0FDUCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO0lBQUE7RUFBQTtJQUFBO01BQUEsSUFBbEQsSUFBSTtNQUNiLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFlBQVc7UUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7TUFDbEMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQUM7SUFKcEMsb0RBQStEO01BQUE7SUFLL0Q7RUFBQztJQUFBO0VBQUE7SUFBQTtFQUFBO0FBQ0gsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBnbG9iYWwgRmx1aWQsIENPTkZJRyAqL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICBmb3IgKGNvbnN0IGVhY2ggb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2xhenlsb2FkXScpKSB7XG4gICAgRmx1aWQudXRpbHMud2FpdEVsZW1lbnRWaXNpYmxlKGVhY2gsIGZ1bmN0aW9uKCkge1xuICAgICAgZWFjaC5yZW1vdmVBdHRyaWJ1dGUoJ3NyY3NldCcpO1xuICAgICAgZWFjaC5yZW1vdmVBdHRyaWJ1dGUoJ2xhenlsb2FkJyk7XG4gICAgfSwgQ09ORklHLmxhenlsb2FkLm9mZnNldF9mYWN0b3IpO1xuICB9XG59KSh3aW5kb3csIGRvY3VtZW50KTtcbiJdfQ==

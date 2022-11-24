(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = Event;
function Event() {}
Event.prototype.eventQuene = [];
Event.prototype.on = function (event, cb) {
  Event.prototype.eventQuene[event] ? Event.prototype.eventQuene[event].push(cb) : Event.prototype.eventQuene[event] = [cb];
};
Event.prototype.emit = function (event) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var cbs = Event.prototype.eventQuene[event];
  cbs.forEach(function (item) {
    item.apply(void 0, args);
  });
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvZmx1aWQvc291cmNlL2pzL2N1c3RvbS91dGlscy9nbG9iYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBTyxTQUFTLEtBQUssR0FBRyxDQUFDO0FBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFLO0VBQ2xDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBSSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBRTtBQUM3SCxDQUFDO0FBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBQyxLQUFLLEVBQWM7RUFBQSxrQ0FBVCxJQUFJO0lBQUosSUFBSTtFQUFBO0VBQ3BDLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztFQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0lBQ3BCLElBQUksZUFBSSxJQUFJLENBQUM7RUFDZixDQUFDLENBQUM7QUFDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGZ1bmN0aW9uIEV2ZW50KCkge31cbkV2ZW50LnByb3RvdHlwZS5ldmVudFF1ZW5lID0gW107XG5FdmVudC5wcm90b3R5cGUub24gPSAoZXZlbnQsIGNiKSA9PiB7XG4gIEV2ZW50LnByb3RvdHlwZS5ldmVudFF1ZW5lW2V2ZW50XSA/IEV2ZW50LnByb3RvdHlwZS5ldmVudFF1ZW5lW2V2ZW50XS5wdXNoKGNiKSA6IChFdmVudC5wcm90b3R5cGUuZXZlbnRRdWVuZVtldmVudF0gPSBbY2JdKTtcbn07XG5FdmVudC5wcm90b3R5cGUuZW1pdCA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICBjb25zdCBjYnMgPSBFdmVudC5wcm90b3R5cGUuZXZlbnRRdWVuZVtldmVudF07XG4gIGNicy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbSguLi5hcmdzKTtcbiAgfSk7XG59O1xuIl19

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/* eslint-disable no-mixed-operators */
$(document).ready(function () {
  var HEARTS = ['🧡', '💛', '💚', '💙', '💜', '❤', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '💌'];
  var timer;
  var Count = /*#__PURE__*/function () {
    function Count() {
      _classCallCheck(this, Count);
      Count.prototype.currentCount++;
      Count.prototype.Count++;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        Count.prototype.currentCount = 0;
      }, 2000);
    }
    _createClass(Count, [{
      key: "getCurrentCount",
      value: function getCurrentCount() {
        return Count.prototype.currentCount;
      }
    }, {
      key: "getCount",
      value: function getCount() {
        return Count.prototype.Count;
      }
    }]);
    return Count;
  }();
  Count.prototype.currentCount = 0;
  Count.prototype.count = 0;
  var MyText = /*#__PURE__*/function (_Count) {
    _inherits(MyText, _Count);
    var _super = _createSuper(MyText);
    function MyText(x, y) {
      var _thisSuper, _this2;
      _classCallCheck(this, MyText);
      _this2 = _super.call(this);
      _this2.x = x;
      _this2.y = y;
      _this2.rand = HEARTS[Math.ceil(Math.random() * HEARTS.length) - 1] + '+' + _get((_thisSuper = _assertThisInitialized(_this2), _getPrototypeOf(MyText.prototype)), "getCurrentCount", _thisSuper).call(_thisSuper);
      _this2.color = _this2.getRandomColor();
      return _this2;
    }
    _createClass(MyText, [{
      key: "createDom",
      value: function createDom() {
        var span = document.createElement('span');
        span.innerHTML = this.rand;
        span.className = 'text';
        span.style.top = this.y - 20 + 'px';
        span.style.left = this.x - 20 + 'px';
        span.style.animation = 'remove 2s';
        span.style.color = this.color;
        return span;
      }
    }, {
      key: "getRandomColor",
      value: function getRandomColor() {
        var allTypeArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']; //16进制颜色
        var color = '#';
        for (var i = 0; i < 6; i++) {
          //随机生成一个0-16的数
          var random = Math.floor(Math.random() * allTypeArr.length);
          color += allTypeArr[random];
        }
        return color; //返回随机生成的颜色
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        var dom = this.createDom();
        var body = document.body;
        body.appendChild(dom);
        var i = 0;
        setInterval(function () {
          dom.style.top = _this3.y - 20 - i + 'px';
          i++;
        }, 10);
        setTimeout(function () {
          dom.remove();
        }, 1900);
      }
    }]);
    return MyText;
  }(Count);
  function Text(x, y, rand) {
    this.x = x;
    this.y = y;
    this.rand = rand;
  }
  Text.prototype.currentCount = 0;
  Text.prototype.count = 0;
  Text.prototype.create = function (_this) {
    var _this4 = this;
    var body = document.body;
    Text.prototype.currentCount += 1;
    Text.prototype.count += 1;
    _this.innerHTML = HEARTS[this.rand - 1] + '+' + (Text.prototype.currentCount || '');
    _this.className = 'text';
    _this.style.top = this.y - 20 + 'px';
    _this.style.left = this.x - 20 + 'px';
    _this.style.animation = 'remove 2s';
    body.appendChild(_this);
    var i = 0;
    setInterval(function () {
      _this.style.top = _this4.y - 20 - i + 'px';
      i++;
    }, 10);
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      Text.prototype.currentCount = 0;
    }, 2000);
  };
  Text.prototype.out = function (_this) {
    _this.remove();
  };
  //设置随机颜色
  Text.prototype.getRandom = function () {
    var allTypeArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']; //16进制颜色
    var color = '#';
    for (var i = 0; i < 6; i++) {
      //随机生成一个0-16的数
      var random = Math.floor(Math.random() * allTypeArr.length);
      color += allTypeArr[random];
    }
    return color; //返回随机生成的颜色
  };
  // window.onclick = (e) => {
  //   let x = e.pageX;
  //   let y = e.pageY; //当前坐标
  //   let randContent = Math.ceil(Math.random() * HEARTS.length);
  //   let text = new Text(x, y, randContent);
  //   let span = document.createElement('span');
  //   span.style.color = text.getRandom();
  //   text.create(span);
  //   setTimeout(function () {
  //     text.out(span);
  //   }, 1900);
  // };

  window.onclick = function (e) {
    var x = e.pageX;
    var y = e.pageY; //当前坐标
    var myText = new MyText(x, y);
    myText.render();
  };
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvZmx1aWQvc291cmNlL2pzL2N1c3RvbS9oZWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0EsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0VBQzVCLElBQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7RUFDeEcsSUFBSSxLQUFLO0VBQUMsSUFDSixLQUFLO0lBQ1QsaUJBQWM7TUFBQTtNQUNaLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO01BQzlCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO01BQ3ZCLEtBQUssSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO01BQzVCLEtBQUssR0FBRyxVQUFVLENBQUMsWUFBTTtRQUN2QixLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxDQUFDO01BQ2xDLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDVjtJQUFDO01BQUE7TUFBQSxPQUNELDJCQUFrQjtRQUNoQixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWTtNQUNyQztJQUFDO01BQUE7TUFBQSxPQUNELG9CQUFXO1FBQ1QsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUs7TUFDOUI7SUFBQztJQUFBO0VBQUE7RUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxDQUFDO0VBQ2hDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUM7RUFBQyxJQUNwQixNQUFNO0lBQUE7SUFBQTtJQUNWLGdCQUFZ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LEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFDaEIsQ0FBQztFQUNEO0VBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBWTtJQUNyQyxJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkcsSUFBSSxLQUFLLEdBQUcsR0FBRztJQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7TUFDMUI7TUFDQSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO01BQzFELEtBQUssSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzdCO0lBQ0EsT0FBTyxLQUFLLENBQUMsQ0FBQztFQUNoQixDQUFDO0VBQ0Q7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxDQUFDLEVBQUs7SUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7SUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixNQUFNLENBQUMsTUFBTSxFQUFFO0VBQ2pCLENBQUM7QUFDSCxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgSEVBUlRTID0gWyfwn6ehJywgJ/CfkpsnLCAn8J+SmicsICfwn5KZJywgJ/CfkpwnLCAn4p2kJywgJ/CfkpUnLCAn8J+SnicsICfwn5KTJywgJ/CfkpcnLCAn8J+SlicsICfwn5KYJywgJ/Cfkp0nLCAn8J+SnycsICfwn5KMJ107XG4gIGxldCB0aW1lcjtcbiAgY2xhc3MgQ291bnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgQ291bnQucHJvdG90eXBlLmN1cnJlbnRDb3VudCsrO1xuICAgICAgQ291bnQucHJvdG90eXBlLkNvdW50Kys7XG4gICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQ291bnQucHJvdG90eXBlLmN1cnJlbnRDb3VudCA9IDA7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudENvdW50KCkge1xuICAgICAgcmV0dXJuIENvdW50LnByb3RvdHlwZS5jdXJyZW50Q291bnQ7XG4gICAgfVxuICAgIGdldENvdW50KCkge1xuICAgICAgcmV0dXJuIENvdW50LnByb3RvdHlwZS5Db3VudDtcbiAgICB9XG4gIH1cbiAgQ291bnQucHJvdG90eXBlLmN1cnJlbnRDb3VudCA9IDA7XG4gIENvdW50LnByb3RvdHlwZS5jb3VudCA9IDA7XG4gIGNsYXNzIE15VGV4dCBleHRlbmRzIENvdW50IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy54ID0geDtcbiAgICAgIHRoaXMueSA9IHk7XG4gICAgICB0aGlzLnJhbmQgPSBIRUFSVFNbTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBIRUFSVFMubGVuZ3RoKSAtIDFdICsgJysnICsgc3VwZXIuZ2V0Q3VycmVudENvdW50KCk7XG4gICAgICB0aGlzLmNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xuICAgIH1cbiAgICBjcmVhdGVEb20oKSB7XG4gICAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHNwYW4uaW5uZXJIVE1MID0gdGhpcy5yYW5kO1xuICAgICAgc3Bhbi5jbGFzc05hbWUgPSAndGV4dCc7XG4gICAgICBzcGFuLnN0eWxlLnRvcCA9IHRoaXMueSAtIDIwICsgJ3B4JztcbiAgICAgIHNwYW4uc3R5bGUubGVmdCA9IHRoaXMueCAtIDIwICsgJ3B4JztcbiAgICAgIHNwYW4uc3R5bGUuYW5pbWF0aW9uID0gJ3JlbW92ZSAycyc7XG4gICAgICBzcGFuLnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIHJldHVybiBzcGFuO1xuICAgIH1cbiAgICBnZXRSYW5kb21Db2xvcigpIHtcbiAgICAgIGxldCBhbGxUeXBlQXJyID0gWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJ107IC8vMTbov5vliLbpopzoibJcbiAgICAgIGxldCBjb2xvciA9ICcjJztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIC8v6ZqP5py655Sf5oiQ5LiA5LiqMC0xNueahOaVsFxuICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxsVHlwZUFyci5sZW5ndGgpO1xuICAgICAgICBjb2xvciArPSBhbGxUeXBlQXJyW3JhbmRvbV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3I7IC8v6L+U5Zue6ZqP5py655Sf5oiQ55qE6aKc6ImyXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgIGxldCBkb20gPSB0aGlzLmNyZWF0ZURvbSgpO1xuICAgICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChkb20pO1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBkb20uc3R5bGUudG9wID0gdGhpcy55IC0gMjAgLSBpICsgJ3B4JztcbiAgICAgICAgaSsrO1xuICAgICAgfSwgMTApO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvbS5yZW1vdmUoKTtcbiAgICAgIH0sIDE5MDApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBUZXh0KHgsIHksIHJhbmQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYW5kID0gcmFuZDtcbiAgfVxuICBUZXh0LnByb3RvdHlwZS5jdXJyZW50Q291bnQgPSAwO1xuICBUZXh0LnByb3RvdHlwZS5jb3VudCA9IDA7XG4gIFRleHQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChfdGhpcykge1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBUZXh0LnByb3RvdHlwZS5jdXJyZW50Q291bnQgKz0gMTtcbiAgICBUZXh0LnByb3RvdHlwZS5jb3VudCArPSAxO1xuICAgIF90aGlzLmlubmVySFRNTCA9IEhFQVJUU1t0aGlzLnJhbmQgLSAxXSArICcrJyArIChUZXh0LnByb3RvdHlwZS5jdXJyZW50Q291bnQgfHwgJycpO1xuICAgIF90aGlzLmNsYXNzTmFtZSA9ICd0ZXh0JztcbiAgICBfdGhpcy5zdHlsZS50b3AgPSB0aGlzLnkgLSAyMCArICdweCc7XG4gICAgX3RoaXMuc3R5bGUubGVmdCA9IHRoaXMueCAtIDIwICsgJ3B4JztcbiAgICBfdGhpcy5zdHlsZS5hbmltYXRpb24gPSAncmVtb3ZlIDJzJztcbiAgICBib2R5LmFwcGVuZENoaWxkKF90aGlzKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgX3RoaXMuc3R5bGUudG9wID0gdGhpcy55IC0gMjAgLSBpICsgJ3B4JztcbiAgICAgIGkrKztcbiAgICB9LCAxMCk7XG4gICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgVGV4dC5wcm90b3R5cGUuY3VycmVudENvdW50ID0gMDtcbiAgICB9LCAyMDAwKTtcbiAgfTtcbiAgVGV4dC5wcm90b3R5cGUub3V0ID0gZnVuY3Rpb24gKF90aGlzKSB7XG4gICAgX3RoaXMucmVtb3ZlKCk7XG4gIH07XG4gIC8v6K6+572u6ZqP5py66aKc6ImyXG4gIFRleHQucHJvdG90eXBlLmdldFJhbmRvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYWxsVHlwZUFyciA9IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICdhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZiddOyAvLzE26L+b5Yi26aKc6ImyXG4gICAgbGV0IGNvbG9yID0gJyMnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAvL+maj+acuueUn+aIkOS4gOS4qjAtMTbnmoTmlbBcbiAgICAgIHZhciByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbGxUeXBlQXJyLmxlbmd0aCk7XG4gICAgICBjb2xvciArPSBhbGxUeXBlQXJyW3JhbmRvbV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjsgLy/ov5Tlm57pmo/mnLrnlJ/miJDnmoTpopzoibJcbiAgfTtcbiAgLy8gd2luZG93Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICAvLyAgIGxldCB4ID0gZS5wYWdlWDtcbiAgLy8gICBsZXQgeSA9IGUucGFnZVk7IC8v5b2T5YmN5Z2Q5qCHXG4gIC8vICAgbGV0IHJhbmRDb250ZW50ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBIRUFSVFMubGVuZ3RoKTtcbiAgLy8gICBsZXQgdGV4dCA9IG5ldyBUZXh0KHgsIHksIHJhbmRDb250ZW50KTtcbiAgLy8gICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgLy8gICBzcGFuLnN0eWxlLmNvbG9yID0gdGV4dC5nZXRSYW5kb20oKTtcbiAgLy8gICB0ZXh0LmNyZWF0ZShzcGFuKTtcbiAgLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIHRleHQub3V0KHNwYW4pO1xuICAvLyAgIH0sIDE5MDApO1xuICAvLyB9O1xuXG4gIHdpbmRvdy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBsZXQgeCA9IGUucGFnZVg7XG4gICAgbGV0IHkgPSBlLnBhZ2VZOyAvL+W9k+WJjeWdkOagh1xuICAgIGxldCBteVRleHQgPSBuZXcgTXlUZXh0KHgsIHkpO1xuICAgIG15VGV4dC5yZW5kZXIoKTtcbiAgfTtcbn0pO1xuIl19

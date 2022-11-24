(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/* global Fluid */

HTMLElement.prototype.wrap = function (wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};
Fluid.events = {
  registerNavbarEvent: function registerNavbarEvent() {
    var navbar = jQuery('#navbar');
    if (navbar.length === 0) {
      return;
    }
    var submenu = jQuery('#navbar .dropdown-menu');
    if (navbar.offset().top > 0) {
      navbar.removeClass('navbar-dark');
      submenu.removeClass('navbar-dark');
    }
    Fluid.utils.listenScroll(function () {
      navbar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
      submenu[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('dropdown-collapse');
      if (navbar.offset().top > 0) {
        navbar.removeClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      } else {
        navbar.addClass('navbar-dark');
        submenu.removeClass('navbar-dark');
      }
    });
    jQuery('#navbar-toggler-btn').on('click', function () {
      jQuery('.animated-icon').toggleClass('open');
      jQuery('#navbar').toggleClass('navbar-col-show');
    });
  },
  registerParallaxEvent: function registerParallaxEvent() {
    var ph = jQuery('#banner[parallax="true"]');
    if (ph.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var parallax = function parallax() {
      var pxv = jQuery(window).scrollTop() / 5;
      var offset = parseInt(board.css('margin-top'), 10);
      var max = 96 + offset;
      if (pxv > max) {
        pxv = max;
      }
      ph.css({
        transform: 'translate3d(0,' + pxv + 'px,0)'
      });
      var sideCol = jQuery('.side-col');
      if (sideCol) {
        sideCol.css({
          'padding-top': pxv + 'px'
        });
      }
    };
    Fluid.utils.listenScroll(parallax);
  },
  registerScrollDownArrowEvent: function registerScrollDownArrowEvent() {
    var scrollbar = jQuery('.scroll-down-bar');
    if (scrollbar.length === 0) {
      return;
    }
    scrollbar.on('click', function () {
      Fluid.utils.scrollToElement('#board', -jQuery('#navbar').height());
    });
  },
  registerScrollTopArrowEvent: function registerScrollTopArrowEvent() {
    var topArrow = jQuery('#scroll-top-button');
    if (topArrow.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Position
    var setTopArrowPos = function setTopArrowPos() {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
        'right': right - 64 + 'px'
      });
    };
    setTopArrowPos();
    jQuery(window).resize(setTopArrowPos);
    // Display
    var headerHeight = board.offset().top;
    Fluid.utils.listenScroll(function () {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      topArrow.css({
        'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
      });
    });
    // Click
    topArrow.on('click', function () {
      jQuery('body,html').animate({
        scrollTop: 0,
        easing: 'swing'
      });
    });
  },
  registerImageLoadedEvent: function registerImageLoadedEvent() {
    if (!('NProgress' in window)) {
      return;
    }
    var bg = document.getElementById('banner');
    if (bg) {
      var src = bg.style.backgroundImage;
      var url = src.match(/\((.*?)\)/)[1].replace(/(['"])/g, '');
      var img = new Image();
      img.onload = function () {
        window.NProgress && window.NProgress.inc(0.2);
      };
      img.src = url;
      if (img.complete) {
        img.onload();
      }
    }
    var notLazyImages = jQuery('main img:not([lazyload])');
    var total = notLazyImages.length;
    var _iterator = _createForOfIteratorHelper(notLazyImages),
      _step;
    try {
      var _loop = function _loop() {
        var img = _step.value;
        var old = img.onload;
        img.onload = function () {
          old && old();
          window.NProgress && window.NProgress.inc(0.5 / total);
        };
        if (img.complete) {
          img.onload();
        }
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  registerRefreshCallback: function registerRefreshCallback(callback) {
    if (!Array.isArray(Fluid.events._refreshCallbacks)) {
      Fluid.events._refreshCallbacks = [];
    }
    Fluid.events._refreshCallbacks.push(callback);
  },
  refresh: function refresh() {
    if (Array.isArray(Fluid.events._refreshCallbacks)) {
      var _iterator2 = _createForOfIteratorHelper(Fluid.events._refreshCallbacks),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var callback = _step2.value;
          if (callback instanceof Function) {
            callback();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  },
  billboard: function billboard() {
    if (!('console' in window)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log("\n------------------------------------------------\n|                                              |\n|     ________  __            _        __      |\n|    |_   __  |[  |          (_)      |  ]     |\n|      | |_ \\_| | | __   _   __   .--.| |      |\n|      |  _|    | |[  | | | [  |/ /'`\\' |      |\n|     _| |_     | | | \\_/ |, | || \\__/  |      |\n|    |_____|   [___]'.__.'_/[___]'.__.;__]     |\n|                                              |\n|           Powered by Hexo x Fluid            |\n|         GitHub: https://git.io/JqpVD         |\n|                                              |\n------------------------------------------------\n    ");
  }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvZmx1aWQvc291cmNlL2pzL2V2ZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUE7O0FBRUEsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBUyxPQUFPLEVBQUU7RUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztFQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7RUFDakMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDM0IsQ0FBQztBQUVELEtBQUssQ0FBQyxNQUFNLEdBQUc7RUFFYixtQkFBbUIsRUFBRSwrQkFBVztJQUM5QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzlCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdkI7SUFDRjtJQUNBLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztJQUM5QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO01BQzNCLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO01BQ2pDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3BDO0lBQ0EsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBVztNQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsVUFBVSxHQUFHLGFBQWEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO01BQ2pGLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsbUJBQW1CLENBQUM7TUFDbkYsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtRQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUNqQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztNQUNwQyxDQUFDLE1BQU07UUFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUM5QixPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztNQUNwQztJQUNGLENBQUMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUNuRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO01BQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0VBQ0osQ0FBQztFQUVELHFCQUFxQixFQUFFLGlDQUFXO0lBQ2hDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQztJQUMzQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ25CO0lBQ0Y7SUFDQSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQzVCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdEI7SUFDRjtJQUNBLElBQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxHQUFjO01BQ3hCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO01BQ3hDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUNsRCxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsTUFBTTtNQUNyQixJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDYixHQUFHLEdBQUcsR0FBRztNQUNYO01BQ0EsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNMLFNBQVMsRUFBRSxnQkFBZ0IsR0FBRyxHQUFHLEdBQUc7TUFDdEMsQ0FBQyxDQUFDO01BQ0YsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztNQUNqQyxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUM7VUFDVixhQUFhLEVBQUUsR0FBRyxHQUFHO1FBQ3ZCLENBQUMsQ0FBQztNQUNKO0lBQ0YsQ0FBQztJQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztFQUNwQyxDQUFDO0VBRUQsNEJBQTRCLEVBQUUsd0NBQVc7SUFDdkMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0lBQzFDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDMUI7SUFDRjtJQUNBLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVc7TUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BFLENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRCwyQkFBMkIsRUFBRSx1Q0FBVztJQUN0QyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUM7SUFDM0MsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUN6QjtJQUNGO0lBQ0EsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUM1QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ3RCO0lBQ0Y7SUFDQSxJQUFJLFVBQVUsR0FBRyxLQUFLO0lBQ3RCLElBQUksYUFBYSxHQUFHLEtBQUs7SUFDekI7SUFDQSxJQUFJLGNBQWMsR0FBRyxTQUFqQixjQUFjLEdBQWM7TUFDOUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7TUFDbkQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXO01BQ3pDLElBQUksS0FBSyxHQUFHLFNBQVMsR0FBRyxVQUFVO01BQ2xDLFVBQVUsR0FBRyxLQUFLLElBQUksRUFBRTtNQUN4QixRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ1gsUUFBUSxFQUFFLFVBQVUsSUFBSSxhQUFhLEdBQUcsTUFBTSxHQUFHLE9BQU87UUFDeEQsT0FBTyxFQUFHLEtBQUssR0FBRyxFQUFFLEdBQUc7TUFDekIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELGNBQWMsRUFBRTtJQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUNyQztJQUNBLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHO0lBQ3JDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVc7TUFDbEMsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTO01BQy9FLGFBQWEsR0FBRyxZQUFZLElBQUksWUFBWTtNQUM1QyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ1gsUUFBUSxFQUFFLFVBQVUsSUFBSSxhQUFhLEdBQUcsTUFBTSxHQUFHO01BQ25ELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUNGO0lBQ0EsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFCLFNBQVMsRUFBRSxDQUFDO1FBQ1osTUFBTSxFQUFLO01BQ2IsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQztFQUVELHdCQUF3QixFQUFFLG9DQUFXO0lBQ25DLElBQUksRUFBRSxXQUFXLElBQUksTUFBTSxDQUFDLEVBQUU7TUFBRTtJQUFRO0lBRXhDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO0lBQzFDLElBQUksRUFBRSxFQUFFO01BQ04sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlO01BQ2xDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7TUFDMUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7TUFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxZQUFXO1FBQ3RCLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO01BQy9DLENBQUM7TUFDRCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUc7TUFDYixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7UUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO01BQUU7SUFDcEM7SUFFQSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsMEJBQTBCLENBQUM7SUFDdEQsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLE1BQU07SUFBQywyQ0FDZixhQUFhO01BQUE7SUFBQTtNQUFBO1FBQUEsSUFBcEIsR0FBRztRQUNaLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsWUFBVztVQUN0QixHQUFHLElBQUksR0FBRyxFQUFFO1VBQ1osTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7VUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQUU7TUFBQztNQU5yQyxvREFBaUM7UUFBQTtNQU9qQztJQUFDO01BQUE7SUFBQTtNQUFBO0lBQUE7RUFDSCxDQUFDO0VBRUQsdUJBQXVCLEVBQUUsaUNBQVMsUUFBUSxFQUFFO0lBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRTtNQUNsRCxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLEVBQUU7SUFDckM7SUFDQSxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDL0MsQ0FBQztFQUVELE9BQU8sRUFBRSxtQkFBVztJQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO01BQUEsNENBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCO1FBQUE7TUFBQTtRQUFuRCx1REFBcUQ7VUFBQSxJQUE1QyxRQUFRO1VBQ2YsSUFBSSxRQUFRLFlBQVksUUFBUSxFQUFFO1lBQ2hDLFFBQVEsRUFBRTtVQUNaO1FBQ0Y7TUFBQztRQUFBO01BQUE7UUFBQTtNQUFBO0lBQ0g7RUFDRixDQUFDO0VBRUQsU0FBUyxFQUFFLHFCQUFXO0lBQ3BCLElBQUksRUFBRSxTQUFTLElBQUksTUFBTSxDQUFDLEVBQUU7TUFDMUI7SUFDRjtJQUNBO0lBQ0EsT0FBTyxDQUFDLEdBQUcsd3BCQWNUO0VBQ0o7QUFDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogZ2xvYmFsIEZsdWlkICovXG5cbkhUTUxFbGVtZW50LnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24od3JhcHBlcikge1xuICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHRoaXMpO1xuICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcyk7XG59O1xuXG5GbHVpZC5ldmVudHMgPSB7XG5cbiAgcmVnaXN0ZXJOYXZiYXJFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5hdmJhciA9IGpRdWVyeSgnI25hdmJhcicpO1xuICAgIGlmIChuYXZiYXIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzdWJtZW51ID0galF1ZXJ5KCcjbmF2YmFyIC5kcm9wZG93bi1tZW51Jyk7XG4gICAgaWYgKG5hdmJhci5vZmZzZXQoKS50b3AgPiAwKSB7XG4gICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ25hdmJhci1kYXJrJyk7XG4gICAgICBzdWJtZW51LnJlbW92ZUNsYXNzKCduYXZiYXItZGFyaycpO1xuICAgIH1cbiAgICBGbHVpZC51dGlscy5saXN0ZW5TY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICBuYXZiYXJbbmF2YmFyLm9mZnNldCgpLnRvcCA+IDUwID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKCd0b3AtbmF2LWNvbGxhcHNlJyk7XG4gICAgICBzdWJtZW51W25hdmJhci5vZmZzZXQoKS50b3AgPiA1MCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgnZHJvcGRvd24tY29sbGFwc2UnKTtcbiAgICAgIGlmIChuYXZiYXIub2Zmc2V0KCkudG9wID4gMCkge1xuICAgICAgICBuYXZiYXIucmVtb3ZlQ2xhc3MoJ25hdmJhci1kYXJrJyk7XG4gICAgICAgIHN1Ym1lbnUucmVtb3ZlQ2xhc3MoJ25hdmJhci1kYXJrJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYXZiYXIuYWRkQ2xhc3MoJ25hdmJhci1kYXJrJyk7XG4gICAgICAgIHN1Ym1lbnUucmVtb3ZlQ2xhc3MoJ25hdmJhci1kYXJrJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgalF1ZXJ5KCcjbmF2YmFyLXRvZ2dsZXItYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBqUXVlcnkoJy5hbmltYXRlZC1pY29uJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIGpRdWVyeSgnI25hdmJhcicpLnRvZ2dsZUNsYXNzKCduYXZiYXItY29sLXNob3cnKTtcbiAgICB9KTtcbiAgfSxcblxuICByZWdpc3RlclBhcmFsbGF4RXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwaCA9IGpRdWVyeSgnI2Jhbm5lcltwYXJhbGxheD1cInRydWVcIl0nKTtcbiAgICBpZiAocGgubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBib2FyZCA9IGpRdWVyeSgnI2JvYXJkJyk7XG4gICAgaWYgKGJvYXJkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcGFyYWxsYXggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBweHYgPSBqUXVlcnkod2luZG93KS5zY3JvbGxUb3AoKSAvIDU7XG4gICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQoYm9hcmQuY3NzKCdtYXJnaW4tdG9wJyksIDEwKTtcbiAgICAgIHZhciBtYXggPSA5NiArIG9mZnNldDtcbiAgICAgIGlmIChweHYgPiBtYXgpIHtcbiAgICAgICAgcHh2ID0gbWF4O1xuICAgICAgfVxuICAgICAgcGguY3NzKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwnICsgcHh2ICsgJ3B4LDApJ1xuICAgICAgfSk7XG4gICAgICB2YXIgc2lkZUNvbCA9IGpRdWVyeSgnLnNpZGUtY29sJyk7XG4gICAgICBpZiAoc2lkZUNvbCkge1xuICAgICAgICBzaWRlQ29sLmNzcyh7XG4gICAgICAgICAgJ3BhZGRpbmctdG9wJzogcHh2ICsgJ3B4J1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIEZsdWlkLnV0aWxzLmxpc3RlblNjcm9sbChwYXJhbGxheCk7XG4gIH0sXG5cbiAgcmVnaXN0ZXJTY3JvbGxEb3duQXJyb3dFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjcm9sbGJhciA9IGpRdWVyeSgnLnNjcm9sbC1kb3duLWJhcicpO1xuICAgIGlmIChzY3JvbGxiYXIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNjcm9sbGJhci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIEZsdWlkLnV0aWxzLnNjcm9sbFRvRWxlbWVudCgnI2JvYXJkJywgLWpRdWVyeSgnI25hdmJhcicpLmhlaWdodCgpKTtcbiAgICB9KTtcbiAgfSxcblxuICByZWdpc3RlclNjcm9sbFRvcEFycm93RXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0b3BBcnJvdyA9IGpRdWVyeSgnI3Njcm9sbC10b3AtYnV0dG9uJyk7XG4gICAgaWYgKHRvcEFycm93Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYm9hcmQgPSBqUXVlcnkoJyNib2FyZCcpO1xuICAgIGlmIChib2FyZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBvc0Rpc3BsYXkgPSBmYWxzZTtcbiAgICB2YXIgc2Nyb2xsRGlzcGxheSA9IGZhbHNlO1xuICAgIC8vIFBvc2l0aW9uXG4gICAgdmFyIHNldFRvcEFycm93UG9zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYm9hcmRSaWdodCA9IGJvYXJkWzBdLmdldENsaWVudFJlY3RzKClbMF0ucmlnaHQ7XG4gICAgICB2YXIgYm9keVdpZHRoID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcbiAgICAgIHZhciByaWdodCA9IGJvZHlXaWR0aCAtIGJvYXJkUmlnaHQ7XG4gICAgICBwb3NEaXNwbGF5ID0gcmlnaHQgPj0gNTA7XG4gICAgICB0b3BBcnJvdy5jc3Moe1xuICAgICAgICAnYm90dG9tJzogcG9zRGlzcGxheSAmJiBzY3JvbGxEaXNwbGF5ID8gJzIwcHgnIDogJy02MHB4JyxcbiAgICAgICAgJ3JpZ2h0JyA6IHJpZ2h0IC0gNjQgKyAncHgnXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHNldFRvcEFycm93UG9zKCk7XG4gICAgalF1ZXJ5KHdpbmRvdykucmVzaXplKHNldFRvcEFycm93UG9zKTtcbiAgICAvLyBEaXNwbGF5XG4gICAgdmFyIGhlYWRlckhlaWdodCA9IGJvYXJkLm9mZnNldCgpLnRvcDtcbiAgICBGbHVpZC51dGlscy5saXN0ZW5TY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgc2Nyb2xsRGlzcGxheSA9IHNjcm9sbEhlaWdodCA+PSBoZWFkZXJIZWlnaHQ7XG4gICAgICB0b3BBcnJvdy5jc3Moe1xuICAgICAgICAnYm90dG9tJzogcG9zRGlzcGxheSAmJiBzY3JvbGxEaXNwbGF5ID8gJzIwcHgnIDogJy02MHB4J1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gQ2xpY2tcbiAgICB0b3BBcnJvdy5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGpRdWVyeSgnYm9keSxodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgZWFzaW5nICAgOiAnc3dpbmcnXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICByZWdpc3RlckltYWdlTG9hZGVkRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghKCdOUHJvZ3Jlc3MnIGluIHdpbmRvdykpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgYmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJyk7XG4gICAgaWYgKGJnKSB7XG4gICAgICB2YXIgc3JjID0gYmcuc3R5bGUuYmFja2dyb3VuZEltYWdlO1xuICAgICAgdmFyIHVybCA9IHNyYy5tYXRjaCgvXFwoKC4qPylcXCkvKVsxXS5yZXBsYWNlKC8oWydcIl0pL2csICcnKTtcbiAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93Lk5Qcm9ncmVzcyAmJiB3aW5kb3cuTlByb2dyZXNzLmluYygwLjIpO1xuICAgICAgfTtcbiAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgICBpZiAoaW1nLmNvbXBsZXRlKSB7IGltZy5vbmxvYWQoKTsgfVxuICAgIH1cblxuICAgIHZhciBub3RMYXp5SW1hZ2VzID0galF1ZXJ5KCdtYWluIGltZzpub3QoW2xhenlsb2FkXSknKTtcbiAgICB2YXIgdG90YWwgPSBub3RMYXp5SW1hZ2VzLmxlbmd0aDtcbiAgICBmb3IgKGNvbnN0IGltZyBvZiBub3RMYXp5SW1hZ2VzKSB7XG4gICAgICBjb25zdCBvbGQgPSBpbWcub25sb2FkO1xuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBvbGQgJiYgb2xkKCk7XG4gICAgICAgIHdpbmRvdy5OUHJvZ3Jlc3MgJiYgd2luZG93Lk5Qcm9ncmVzcy5pbmMoMC41IC8gdG90YWwpO1xuICAgICAgfTtcbiAgICAgIGlmIChpbWcuY29tcGxldGUpIHsgaW1nLm9ubG9hZCgpOyB9XG4gICAgfVxuICB9LFxuXG4gIHJlZ2lzdGVyUmVmcmVzaENhbGxiYWNrOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShGbHVpZC5ldmVudHMuX3JlZnJlc2hDYWxsYmFja3MpKSB7XG4gICAgICBGbHVpZC5ldmVudHMuX3JlZnJlc2hDYWxsYmFja3MgPSBbXTtcbiAgICB9XG4gICAgRmx1aWQuZXZlbnRzLl9yZWZyZXNoQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9LFxuXG4gIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KEZsdWlkLmV2ZW50cy5fcmVmcmVzaENhbGxiYWNrcykpIHtcbiAgICAgIGZvciAodmFyIGNhbGxiYWNrIG9mIEZsdWlkLmV2ZW50cy5fcmVmcmVzaENhbGxiYWNrcykge1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYmlsbGJvYXJkOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoISgnY29uc29sZScgaW4gd2luZG93KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGBcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG58ICAgICBfX19fX19fXyAgX18gICAgICAgICAgICBfICAgICAgICBfXyAgICAgIHxcbnwgICAgfF8gICBfXyAgfFsgIHwgICAgICAgICAgKF8pICAgICAgfCAgXSAgICAgfFxufCAgICAgIHwgfF8gXFxcXF98IHwgfCBfXyAgIF8gICBfXyAgIC4tLS58IHwgICAgICB8XG58ICAgICAgfCAgX3wgICAgfCB8WyAgfCB8IHwgWyAgfC8gLydcXGBcXFxcJyB8ICAgICAgfFxufCAgICAgX3wgfF8gICAgIHwgfCB8IFxcXFxfLyB8LCB8IHx8IFxcXFxfXy8gIHwgICAgICB8XG58ICAgIHxfX19fX3wgICBbX19fXScuX18uJ18vW19fX10nLl9fLjtfX10gICAgIHxcbnwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxufCAgICAgICAgICAgUG93ZXJlZCBieSBIZXhvIHggRmx1aWQgICAgICAgICAgICB8XG58ICAgICAgICAgR2l0SHViOiBodHRwczovL2dpdC5pby9KcXBWRCAgICAgICAgIHxcbnwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYCk7XG4gIH1cbn07XG4iXX0=

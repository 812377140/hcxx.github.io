(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5658)}])},5658:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return u},default:function(){return c}});var i=n(5893),$=n(7294),a=1e3/60,s={touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,mouseleave:2},_=function(){function t(e){var n=e.container,i=e.muted,$=this;!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,t),this.count=0,this.v={r:12,y:2,t:0,w:0,d:.988},this.inertia=.08,this.sticky=.1,this.maxR=60,this.maxY=110,this.last=null,this.rotate=0,this.initiated=!1,this.pageX=0,this.pageY=0,this.height=800,this.width=500,this.imageHeight=300,this.imageWidth=197,this.setMuted=function(t){Object.values($.audio).forEach(function(e){e.muted=!0,e.play(),e.pause(),e.muted=t}),$.muted=t},this.dispose=function(){var t=$.outline,e=$.container;t.removeEventListener("mousedown",$.start),t.removeEventListener("touchstart",$.start),document.removeEventListener("mousemove",$.move),document.removeEventListener("touchmove",$.move),document.removeEventListener("mouseup",$.end),document.removeEventListener("mouseleave",$.end),document.removeEventListener("touchcancel",$.end),document.removeEventListener("touchend",$.end),e.removeChild(t),e.removeChild($.canvas)},this.start=function(t){t.preventDefault();var e=s[t.type];if(!$.initiated||$.initiated===e){$.initiated=e;var n="targetTouches"in t?t.touches[0]:t;$.pageX=n.pageX,$.pageY=n.pageY;var i=$.audio,a=i.transient,_=i.dancing,r=i.crazy;a.muted=$.muted,_.muted=$.muted,r.muted=$.muted}},this.move=function(t){if(s[t.type]===$.initiated){var e,n="targetTouches"in t?t.touches[0]:t,i=$.container.getBoundingClientRect(),a=i.left+i.width/2,_=n.pageX,r=n.pageY-$.pageY,o=(_-a)*$.sticky;o=Math.max(-$.maxR,o),o=Math.min($.maxR,o),r=r*$.sticky*3,r=Math.max(-$.maxY,r),r=Math.min($.maxY,r),$.v.r=o,$.v.y=r,$.v.w=0,$.v.t=0,$.draw()}},this.end=function(t){s[t.type]===$.initiated&&($.initiated=!1,$.run(),$.play())},this.play=function(){$.count++;var t=$.audio,e=t.transient,n=t.dancing,i=t.crazy;$.count>2?($.count=0,i.currentTime=0,i.play(),e.pause(),n.pause()):6>=Math.abs($.v.r)?(e.currentTime=0,e.play(),n.pause(),i.pause()):Math.abs($.v.r)>6&&30>=Math.abs($.v.r)?(n.currentTime=0,n.play(),e.pause(),i.pause()):Math.abs($.v.r)>30&&(i.currentTime=0,i.play(),e.pause(),n.pause())},this.draw=function(){var t=$.v,e=t.r,n=t.y,i=5*e;$.image.style.transform="rotate(".concat(e,"deg) translateX(").concat(i,"px) translateY(").concat(n,"px)");var a=$.context,s=$.width,_=$.height;a.clearRect(0,0,s,_),a.save(),a.strokeStyle="#182562",a.lineWidth=10,a.beginPath(),a.moveTo($.width/2,$.height);var r=Math.PI/180*e,o=Math.cos(r),u=Math.sin(r),c=o*i-u*(150+n)+$.width/2,h=u*i+o*(150+n)+$.height/2+$.imageHeight/2-150;a.quadraticCurveTo($.width/2,$.height-100,c,h),a.stroke(),a.restore()},this.run=function(){if(!$.initiated){var t=Date.now(),e=$.inertia,n=$.last?t-$.last:16;n<16&&(e=e/a*n),$.last=t;var i=$.v,s=i.r,_=i.y,r=i.t,o=i.w,u=i.d;o=o-2*s-$.rotate,s+=o*e*1.2,$.v.w=o*u,$.v.r=s,r-=2*_,_+=r*e*2,$.v.t=r*u,$.v.y=_,!(.1>Math.max(Math.abs($.v.w),Math.abs($.v.r),Math.abs($.v.t),Math.abs($.v.y)))&&($.draw(),requestAnimationFrame($.run))}},this.muted=void 0!==i&&i,this.audio={transient:new Audio("".concat("/zhiyin","/j.mp3")),dancing:new Audio("".concat("/zhiyin","/jntm.mp3")),crazy:new Audio("".concat("/zhiyin","/ngm.mp3"))};var _=this.height,r=this.width;this.container=n,n.style.position="relative",n.style.height=_+"px",n.style.width=r+"px";var o=this.image=new Image(197,300);o.src="kun.png";var u=this.outline=document.createElement("div");u.style.position="absolute",u.style.left="50%",u.style.top="50%",u.style.transform="translate(-50%, -50%)",u.style.display="flex",u.appendChild(o);var c=window.devicePixelRatio||1,h=this.canvas=document.createElement("canvas");h.width=r*c,h.height=_*c,h.style.width=r+"px",h.style.height=_+"px";var d=this.context=h.getContext("2d");d.setTransform(1,0,0,1,0,0),d.scale(c,c),this.mount()}return t.prototype.mount=function(){var t=this.outline,e=this.container;t.addEventListener("mousedown",this.start),t.addEventListener("touchstart",this.start),document.addEventListener("mousemove",this.move),document.addEventListener("touchmove",this.move),document.addEventListener("mouseup",this.end),document.addEventListener("mouseleave",this.end),document.addEventListener("touchcancel",this.end),document.addEventListener("touchend",this.end),e.appendChild(t),e.appendChild(this.canvas)},t}(),r=n(214),o=n.n(r),u=!0,c=function(){var t=(0,$.useRef)(null),e=(0,$.useRef)(null),n=(0,$.useState)(!0),a=n[0],s=n[1];(0,$.useEffect)(function(){var n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);s(n);var i=e.current=new _({container:t.current,muted:n});return i.run(),function(){i.dispose()}},[]);var r=(0,$.useCallback)(function(){s(function(t){return!t})},[]);return(0,$.useMemo)(function(){var t;null===(t=e.current)||void 0===t||t.setMuted(a)},[a]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:o().options,children:(0,i.jsx)("button",{className:o().bgm,onClick:r,children:a?(0,i.jsx)("svg",{width:"30px",height:"30",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{fill:"#888",d:"M616.576 730.976c-5.056 5.216-10.08 10.432-14.304 16.16-24.096 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.752-3.456 63.904-10.304 9.632-3.136 18.784-6.816 27.424-11.008L616.576 730.976zM416 273.408l0-8.96 416-69.312 0 476.192 64 61.216L896 160c0-1.056-0.512-1.984-0.608-3.008-0.032-1.664 0.448-3.232 0.16-4.896-2.88-17.44-19.424-29.408-36.8-26.304l-480 80C370.24 207.2 363.2 211.936 358.4 218.336L416 273.408zM352 477.92l0 207.68c-20.128-9.376-43.648-14.784-69.408-14.784-21.28 0-42.816 3.456-63.968 10.336-39.584 12.8-73.568 36.224-95.584 65.984-24.096 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.752-3.456 63.904-10.304 58.656-19.04 100.32-59.2 115.04-103.808C413.92 811.328 416 806.016 416 800l0-5.216c1.056-8.512 1.056-17.024 0-25.6l0-230.048L352 477.92zM928 928c-7.968 0-15.904-2.944-22.112-8.864l-736-704C157.12 202.912 156.672 182.656 168.864 169.888c12.192-12.736 32.48-13.216 45.248-0.992l736 704c12.736 12.224 13.216 32.48 0.992 45.248C944.832 924.672 936.448 928 928 928z"})}):(0,i.jsx)("svg",{width:"30px",height:"30px",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{fill:"#333333",d:"M895.456 770.56C895.552 769.696 896 768.896 896 768L896 160c0-1.056-0.512-1.984-0.608-3.008-0.032-1.664 0.448-3.232 0.16-4.928-2.88-17.408-19.328-29.184-36.8-26.304l-480 80c-17.408 2.912-29.216 19.392-26.304 36.832 0.256 1.472 1.024 2.656 1.44 4.032C352.96 249.664 352 252.672 352 256l0 429.6c-20.128-9.376-43.648-14.784-69.408-14.784-21.312 0-42.816 3.456-63.968 10.336-39.616 12.8-73.536 36.224-95.584 65.984-24.064 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.72-3.456 63.904-10.304 58.656-19.04 100.288-59.2 115.04-103.808C413.888 811.328 416 806.016 416 800l0-5.312c1.056-8.48 1.056-16.96 0-25.472L416 264.448l416-69.344 0 490.88c-20.32-9.632-44.096-15.2-70.176-15.2-21.28 0-42.816 3.456-63.968 10.336-39.584 12.8-73.568 36.224-95.584 65.984-24.096 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.752-3.456 63.904-10.304C853.472 894.56 902.176 831.68 895.456 770.56z"})})})}),(0,i.jsx)("div",{className:o().container,children:(0,i.jsx)("div",{className:o().stage,ref:t})})]})}},214:function(t){t.exports={container:"Home_container__bCOhY",stage:"Home_stage__80p1Q",options:"Home_options__Lxd7W",bgm:"Home_bgm__ro3pg",mute:"Home_mute__Q0jOB",github:"Home_github__cSqgs"}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=8312)}),_N_E=t.O()}]);
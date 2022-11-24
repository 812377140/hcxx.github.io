(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* global Fluid */

/**
 * Modified from https://blog.skk.moe/post/hello-darkmode-my-old-friend/
 */
(function (window, document) {
  var rootElement = document.documentElement;
  var colorSchemaStorageKey = 'Fluid_Color_Scheme';
  var colorSchemaMediaQueryKey = '--color-mode';
  var userColorSchemaAttributeName = 'data-user-color-scheme';
  var defaultColorSchemaAttributeName = 'data-default-color-scheme';
  var colorToggleButtonSelector = '#color-toggle-btn';
  var colorToggleIconSelector = '#color-toggle-icon';
  function setLS(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }
  function removeLS(k) {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  }
  function getLS(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }
  function getSchemaFromHTML() {
    var res = rootElement.getAttribute(defaultColorSchemaAttributeName);
    if (typeof res === 'string') {
      return res.replace(/["'\s]/g, '');
    }
    return null;
  }
  function getSchemaFromCSSMediaQuery() {
    var res = getComputedStyle(rootElement).getPropertyValue(colorSchemaMediaQueryKey);
    if (typeof res === 'string') {
      return res.replace(/["'\s]/g, '');
    }
    return null;
  }
  function resetSchemaAttributeAndLS() {
    rootElement.setAttribute(userColorSchemaAttributeName, getDefaultColorSchema());
    removeLS(colorSchemaStorageKey);
  }
  var validColorSchemaKeys = {
    dark: true,
    light: true
  };
  function getDefaultColorSchema() {
    // 取默认字段的值
    var schema = getSchemaFromHTML();
    // 如果明确指定了 schema 则返回
    if (validColorSchemaKeys[schema]) {
      return schema;
    }
    // 默认优先按 prefers-color-scheme
    schema = getSchemaFromCSSMediaQuery();
    if (validColorSchemaKeys[schema]) {
      return schema;
    }
    // 否则按本地时间是否大于 18 点或凌晨 0 ~ 6 点
    var hours = new Date().getHours();
    if (hours >= 18 || hours >= 0 && hours <= 6) {
      return 'dark';
    }
    return 'light';
  }
  function applyCustomColorSchemaSettings(schema) {
    // 接受从「开关」处传来的模式，或者从 localStorage 读取，否则按默认设置值
    var current = schema || getLS(colorSchemaStorageKey) || getDefaultColorSchema();
    if (current === getDefaultColorSchema()) {
      // 当用户切换的显示模式和默认模式相同时，则恢复为自动模式
      resetSchemaAttributeAndLS();
    } else if (validColorSchemaKeys[current]) {
      rootElement.setAttribute(userColorSchemaAttributeName, current);
    } else {
      // 特殊情况重置
      resetSchemaAttributeAndLS();
      return;
    }

    // 根据当前模式设置图标
    setButtonIcon(current);

    // 设置代码高亮
    setHighlightCSS(current);

    // 设置其他应用
    setApplications(current);
  }
  var invertColorSchemaObj = {
    dark: 'light',
    light: 'dark'
  };
  function getIconClass(scheme) {
    return 'icon-' + scheme;
  }
  function toggleCustomColorSchema() {
    var currentSetting = getLS(colorSchemaStorageKey);
    if (validColorSchemaKeys[currentSetting]) {
      // 从 localStorage 中读取模式，并取相反的模式
      currentSetting = invertColorSchemaObj[currentSetting];
    } else if (currentSetting === null) {
      // 当 localStorage 中没有相关值，或者 localStorage 抛了 Error
      // 先按照按钮的状态进行切换
      var iconElement = document.querySelector(colorToggleIconSelector);
      if (iconElement) {
        currentSetting = iconElement.getAttribute('data');
      }
      if (!iconElement || !validColorSchemaKeys[currentSetting]) {
        // 当 localStorage 中没有相关值，或者 localStorage 抛了 Error，则读取默认值并切换到相反的模式
        currentSetting = invertColorSchemaObj[getSchemaFromCSSMediaQuery()];
      }
    } else {
      return;
    }
    // 将相反的模式写入 localStorage
    setLS(colorSchemaStorageKey, currentSetting);
    return currentSetting;
  }
  function setButtonIcon(schema) {
    if (validColorSchemaKeys[schema]) {
      // 切换图标
      var icon = getIconClass('dark');
      if (schema) {
        icon = getIconClass(schema);
      }
      var iconElement = document.querySelector(colorToggleIconSelector);
      if (iconElement) {
        iconElement.setAttribute('class', 'iconfont ' + icon);
        iconElement.setAttribute('data', invertColorSchemaObj[schema]);
      } else {
        // 如果图标不存在则说明图标还没加载出来，等到页面全部加载再尝试切换
        Fluid.utils.waitElementLoaded(colorToggleIconSelector, function () {
          var iconElement = document.querySelector(colorToggleIconSelector);
          if (iconElement) {
            iconElement.setAttribute('class', 'iconfont ' + icon);
            iconElement.setAttribute('data', invertColorSchemaObj[schema]);
          }
        });
      }
    }
  }
  function setHighlightCSS(schema) {
    // 启用对应的代码高亮的样式
    var lightCss = document.getElementById('highlight-css');
    var darkCss = document.getElementById('highlight-css-dark');
    if (schema === 'dark') {
      if (darkCss) {
        darkCss.removeAttribute('disabled');
      }
      if (lightCss) {
        lightCss.setAttribute('disabled', '');
      }
    } else {
      if (lightCss) {
        lightCss.removeAttribute('disabled');
      }
      if (darkCss) {
        darkCss.setAttribute('disabled', '');
      }
    }
    setTimeout(function () {
      // 设置代码块组件样式
      document.querySelectorAll('.markdown-body pre').forEach(function (pre) {
        var cls = Fluid.utils.getBackgroundLightness(pre) >= 0 ? 'code-widget-light' : 'code-widget-dark';
        var widget = pre.querySelector('.code-widget-light, .code-widget-dark');
        if (widget) {
          widget.classList.remove('code-widget-light', 'code-widget-dark');
          widget.classList.add(cls);
        }
      });
    }, 200);
  }
  function setApplications(schema) {
    // 设置 remark42 评论主题
    if (window.REMARK42) {
      window.REMARK42.changeTheme(schema);
    }

    // 设置 cusdis 评论主题
    if (window.CUSDIS) {
      window.CUSDIS.setTheme(schema);
    }

    // 设置 utterances 评论主题
    var utterances = document.querySelector('.utterances-frame');
    if (utterances) {
      var utterancesTheme = schema === 'dark' ? window.UtterancesThemeDark : window.UtterancesThemeLight;
      var message = {
        type: 'set-theme',
        theme: utterancesTheme
      };
      utterances.contentWindow.postMessage(message, 'https://utteranc.es');
    }

    // 设置 giscus 评论主题
    var giscus = document.querySelector('iframe.giscus-frame');
    if (giscus) {
      var giscusTheme = schema === 'dark' ? window.GiscusThemeDark : window.GiscusThemeLight;
      var _message = {
        setConfig: {
          theme: giscusTheme
        }
      };
      giscus.contentWindow.postMessage({
        'giscus': _message
      }, 'https://giscus.app');
    }
  }

  // 当页面加载时，将显示模式设置为 localStorage 中自定义的值（如果有的话）
  applyCustomColorSchemaSettings();
  Fluid.utils.waitElementLoaded(colorToggleIconSelector, function () {
    applyCustomColorSchemaSettings();
    var button = document.querySelector(colorToggleButtonSelector);
    if (button) {
      // 当用户点击切换按钮时，获得新的显示模式、写入 localStorage、并在页面上生效
      button.addEventListener('click', function () {
        applyCustomColorSchemaSettings(toggleCustomColorSchema());
      });
      var icon = document.querySelector(colorToggleIconSelector);
      if (icon) {
        // 光标悬停在按钮上时，切换图标
        button.addEventListener('mouseenter', function () {
          var current = icon.getAttribute('data');
          icon.classList.replace(getIconClass(invertColorSchemaObj[current]), getIconClass(current));
        });
        button.addEventListener('mouseleave', function () {
          var current = icon.getAttribute('data');
          icon.classList.replace(getIconClass(current), getIconClass(invertColorSchemaObj[current]));
        });
      }
    }
  });
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvZmx1aWQvc291cmNlL2pzL2NvbG9yLXNjaGVtYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxVQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUU7RUFDMUIsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGVBQWU7RUFDMUMsSUFBSSxxQkFBcUIsR0FBRyxvQkFBb0I7RUFDaEQsSUFBSSx3QkFBd0IsR0FBRyxjQUFjO0VBQzdDLElBQUksNEJBQTRCLEdBQUcsd0JBQXdCO0VBQzNELElBQUksK0JBQStCLEdBQUcsMkJBQTJCO0VBQ2pFLElBQUkseUJBQXlCLEdBQUcsbUJBQW1CO0VBQ25ELElBQUksdUJBQXVCLEdBQUcsb0JBQW9CO0VBRWxELFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDbkIsSUFBSTtNQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztFQUNmO0VBRUEsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0lBQ25CLElBQUk7TUFDRixZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztFQUNmO0VBRUEsU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQ2hCLElBQUk7TUFDRixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtNQUNWLE9BQU8sSUFBSTtJQUNiO0VBQ0Y7RUFFQSxTQUFTLGlCQUFpQixHQUFHO0lBQzNCLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsK0JBQStCLENBQUM7SUFDbkUsSUFBSSxPQUFPLEdBQUcsS0FBSyxR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MUMsOEJBQThCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztNQUMzRCxDQUFDLENBQUM7TUFDRixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BQzFELElBQUksSUFBSSxFQUFFO1FBQ1I7UUFDQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQVc7VUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7VUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVGLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsWUFBVztVQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztVQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUYsQ0FBQyxDQUFDO01BQ0o7SUFDRjtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyogZ2xvYmFsIEZsdWlkICovXG5cbi8qKlxuICogTW9kaWZpZWQgZnJvbSBodHRwczovL2Jsb2cuc2trLm1vZS9wb3N0L2hlbGxvLWRhcmttb2RlLW15LW9sZC1mcmllbmQvXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG4gIHZhciByb290RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIGNvbG9yU2NoZW1hU3RvcmFnZUtleSA9ICdGbHVpZF9Db2xvcl9TY2hlbWUnO1xuICB2YXIgY29sb3JTY2hlbWFNZWRpYVF1ZXJ5S2V5ID0gJy0tY29sb3ItbW9kZSc7XG4gIHZhciB1c2VyQ29sb3JTY2hlbWFBdHRyaWJ1dGVOYW1lID0gJ2RhdGEtdXNlci1jb2xvci1zY2hlbWUnO1xuICB2YXIgZGVmYXVsdENvbG9yU2NoZW1hQXR0cmlidXRlTmFtZSA9ICdkYXRhLWRlZmF1bHQtY29sb3Itc2NoZW1lJztcbiAgdmFyIGNvbG9yVG9nZ2xlQnV0dG9uU2VsZWN0b3IgPSAnI2NvbG9yLXRvZ2dsZS1idG4nO1xuICB2YXIgY29sb3JUb2dnbGVJY29uU2VsZWN0b3IgPSAnI2NvbG9yLXRvZ2dsZS1pY29uJztcblxuICBmdW5jdGlvbiBzZXRMUyhrLCB2KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGssIHYpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMUyhrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGspO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMUyhrKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTY2hlbWFGcm9tSFRNTCgpIHtcbiAgICB2YXIgcmVzID0gcm9vdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGRlZmF1bHRDb2xvclNjaGVtYUF0dHJpYnV0ZU5hbWUpO1xuICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHJlcy5yZXBsYWNlKC9bXCInXFxzXS9nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2NoZW1hRnJvbUNTU01lZGlhUXVlcnkoKSB7XG4gICAgdmFyIHJlcyA9IGdldENvbXB1dGVkU3R5bGUocm9vdEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICBjb2xvclNjaGVtYU1lZGlhUXVlcnlLZXlcbiAgICApO1xuICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHJlcy5yZXBsYWNlKC9bXCInXFxzXS9nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRTY2hlbWFBdHRyaWJ1dGVBbmRMUygpIHtcbiAgICByb290RWxlbWVudC5zZXRBdHRyaWJ1dGUodXNlckNvbG9yU2NoZW1hQXR0cmlidXRlTmFtZSwgZ2V0RGVmYXVsdENvbG9yU2NoZW1hKCkpO1xuICAgIHJlbW92ZUxTKGNvbG9yU2NoZW1hU3RvcmFnZUtleSk7XG4gIH1cblxuICB2YXIgdmFsaWRDb2xvclNjaGVtYUtleXMgPSB7XG4gICAgZGFyayA6IHRydWUsXG4gICAgbGlnaHQ6IHRydWVcbiAgfTtcblxuICBmdW5jdGlvbiBnZXREZWZhdWx0Q29sb3JTY2hlbWEoKSB7XG4gICAgLy8g5Y+W6buY6K6k5a2X5q6155qE5YC8XG4gICAgdmFyIHNjaGVtYSA9IGdldFNjaGVtYUZyb21IVE1MKCk7XG4gICAgLy8g5aaC5p6c5piO56Gu5oyH5a6a5LqGIHNjaGVtYSDliJnov5Tlm55cbiAgICBpZiAodmFsaWRDb2xvclNjaGVtYUtleXNbc2NoZW1hXSkge1xuICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICB9XG4gICAgLy8g6buY6K6k5LyY5YWI5oyJIHByZWZlcnMtY29sb3Itc2NoZW1lXG4gICAgc2NoZW1hID0gZ2V0U2NoZW1hRnJvbUNTU01lZGlhUXVlcnkoKTtcbiAgICBpZiAodmFsaWRDb2xvclNjaGVtYUtleXNbc2NoZW1hXSkge1xuICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICB9XG4gICAgLy8g5ZCm5YiZ5oyJ5pys5Zyw5pe26Ze05piv5ZCm5aSn5LqOIDE4IOeCueaIluWHjOaZqCAwIH4gNiDngrlcbiAgICB2YXIgaG91cnMgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XG4gICAgaWYgKGhvdXJzID49IDE4IHx8IChob3VycyA+PSAwICYmIGhvdXJzIDw9IDYpKSB7XG4gICAgICByZXR1cm4gJ2RhcmsnO1xuICAgIH1cbiAgICByZXR1cm4gJ2xpZ2h0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5Q3VzdG9tQ29sb3JTY2hlbWFTZXR0aW5ncyhzY2hlbWEpIHtcbiAgICAvLyDmjqXlj5fku47jgIzlvIDlhbPjgI3lpITkvKDmnaXnmoTmqKHlvI/vvIzmiJbogIXku44gbG9jYWxTdG9yYWdlIOivu+WPlu+8jOWQpuWImeaMiem7mOiupOiuvue9ruWAvFxuICAgIHZhciBjdXJyZW50ID0gc2NoZW1hIHx8IGdldExTKGNvbG9yU2NoZW1hU3RvcmFnZUtleSkgfHwgZ2V0RGVmYXVsdENvbG9yU2NoZW1hKCk7XG5cbiAgICBpZiAoY3VycmVudCA9PT0gZ2V0RGVmYXVsdENvbG9yU2NoZW1hKCkpIHtcbiAgICAgIC8vIOW9k+eUqOaIt+WIh+aNoueahOaYvuekuuaooeW8j+WSjOm7mOiupOaooeW8j+ebuOWQjOaXtu+8jOWImeaBouWkjeS4uuiHquWKqOaooeW8j1xuICAgICAgcmVzZXRTY2hlbWFBdHRyaWJ1dGVBbmRMUygpO1xuICAgIH0gZWxzZSBpZiAodmFsaWRDb2xvclNjaGVtYUtleXNbY3VycmVudF0pIHtcbiAgICAgIHJvb3RFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgdXNlckNvbG9yU2NoZW1hQXR0cmlidXRlTmFtZSxcbiAgICAgICAgY3VycmVudFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g54m55q6K5oOF5Ya16YeN572uXG4gICAgICByZXNldFNjaGVtYUF0dHJpYnV0ZUFuZExTKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g5qC55o2u5b2T5YmN5qih5byP6K6+572u5Zu+5qCHXG4gICAgc2V0QnV0dG9uSWNvbihjdXJyZW50KTtcblxuICAgIC8vIOiuvue9ruS7o+eggemrmOS6rlxuICAgIHNldEhpZ2hsaWdodENTUyhjdXJyZW50KTtcblxuICAgIC8vIOiuvue9ruWFtuS7luW6lOeUqFxuICAgIHNldEFwcGxpY2F0aW9ucyhjdXJyZW50KTtcbiAgfVxuXG4gIHZhciBpbnZlcnRDb2xvclNjaGVtYU9iaiA9IHtcbiAgICBkYXJrIDogJ2xpZ2h0JyxcbiAgICBsaWdodDogJ2RhcmsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0SWNvbkNsYXNzKHNjaGVtZSkge1xuICAgIHJldHVybiAnaWNvbi0nICsgc2NoZW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQ3VzdG9tQ29sb3JTY2hlbWEoKSB7XG4gICAgdmFyIGN1cnJlbnRTZXR0aW5nID0gZ2V0TFMoY29sb3JTY2hlbWFTdG9yYWdlS2V5KTtcblxuICAgIGlmICh2YWxpZENvbG9yU2NoZW1hS2V5c1tjdXJyZW50U2V0dGluZ10pIHtcbiAgICAgIC8vIOS7jiBsb2NhbFN0b3JhZ2Ug5Lit6K+75Y+W5qih5byP77yM5bm25Y+W55u45Y+N55qE5qih5byPXG4gICAgICBjdXJyZW50U2V0dGluZyA9IGludmVydENvbG9yU2NoZW1hT2JqW2N1cnJlbnRTZXR0aW5nXTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRTZXR0aW5nID09PSBudWxsKSB7XG4gICAgICAvLyDlvZMgbG9jYWxTdG9yYWdlIOS4reayoeacieebuOWFs+WAvO+8jOaIluiAhSBsb2NhbFN0b3JhZ2Ug5oqb5LqGIEVycm9yXG4gICAgICAvLyDlhYjmjInnhafmjInpkq7nmoTnirbmgIHov5vooYzliIfmjaJcbiAgICAgIHZhciBpY29uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29sb3JUb2dnbGVJY29uU2VsZWN0b3IpO1xuICAgICAgaWYgKGljb25FbGVtZW50KSB7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5nID0gaWNvbkVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWljb25FbGVtZW50IHx8ICF2YWxpZENvbG9yU2NoZW1hS2V5c1tjdXJyZW50U2V0dGluZ10pIHtcbiAgICAgICAgLy8g5b2TIGxvY2FsU3RvcmFnZSDkuK3msqHmnInnm7jlhbPlgLzvvIzmiJbogIUgbG9jYWxTdG9yYWdlIOaKm+S6hiBFcnJvcu+8jOWImeivu+WPlum7mOiupOWAvOW5tuWIh+aNouWIsOebuOWPjeeahOaooeW8j1xuICAgICAgICBjdXJyZW50U2V0dGluZyA9IGludmVydENvbG9yU2NoZW1hT2JqW2dldFNjaGVtYUZyb21DU1NNZWRpYVF1ZXJ5KCldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWwhuebuOWPjeeahOaooeW8j+WGmeWFpSBsb2NhbFN0b3JhZ2VcbiAgICBzZXRMUyhjb2xvclNjaGVtYVN0b3JhZ2VLZXksIGN1cnJlbnRTZXR0aW5nKTtcblxuICAgIHJldHVybiBjdXJyZW50U2V0dGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEJ1dHRvbkljb24oc2NoZW1hKSB7XG4gICAgaWYgKHZhbGlkQ29sb3JTY2hlbWFLZXlzW3NjaGVtYV0pIHtcbiAgICAgIC8vIOWIh+aNouWbvuagh1xuICAgICAgdmFyIGljb24gPSBnZXRJY29uQ2xhc3MoJ2RhcmsnKTtcbiAgICAgIGlmIChzY2hlbWEpIHtcbiAgICAgICAgaWNvbiA9IGdldEljb25DbGFzcyhzY2hlbWEpO1xuICAgICAgfVxuICAgICAgdmFyIGljb25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb2xvclRvZ2dsZUljb25TZWxlY3Rvcik7XG4gICAgICBpZiAoaWNvbkVsZW1lbnQpIHtcbiAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgJ2ljb25mb250ICcgKyBpY29uXG4gICAgICAgICk7XG4gICAgICAgIGljb25FbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAnZGF0YScsXG4gICAgICAgICAgaW52ZXJ0Q29sb3JTY2hlbWFPYmpbc2NoZW1hXVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g5aaC5p6c5Zu+5qCH5LiN5a2Y5Zyo5YiZ6K+05piO5Zu+5qCH6L+Y5rKh5Yqg6L295Ye65p2l77yM562J5Yiw6aG16Z2i5YWo6YOo5Yqg6L295YaN5bCd6K+V5YiH5o2iXG4gICAgICAgIEZsdWlkLnV0aWxzLndhaXRFbGVtZW50TG9hZGVkKGNvbG9yVG9nZ2xlSWNvblNlbGVjdG9yLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbG9yVG9nZ2xlSWNvblNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoaWNvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGljb25FbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgJ2ljb25mb250ICcgKyBpY29uXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAnZGF0YScsXG4gICAgICAgICAgICAgIGludmVydENvbG9yU2NoZW1hT2JqW3NjaGVtYV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRIaWdobGlnaHRDU1Moc2NoZW1hKSB7XG4gICAgLy8g5ZCv55So5a+55bqU55qE5Luj56CB6auY5Lqu55qE5qC35byPXG4gICAgdmFyIGxpZ2h0Q3NzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2hsaWdodC1jc3MnKTtcbiAgICB2YXIgZGFya0NzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdobGlnaHQtY3NzLWRhcmsnKTtcbiAgICBpZiAoc2NoZW1hID09PSAnZGFyaycpIHtcbiAgICAgIGlmIChkYXJrQ3NzKSB7XG4gICAgICAgIGRhcmtDc3MucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGxpZ2h0Q3NzKSB7XG4gICAgICAgIGxpZ2h0Q3NzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsaWdodENzcykge1xuICAgICAgICBsaWdodENzcy5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoZGFya0Nzcykge1xuICAgICAgICBkYXJrQ3NzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIC8vIOiuvue9ruS7o+eggeWdl+e7hOS7tuagt+W8j1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1hcmtkb3duLWJvZHkgcHJlJykuZm9yRWFjaCgocHJlKSA9PiB7XG4gICAgICAgIHZhciBjbHMgPSBGbHVpZC51dGlscy5nZXRCYWNrZ3JvdW5kTGlnaHRuZXNzKHByZSkgPj0gMCA/ICdjb2RlLXdpZGdldC1saWdodCcgOiAnY29kZS13aWRnZXQtZGFyayc7XG4gICAgICAgIHZhciB3aWRnZXQgPSBwcmUucXVlcnlTZWxlY3RvcignLmNvZGUtd2lkZ2V0LWxpZ2h0LCAuY29kZS13aWRnZXQtZGFyaycpO1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgd2lkZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2NvZGUtd2lkZ2V0LWxpZ2h0JywgJ2NvZGUtd2lkZ2V0LWRhcmsnKTtcbiAgICAgICAgICB3aWRnZXQuY2xhc3NMaXN0LmFkZChjbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAyMDApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0QXBwbGljYXRpb25zKHNjaGVtYSkge1xuICAgIC8vIOiuvue9riByZW1hcms0MiDor4TorrrkuLvpophcbiAgICBpZiAod2luZG93LlJFTUFSSzQyKSB7XG4gICAgICB3aW5kb3cuUkVNQVJLNDIuY2hhbmdlVGhlbWUoc2NoZW1hKTtcbiAgICB9XG5cbiAgICAvLyDorr7nva4gY3VzZGlzIOivhOiuuuS4u+mimFxuICAgIGlmICh3aW5kb3cuQ1VTRElTKSB7XG4gICAgICB3aW5kb3cuQ1VTRElTLnNldFRoZW1lKHNjaGVtYSk7XG4gICAgfVxuXG4gICAgLy8g6K6+572uIHV0dGVyYW5jZXMg6K+E6K665Li76aKYXG4gICAgdmFyIHV0dGVyYW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXR0ZXJhbmNlcy1mcmFtZScpO1xuICAgIGlmICh1dHRlcmFuY2VzKSB7XG4gICAgICB2YXIgdXR0ZXJhbmNlc1RoZW1lID0gc2NoZW1hID09PSAnZGFyaycgPyB3aW5kb3cuVXR0ZXJhbmNlc1RoZW1lRGFyayA6IHdpbmRvdy5VdHRlcmFuY2VzVGhlbWVMaWdodDtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIHR5cGUgOiAnc2V0LXRoZW1lJyxcbiAgICAgICAgdGhlbWU6IHV0dGVyYW5jZXNUaGVtZVxuICAgICAgfTtcbiAgICAgIHV0dGVyYW5jZXMuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtZXNzYWdlLCAnaHR0cHM6Ly91dHRlcmFuYy5lcycpO1xuICAgIH1cblxuICAgIC8vIOiuvue9riBnaXNjdXMg6K+E6K665Li76aKYXG4gICAgdmFyIGdpc2N1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZS5naXNjdXMtZnJhbWUnKTtcbiAgICBpZiAoZ2lzY3VzKSB7XG4gICAgICB2YXIgZ2lzY3VzVGhlbWUgPSBzY2hlbWEgPT09ICdkYXJrJyA/IHdpbmRvdy5HaXNjdXNUaGVtZURhcmsgOiB3aW5kb3cuR2lzY3VzVGhlbWVMaWdodDtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIHNldENvbmZpZzoge1xuICAgICAgICAgIHRoZW1lOiBnaXNjdXNUaGVtZSxcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGdpc2N1cy5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHsgJ2dpc2N1cyc6IG1lc3NhZ2UgfSwgJ2h0dHBzOi8vZ2lzY3VzLmFwcCcpO1xuICAgIH1cbiAgfVxuXG4gIC8vIOW9k+mhtemdouWKoOi9veaXtu+8jOWwhuaYvuekuuaooeW8j+iuvue9ruS4uiBsb2NhbFN0b3JhZ2Ug5Lit6Ieq5a6a5LmJ55qE5YC877yI5aaC5p6c5pyJ55qE6K+d77yJXG4gIGFwcGx5Q3VzdG9tQ29sb3JTY2hlbWFTZXR0aW5ncygpO1xuXG4gIEZsdWlkLnV0aWxzLndhaXRFbGVtZW50TG9hZGVkKGNvbG9yVG9nZ2xlSWNvblNlbGVjdG9yLCBmdW5jdGlvbigpIHtcbiAgICBhcHBseUN1c3RvbUNvbG9yU2NoZW1hU2V0dGluZ3MoKTtcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb2xvclRvZ2dsZUJ1dHRvblNlbGVjdG9yKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAvLyDlvZPnlKjmiLfngrnlh7vliIfmjaLmjInpkq7ml7bvvIzojrflvpfmlrDnmoTmmL7npLrmqKHlvI/jgIHlhpnlhaUgbG9jYWxTdG9yYWdl44CB5bm25Zyo6aG16Z2i5LiK55Sf5pWIXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwbHlDdXN0b21Db2xvclNjaGVtYVNldHRpbmdzKHRvZ2dsZUN1c3RvbUNvbG9yU2NoZW1hKCkpO1xuICAgICAgfSk7XG4gICAgICB2YXIgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29sb3JUb2dnbGVJY29uU2VsZWN0b3IpO1xuICAgICAgaWYgKGljb24pIHtcbiAgICAgICAgLy8g5YWJ5qCH5oKs5YGc5Zyo5oyJ6ZKu5LiK5pe277yM5YiH5o2i5Zu+5qCHXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBpY29uLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xuICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlcGxhY2UoZ2V0SWNvbkNsYXNzKGludmVydENvbG9yU2NoZW1hT2JqW2N1cnJlbnRdKSwgZ2V0SWNvbkNsYXNzKGN1cnJlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBpY29uLmdldEF0dHJpYnV0ZSgnZGF0YScpO1xuICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlcGxhY2UoZ2V0SWNvbkNsYXNzKGN1cnJlbnQpLCBnZXRJY29uQ2xhc3MoaW52ZXJ0Q29sb3JTY2hlbWFPYmpbY3VycmVudF0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuIl19

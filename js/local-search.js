(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* global CONFIG */

(function () {
  // Modified from [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
  function localSearchFunc(path, searchSelector, resultSelector) {
    'use strict';

    // 0x00. environment initialization
    var $input = jQuery(searchSelector);
    var $result = jQuery(resultSelector);
    if ($input.length === 0) {
      // eslint-disable-next-line no-console
      throw Error('No element selected by the searchSelector');
    }
    if ($result.length === 0) {
      // eslint-disable-next-line no-console
      throw Error('No element selected by the resultSelector');
    }
    if ($result.attr('class').indexOf('list-group-item') === -1) {
      $result.html('<div class="m-auto text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div><br/>Loading...</div>');
    }
    jQuery.ajax({
      // 0x01. load xml file
      url: path,
      dataType: 'xml',
      success: function success(xmlResponse) {
        // 0x02. parse xml file
        var dataList = jQuery('entry', xmlResponse).map(function () {
          return {
            title: jQuery('title', this).text(),
            content: jQuery('content', this).text(),
            url: jQuery('url', this).text()
          };
        }).get();
        if ($result.html().indexOf('list-group-item') === -1) {
          $result.html('');
        }
        $input.on('input', function () {
          // 0x03. parse query to keywords list
          var content = $input.val();
          var resultHTML = '';
          var keywords = content.trim().toLowerCase().split(/[\s-]+/);
          $result.html('');
          if (content.trim().length <= 0) {
            return $input.removeClass('invalid').removeClass('valid');
          }
          // 0x04. perform local searching
          dataList.forEach(function (data) {
            var isMatch = true;
            if (!data.title || data.title.trim() === '') {
              data.title = 'Untitled';
            }
            var orig_data_title = data.title.trim();
            var data_title = orig_data_title.toLowerCase();
            var orig_data_content = data.content.trim().replace(/<[^>]+>/g, '');
            var data_content = orig_data_content.toLowerCase();
            var data_url = data.url;
            var index_title = -1;
            var index_content = -1;
            var first_occur = -1;
            // only match articles with not empty contents
            if (data_content !== '') {
              keywords.forEach(function (keyword, i) {
                index_title = data_title.indexOf(keyword);
                index_content = data_content.indexOf(keyword);
                if (index_title < 0 && index_content < 0) {
                  isMatch = false;
                } else {
                  if (index_content < 0) {
                    index_content = 0;
                  }
                  if (i === 0) {
                    first_occur = index_content;
                  }
                  //content_index.push({index_content:index_content, keyword_len:keyword_len});
                }
              });
            } else {
              isMatch = false;
            }
            // 0x05. show search results
            if (isMatch) {
              resultHTML += '<a href=\'' + data_url + '\' class=\'list-group-item list-group-item-action font-weight-bolder search-list-title\'>' + orig_data_title + '</a>';
              var content = orig_data_content;
              if (first_occur >= 0) {
                // cut out 100 characters
                var start = first_occur - 20;
                var end = first_occur + 80;
                if (start < 0) {
                  start = 0;
                }
                if (start === 0) {
                  end = 100;
                }
                if (end > content.length) {
                  end = content.length;
                }
                var match_content = content.substring(start, end);

                // highlight all keywords
                keywords.forEach(function (keyword) {
                  var regS = new RegExp(keyword, 'gi');
                  match_content = match_content.replace(regS, '<span class="search-word">' + keyword + '</span>');
                });
                resultHTML += '<p class=\'search-list-content\'>' + match_content + '...</p>';
              }
            }
          });
          if (resultHTML.indexOf('list-group-item') === -1) {
            return $input.addClass('invalid').removeClass('valid');
          }
          $input.addClass('valid').removeClass('invalid');
          $result.html(resultHTML);
        });
      }
    });
  }
  function localSearchReset(searchSelector, resultSelector) {
    'use strict';

    var $input = jQuery(searchSelector);
    var $result = jQuery(resultSelector);
    if ($input.length === 0) {
      // eslint-disable-next-line no-console
      throw Error('No element selected by the searchSelector');
    }
    if ($result.length === 0) {
      // eslint-disable-next-line no-console
      throw Error('No element selected by the resultSelector');
    }
    $input.val('').removeClass('invalid').removeClass('valid');
    $result.html('');
  }
  var modal = jQuery('#modalSearch');
  var searchSelector = '#local-search-input';
  var resultSelector = '#local-search-result';
  modal.on('show.bs.modal', function () {
    var path = CONFIG.search_path || '/local-search.xml';
    localSearchFunc(path, searchSelector, resultSelector);
  });
  modal.on('shown.bs.modal', function () {
    jQuery('#local-search-input').focus();
  });
  modal.on('hidden.bs.modal', function () {
    localSearchReset(searchSelector, resultSelector);
  });
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvZmx1aWQvc291cmNlL2pzL2xvY2FsLXNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBRUEsQ0FBQyxZQUFXO0VBQ1Y7RUFDQSxTQUFTLGVBQWUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRTtJQUM3RCxZQUFZOztJQUNaO0lBQ0EsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUNuQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBRXBDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdkI7TUFDQSxNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQztJQUMxRDtJQUNBLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDeEI7TUFDQSxNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQztJQUMxRDtJQUVBLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtNQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLDhJQUE4SSxDQUFDO0lBQzlKO0lBRUEsTUFBTSxDQUFDLElBQUksQ0FBQztNQUNWO01BQ0EsR0FBRyxFQUFPLElBQUk7TUFDZCxRQUFRLEVBQUUsS0FBSztNQUNmLE9BQU8sRUFBRyxpQkFBUyxXQUFXLEVBQUU7UUFDOUI7UUFDQSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFXO1VBQ3pELE9BQU87WUFDTCxLQUFLLEVBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDckMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxD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LGNBQWMsQ0FBQztJQUNuQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBRXBDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdkI7TUFDQSxNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQztJQUMxRDtJQUNBLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDeEI7TUFDQSxNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQztJQUMxRDtJQUVBLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7RUFDbEI7RUFFQSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0VBQ2xDLElBQUksY0FBYyxHQUFHLHFCQUFxQjtFQUMxQyxJQUFJLGNBQWMsR0FBRyxzQkFBc0I7RUFDM0MsS0FBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBVztJQUNuQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQjtJQUNwRCxlQUFlLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUM7RUFDdkQsQ0FBQyxDQUFDO0VBQ0YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFXO0lBQ3BDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssRUFBRTtFQUN2QyxDQUFDLENBQUM7RUFDRixLQUFLLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFlBQVc7SUFDckMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQztFQUNsRCxDQUFDLENBQUM7QUFDSixDQUFDLEdBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiBnbG9iYWwgQ09ORklHICovXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gTW9kaWZpZWQgZnJvbSBbaGV4by1nZW5lcmF0b3Itc2VhcmNoXShodHRwczovL2dpdGh1Yi5jb20vd3pwYW4vaGV4by1nZW5lcmF0b3Itc2VhcmNoKVxuICBmdW5jdGlvbiBsb2NhbFNlYXJjaEZ1bmMocGF0aCwgc2VhcmNoU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIC8vIDB4MDAuIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uXG4gICAgdmFyICRpbnB1dCA9IGpRdWVyeShzZWFyY2hTZWxlY3Rvcik7XG4gICAgdmFyICRyZXN1bHQgPSBqUXVlcnkocmVzdWx0U2VsZWN0b3IpO1xuXG4gICAgaWYgKCRpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICB0aHJvdyBFcnJvcignTm8gZWxlbWVudCBzZWxlY3RlZCBieSB0aGUgc2VhcmNoU2VsZWN0b3InKTtcbiAgICB9XG4gICAgaWYgKCRyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgdGhyb3cgRXJyb3IoJ05vIGVsZW1lbnQgc2VsZWN0ZWQgYnkgdGhlIHJlc3VsdFNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgaWYgKCRyZXN1bHQuYXR0cignY2xhc3MnKS5pbmRleE9mKCdsaXN0LWdyb3VwLWl0ZW0nKSA9PT0gLTEpIHtcbiAgICAgICRyZXN1bHQuaHRtbCgnPGRpdiBjbGFzcz1cIm0tYXV0byB0ZXh0LWNlbnRlclwiPjxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlclwiIHJvbGU9XCJzdGF0dXNcIj48c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5Mb2FkaW5nLi4uPC9zcGFuPjwvZGl2Pjxici8+TG9hZGluZy4uLjwvZGl2PicpO1xuICAgIH1cblxuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgIC8vIDB4MDEuIGxvYWQgeG1sIGZpbGVcbiAgICAgIHVybCAgICAgOiBwYXRoLFxuICAgICAgZGF0YVR5cGU6ICd4bWwnLFxuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHhtbFJlc3BvbnNlKSB7XG4gICAgICAgIC8vIDB4MDIuIHBhcnNlIHhtbCBmaWxlXG4gICAgICAgIHZhciBkYXRhTGlzdCA9IGpRdWVyeSgnZW50cnknLCB4bWxSZXNwb25zZSkubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZSAgOiBqUXVlcnkoJ3RpdGxlJywgdGhpcykudGV4dCgpLFxuICAgICAgICAgICAgY29udGVudDogalF1ZXJ5KCdjb250ZW50JywgdGhpcykudGV4dCgpLFxuICAgICAgICAgICAgdXJsICAgIDogalF1ZXJ5KCd1cmwnLCB0aGlzKS50ZXh0KClcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5nZXQoKTtcblxuICAgICAgICBpZiAoJHJlc3VsdC5odG1sKCkuaW5kZXhPZignbGlzdC1ncm91cC1pdGVtJykgPT09IC0xKSB7XG4gICAgICAgICAgJHJlc3VsdC5odG1sKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRpbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyAweDAzLiBwYXJzZSBxdWVyeSB0byBrZXl3b3JkcyBsaXN0XG4gICAgICAgICAgdmFyIGNvbnRlbnQgPSAkaW5wdXQudmFsKCk7XG4gICAgICAgICAgdmFyIHJlc3VsdEhUTUwgPSAnJztcbiAgICAgICAgICB2YXIga2V5d29yZHMgPSBjb250ZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpLnNwbGl0KC9bXFxzLV0rLyk7XG4gICAgICAgICAgJHJlc3VsdC5odG1sKCcnKTtcbiAgICAgICAgICBpZiAoY29udGVudC50cmltKCkubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKS5yZW1vdmVDbGFzcygndmFsaWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMHgwNC4gcGVyZm9ybSBsb2NhbCBzZWFyY2hpbmdcbiAgICAgICAgICBkYXRhTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghZGF0YS50aXRsZSB8fCBkYXRhLnRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgZGF0YS50aXRsZSA9ICdVbnRpdGxlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3JpZ19kYXRhX3RpdGxlID0gZGF0YS50aXRsZS50cmltKCk7XG4gICAgICAgICAgICB2YXIgZGF0YV90aXRsZSA9IG9yaWdfZGF0YV90aXRsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIG9yaWdfZGF0YV9jb250ZW50ID0gZGF0YS5jb250ZW50LnRyaW0oKS5yZXBsYWNlKC88W14+XSs+L2csICcnKTtcbiAgICAgICAgICAgIHZhciBkYXRhX2NvbnRlbnQgPSBvcmlnX2RhdGFfY29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIGRhdGFfdXJsID0gZGF0YS51cmw7XG4gICAgICAgICAgICB2YXIgaW5kZXhfdGl0bGUgPSAtMTtcbiAgICAgICAgICAgIHZhciBpbmRleF9jb250ZW50ID0gLTE7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfb2NjdXIgPSAtMTtcbiAgICAgICAgICAgIC8vIG9ubHkgbWF0Y2ggYXJ0aWNsZXMgd2l0aCBub3QgZW1wdHkgY29udGVudHNcbiAgICAgICAgICAgIGlmIChkYXRhX2NvbnRlbnQgIT09ICcnKSB7XG4gICAgICAgICAgICAgIGtleXdvcmRzLmZvckVhY2goZnVuY3Rpb24oa2V5d29yZCwgaSkge1xuICAgICAgICAgICAgICAgIGluZGV4X3RpdGxlID0gZGF0YV90aXRsZS5pbmRleE9mKGtleXdvcmQpO1xuICAgICAgICAgICAgICAgIGluZGV4X2NvbnRlbnQgPSBkYXRhX2NvbnRlbnQuaW5kZXhPZihrZXl3b3JkKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleF90aXRsZSA8IDAgJiYgaW5kZXhfY29udGVudCA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKGluZGV4X2NvbnRlbnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4X2NvbnRlbnQgPSAwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Rfb2NjdXIgPSBpbmRleF9jb250ZW50O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy9jb250ZW50X2luZGV4LnB1c2goe2luZGV4X2NvbnRlbnQ6aW5kZXhfY29udGVudCwga2V5d29yZF9sZW46a2V5d29yZF9sZW59KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gMHgwNS4gc2hvdyBzZWFyY2ggcmVzdWx0c1xuICAgICAgICAgICAgaWYgKGlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgcmVzdWx0SFRNTCArPSAnPGEgaHJlZj1cXCcnICsgZGF0YV91cmwgKyAnXFwnIGNsYXNzPVxcJ2xpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uIGZvbnQtd2VpZ2h0LWJvbGRlciBzZWFyY2gtbGlzdC10aXRsZVxcJz4nICsgb3JpZ19kYXRhX3RpdGxlICsgJzwvYT4nO1xuICAgICAgICAgICAgICB2YXIgY29udGVudCA9IG9yaWdfZGF0YV9jb250ZW50O1xuICAgICAgICAgICAgICBpZiAoZmlyc3Rfb2NjdXIgPj0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGN1dCBvdXQgMTAwIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBmaXJzdF9vY2N1ciAtIDIwO1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSBmaXJzdF9vY2N1ciArIDgwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgc3RhcnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdGFydCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgZW5kID0gMTAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlbmQgPiBjb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgZW5kID0gY29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoX2NvbnRlbnQgPSBjb250ZW50LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBhbGwga2V5d29yZHNcbiAgICAgICAgICAgICAgICBrZXl3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uKGtleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZWdTID0gbmV3IFJlZ0V4cChrZXl3b3JkLCAnZ2knKTtcbiAgICAgICAgICAgICAgICAgIG1hdGNoX2NvbnRlbnQgPSBtYXRjaF9jb250ZW50LnJlcGxhY2UocmVnUywgJzxzcGFuIGNsYXNzPVwic2VhcmNoLXdvcmRcIj4nICsga2V5d29yZCArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXN1bHRIVE1MICs9ICc8cCBjbGFzcz1cXCdzZWFyY2gtbGlzdC1jb250ZW50XFwnPicgKyBtYXRjaF9jb250ZW50ICsgJy4uLjwvcD4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHJlc3VsdEhUTUwuaW5kZXhPZignbGlzdC1ncm91cC1pdGVtJykgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gJGlucHV0LmFkZENsYXNzKCdpbnZhbGlkJykucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRpbnB1dC5hZGRDbGFzcygndmFsaWQnKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICRyZXN1bHQuaHRtbChyZXN1bHRIVE1MKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2NhbFNlYXJjaFJlc2V0KHNlYXJjaFNlbGVjdG9yLCByZXN1bHRTZWxlY3Rvcikge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgJGlucHV0ID0galF1ZXJ5KHNlYXJjaFNlbGVjdG9yKTtcbiAgICB2YXIgJHJlc3VsdCA9IGpRdWVyeShyZXN1bHRTZWxlY3Rvcik7XG5cbiAgICBpZiAoJGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIHRocm93IEVycm9yKCdObyBlbGVtZW50IHNlbGVjdGVkIGJ5IHRoZSBzZWFyY2hTZWxlY3RvcicpO1xuICAgIH1cbiAgICBpZiAoJHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICB0aHJvdyBFcnJvcignTm8gZWxlbWVudCBzZWxlY3RlZCBieSB0aGUgcmVzdWx0U2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAkaW5wdXQudmFsKCcnKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpLnJlbW92ZUNsYXNzKCd2YWxpZCcpO1xuICAgICRyZXN1bHQuaHRtbCgnJyk7XG4gIH1cblxuICB2YXIgbW9kYWwgPSBqUXVlcnkoJyNtb2RhbFNlYXJjaCcpO1xuICB2YXIgc2VhcmNoU2VsZWN0b3IgPSAnI2xvY2FsLXNlYXJjaC1pbnB1dCc7XG4gIHZhciByZXN1bHRTZWxlY3RvciA9ICcjbG9jYWwtc2VhcmNoLXJlc3VsdCc7XG4gIG1vZGFsLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhdGggPSBDT05GSUcuc2VhcmNoX3BhdGggfHwgJy9sb2NhbC1zZWFyY2gueG1sJztcbiAgICBsb2NhbFNlYXJjaEZ1bmMocGF0aCwgc2VhcmNoU2VsZWN0b3IsIHJlc3VsdFNlbGVjdG9yKTtcbiAgfSk7XG4gIG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgIGpRdWVyeSgnI2xvY2FsLXNlYXJjaC1pbnB1dCcpLmZvY3VzKCk7XG4gIH0pO1xuICBtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgbG9jYWxTZWFyY2hSZXNldChzZWFyY2hTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IpO1xuICB9KTtcbn0pKCk7XG4iXX0=

/* eslint-disable no-mixed-operators */
$(function () {
  let color = ['red', 'yellow', 'green', 'pink', 'blue', 'purple', 'orangered'];
  let content = [
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜',
    '❤',
    '💕',
    '💞',
    '💓',
    '💗',
    '💖',
    '💘',
    '💝',
    '💟',
    '💌',
  ];
  let timer;
  function Text(x, y, rand) {
    this.x = x;
    this.y = y;
    this.rand = rand;
  }
  Text.prototype.currentCount = 0;
  Text.prototype.count = 0;
  Text.prototype.create = function (_this) {
    let body = document.body;
    Text.prototype.currentCount += 1;
    Text.prototype.count += 1;
    _this.innerHTML =
      content[this.rand - 1] + '+' + (Text.prototype.currentCount || '');
    _this.className = 'text';
    _this.style.top = this.y - 20 + 'px';
    _this.style.left = this.x - 20 + 'px';
    _this.style.animation = 'remove 2s';
    body.appendChild(_this);
    let i = 0;
    setInterval(() => {
      _this.style.top = this.y - 20 - i + 'px';
      i++;
    }, 10);
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      Text.prototype.currentCount = 0;
    }, 2000);
  };
  Text.prototype.out = function (_this) {
    _this.remove();
  };
  //设置随机颜色
  Text.prototype.getRandom = function () {
    let allType = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f'; //16进制颜色
    let allTypeArr = allType.split(','); //通过','分割为数组
    let color = '#';
    for (var i = 0; i < 6; i++) {
      //随机生成一个0-16的数
      var random = Math.floor(Math.random() * allTypeArr.length);
      color += allTypeArr[random];
    }
    return color; //返回随机生成的颜色
  };
  window.onclick = (e) => {
    let x = e.pageX;
    let y = e.pageY; //当前坐标
    let randContent = Math.ceil(Math.random() * content.length);
    let text = new Text(x, y, randContent);
    let span = document.createElement('span');
    span.style.color = text.getRandom();
    text.create(span);
    setTimeout(function () {
      text.out(span);
    }, 1900);
  };
});

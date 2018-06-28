// 首页的入口文件
import "./index.scss";
import 'lib-flexible';
import $ from 'jquery';

import {data} from './js/data'
console.log(data);
import init from './js/init'
import {left, up, right, down} from './js/keyDown'

// 初始化游戏
init();

// 键盘按下事件

$(document).on('keydown', function (ev) {
  if (ev.keyCode === 37) {
    left();
  } else if (ev.keyCode === 38) {
    up();
  } else if (ev.keyCode === 39) {
    right();
  } else if (ev.keyCode === 40) {
    down();
  }
});
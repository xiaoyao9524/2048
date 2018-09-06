// 首页的入口文件
import "./scss/index.scss";
import 'lib-flexible';
import $ from 'jquery';
import init from './js/init'
import {left, up, right, down} from './js/keyDown'

{
  // 一个有趣的小功能
  let timer = null;
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      if (timer) {
        clearTimeout(timer);
      }
      document.title='终于回来啦(*´∇｀*)';
      timer = setTimeout(() => {
        document.title='2048';
      }, 1000);
    }else{
      if (timer) {
        clearTimeout(timer);
      }
      document.title='快回来玩游戏(つд⊂)';
    }
  });
}
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
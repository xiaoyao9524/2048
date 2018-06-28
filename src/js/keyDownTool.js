import $ from 'jquery'
import {data} from './data'
import {renderGame} from './tool'
// 检查某个位置
export function check (obj) {
  let {x, y} = obj;
  // console.log('check: ', 'x', x, 'y', y);
  if (data[y][x].value) {
    return data[y][x];
  } else {
    return null;
  }
}

let moveElLen = 0; // 一共移动的元素数量
let moveDoneElLen = 0; // 运动完成的元素数量
export function moveTo (from, to) {
  /*
    from: 要移动的格子信息 {x,y,val}
    to:   目标格子的信息 {x,y,val}
  */
 console.log('moveTo开始: from: ', from, 'to: ', to);
  // 处理数据
  moveElLen++;
  // console.log('moveTo: 要移动的格子：', to, '目标格子的信息: ', data);
  let {x, y, val} = from;
  let x2 = to.x;
  let y2 = to.y;
  let val2 = to.value;
  console.log(val, val2)
  if (!val2) {
    // 说明目标格子为空
    data[y2][x2].value = val;
  } else if (val === val2) {
    // 说明移动的格子和目标格子val一样
    data[y2][x2].value = val + val2;
  }
  data[y][x].value = null;
  // 动画效果
  let beforeClass = `p${x}-${y}`;
  let afterClass = `p${x2}-${y2}`;
  // console.log('beforeClass: ', beforeClass, 'afterClass', afterClass);

  let toEl = $(`.game-box .${beforeClass}`);
  // console.log('修改前：', toEl);
  toEl.on('transitionend', function () {
    moveDoneElLen++;
    if (moveElLen === moveDoneElLen) {
      console.log('全部完成');
      renderGame(data);
      moveElLen = 0;
      moveDoneElLen = 0;
    }
  }).removeClass(beforeClass).addClass(afterClass);
  // console.log('修改后：', toEl);
  // renderGame(data);
}
import $ from 'jquery'
import {data} from './data'
import {renderGame} from './tool'

export function moveUpOrDown (direction, obj) {
  // obj: 当前检测的格子信息
  // x: 当前检测的格子x
  // y: 当前检测格子的y
  // val: 当前检测格子的数值
  let {x, y, val} = obj;
  console.log('当前检测的格子信息: ', obj);
  checkNext();
  // console.log('flag: ', flag);
  function checkNext () {
    let flag = null;
    if (direction === 'up') {
      flag = y <= 0 ? true : false;
    } else if (direction === 'down') {
      flag = y >= 3 ? true : false;
    }
    if (flag) {
      console.log('y到头了, row:', y);
      return check({x, y})
    } else {
      if (direction === 'up') {
        y--;
      } else if (direction === 'down') {
        y++;
      }
      console.log('检查第', y, '行');
      let flag = check({x, y});
      console.log('检查结果: ', flag);
      if (!flag) {
        // 说明目标位置为空
        console.log('目标位置为空, row: ', y)
        let flag2 = null;
        if (direction === 'up') {
          flag2 = y > 0 ? true : false;
        } else if (direction === 'down') {
          flag2 = y < 3 ? true : false;
        }
        if (flag2) {
          console.log('第', y, `行为空，继续往${direction}查找`);
          return checkNext();
        } else {
          // console.log('已经是最后一行了（最上方）,开始移动');
          let aims = {
            x,
            y,
            val: null
          };
          moveTo(obj, aims);
          return null;
        }
      } else {
        // 说明目标位置不为空
        console.log('目标位置不为空, row: ', y, 'column: ', x);
        let to = check ({x, y});
        console.log('目标位置为：', to, val);

        if (to.value === val) {
          console.log('val一样')
          moveTo(obj, to);
        } else {
          console.log('val不一样')
          if (direction === 'up') {
            moveTo(obj, {x, y: y + 1});
          } else if (direction === 'down') {
            moveTo(obj, {x, y: y - 1});
          }
        }
        console.log(data);
        return flag;
      }
    }
  }
}

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
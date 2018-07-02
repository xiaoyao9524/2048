import $ from 'jquery'
import {data} from './data'
import {renderGame} from './tool'

// 检查某个位置
function check (obj) {
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
function moveTo (from, to) {
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
  console.log(val, val2);
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

export function moveLeftOrRight (obj) {
  // 传进来的是可能要移动的格子信息
  console.group('moveLeftOrRightStart: ');
  let {x, y, val} = obj;
  console.log('当前检测的格子信息：', 'x: ', x, 'y: ', y, 'val: ', val);
  function checkNext () {
    // 向左或者向右挨个检查，找到合适的目标位置
    if (x <= 0) {
      console.log('x到最左边了');
      let ret = check({x, y});
      if (!ret) {
        ret = {x, y};
      }
      console.log('应该开始移动了, 目标位置为：', ret, '移动的格子信息为：', obj);

      console.log('目标位置val: ', ret.value, '移动格子的val: ', obj.val);

      moveToX(obj, ret);
      // return ret;
    } else {
      // console.log('还没到左边, 当前列是', x);
      x--;
      console.log('开始检测第', x, '列');
      let ret = check({x, y});
      console.log('检查结果：', ret);
      if (!ret) {
        console.log('检查结果为空，继续检查');
        return checkNext();
      } else {
        console.log('检查结果不为空：', ret);
        return checkNext();
      }
    }
  }
  checkNext();

  console.groupEnd();
}

// 左右的移动
let moveElLenX = 0; // 一共移动的元素数量
let moveDoneElLenX = 0; // 运动完成的元素数量
function moveToX (from, to) {
  console.group('moveToX开始');
  console.log('moveToX开始: from: ', from, 'to: ', to);
  let {x, y, val} = from;
  let x2 = to.x;
  let y2 = to.y;
  let val2 = to.value;
  data[y][x].value = null;
  if (!val2) { // 说明目标格子为空，直接移动
    console.log('目标格子为空，直接移动');
    data[y2][x2].value = val;
  } else { // 说明目标格子不为空，需要判断
    console.log('目标格子不为空');
    if (val === val2) { // 说明目标位置和移动的格子数字相同
      console.log('目标位置和移动的格子数字相同');
      data[y2][x2].value = val * 2;
    } else { // 说明目标位置和移动的格子数字不同
      console.log('目标位置和移动的格子数字不同');
      x2++;
      data[y2][x2].value = val;
    }
  }
  console.log('移动完成后的数据为：', data);
  moveElLenX++;
  let beforeClass = `p${x}-${y}`;
  let afterClass = `p${x2}-${y2}`;
  console.log('beforeClass: ', beforeClass, 'afterClass', afterClass);
  $(`.game-box .${beforeClass}`).on('transitionend', function () {
    moveDoneElLenX++;
    if (moveElLenX === moveDoneElLenX) {
      console.log('全部移动完成了');
      renderGame(data);
    }
  }).removeClass(beforeClass).addClass(afterClass);
  console.groupEnd();
}
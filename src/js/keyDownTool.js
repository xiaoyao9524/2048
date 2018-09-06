import $ from 'jquery'
import {data} from './data'
import {renderGame, createNewEl} from './tool'

// 检查某个位置
// 有值返回data对应的那一项，否则返回null
function check (obj) {
  let {x, y} = obj;
  console.log('check: ', 'x', x, 'y', y);
  if (data[y][x].value) {
    return data[y][x];
  } else {
    return null;
  }
}

let moveElLen = 0; // 一共移动的元素数量
let moveDoneElLen = 0; // 运动完成的元素数量
function moveToY (from, to, options) {
  /*
    from: 要移动的格子信息 {x,y,val}
    to:   目标格子的信息 {x,y,val}
  */
  console.log('moveToY开始: from: ', from, 'to: ', to);
  if (from.x === to.x && from.y === to.y) {
    console.log('原地不动');
    return;
  }
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
      // 只生成一个元素
      $('.game-box').append(createNewEl({direction: options.direction}));
      // .append(createNewEl({direction: options.direction}))
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
    // 首先检测是不是第0(或最后)行
    if (direction === 'up') {
      flag = y <= 0 ? true : false;
    } else if (direction === 'down') {
      flag = y >= 3 ? true : false;
    }
    // 如果是的话，提示到头了
    if (flag) {
      console.log('y到头了, row:', y);
      return // check({x, y})
    } else {
      // 否则的话检查上一行（或下一行）
      if (direction === 'up') {
        y--;
      } else if (direction === 'down') {
        y++;
      }
      // 检查下一行
      console.log('检查第', y, '行');
      let flag = check({x, y});
      console.log('检查结果: ', flag);
      // flag: 检查结果
      if (!flag) { // s说明检查结果为，说明目标位置为空
        console.log('目标位置为空, row: ', y);
        let flag2 = null;
        // 再次检查是不是最后一行
        // flag2: 是不是最后一行，是为false 不是为true
        if (direction === 'up') {
          flag2 = y > 0 ? true : false;
        } else if (direction === 'down') {
          flag2 = y < 3 ? true : false;
        }
        if (flag2) {
          // 如果不是最后一行, 继续查找下一行, 递归查找
          console.log('第', y, `行为空，继续往${direction}查找`);
          return checkNext();
        } else {
          // 如果是最后一行
          // console.log('已经是最后一行了（最上方）,开始移动');
          let aims = {
            x,
            y,
            val: null
          };
          moveToY(obj, aims, {direction});
          return null;
        }
      } else {
        // 说明目标位置不为空
        console.log('目标位置不为空, row: ', y, 'column: ', x);
        let to = check ({x, y});
        console.log('目标位置为：', to, val);

        if (to.value === val) {
          console.log('val一样');
          moveToY(obj, to, {direction});
        } else {
          console.log('val不一样');
          if (direction === 'up') {
            moveToY(obj, {x, y: y + 1}, {direction});
          } else if (direction === 'down') {
            moveToY(obj, {x, y: y - 1}, {direction});
          }
        }
        console.log(data);
        return flag;
      }
    }
  }
}

export function moveLeftOrRight (direction, obj) {
  // 传进来的是可能要移动的格子信息
  console.group('moveLeftOrRightStart: ');
  let {x, y, val} = obj;
  console.log('当前检测的格子信息：', 'x: ', x, 'y: ', y, 'val: ', val);
  function checkNext () {
    // 向左或者向右挨个检查，找到合适的目标位置
    // 首先检查是不是最后一列
    let flag = null; // 判断是否是最后一列
    if (direction === 'left') {
      flag = x <= 0;
    } else if (direction === 'right') {
      flag = x >= 3;
    }
    // 如果是最后一列的话
    if (flag) {
      console.log(`x到最${direction}边了,检查的x`, x, 'y: ', y);
      // ret: 目标位置是否为空
      let ret = check({x, y});
      // 如果目标位置为空的话
      if (!ret) {
        console.log('目标位置为空');
        ret = {x, y};
        console.log('应该开始移动了, 目标位置为：', ret, '移动的格子信息为：', obj);
        console.log('目标位置val: ', ret.value, '移动格子的val: ', obj.val);
        moveToX(obj, ret, {direction});
        return ret;
      } else {
        // 目标位置不为空
        console.log('目标位置不为空, 移动格子信息：', obj, '目标格子信息：', ret);
        if (obj.val === ret.value) {
          console.log('点数一样');
          moveToX(obj, ret, {direction});
        } else {
          console.log('点数不一样, 移动格子：', obj, '目标格子: ', ret);
          let {x, y} = ret;
          if (direction === 'left') {
            x++;
          } else if (direction === 'right') {
            x--;
          }
          moveToX(obj,{x, y}, {direction});
        }
      }
    } else {
      // 说明不是最后一列
      console.log(`还没到最${direction}边, 当前列是`, x);
      if (direction === 'left') {
        x--;
      } else if (direction === 'right') {
        x++;
      }
      console.log('开始检测第', x, '列');
      let ret = check({x, y});
      console.log('检查结果：', ret);
      if (!ret) {
        console.log('检查结果为空，继续检查');
        return checkNext();
      } else {
        console.log('检查结果不为空：', ret);
        if (val === ret.value) {
          console.log('点数一样', val, ret.value);
          moveToX(obj, ret, {direction});
        } else {
          console.log('点数不一样', val, ret.value);
          let x = ret.x;
          if (direction === 'left') {
            x++;
          } else if (direction === 'right') {
            x--;
          }
          moveToX(obj, {
            x,
            y
          }, {direction});
          console.log('点数不一样', val, ret.value)
        }
      }
    }
  }
  checkNext();

  console.groupEnd();
}

// 左右的移动
let moveElLenX = 0; // 一共移动的元素数量
let moveDoneElLenX = 0; // 运动完成的元素数量
function moveToX (from, to, options) {
  console.group('moveToX开始');
  console.log('moveToX开始: from: ', from, 'to: ', to);

  if (from.x === to.x && from.y === to.y) {
    console.log('原地不动');
    return;
  }
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
      // x2++;
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
      console.log('全部移动完成了, data: ', data);
      renderGame(data);
      moveElLenX = 0;
      moveDoneElLenX = 0;
      $('.game-box').append(createNewEl({direction: options.direction}));
    }
  }).removeClass(beforeClass).addClass(afterClass);
  console.groupEnd();
}
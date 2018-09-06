import $ from 'jquery';
import {data} from './data'

// 传入数字返回坐标
export function calculationCoordinate (num) {
  let x = num % 4;
  let y = Math.floor(num / 4);
  return {
    x,
    y
  }
}
// 重新渲染视图
export function renderGame (data = data, option) {
  let opt = Object.assign({
    isScale: false
  }, option);
  // console.clear();
  console.log('renderGame 开始');
  console.log('数据：', data);
  let str = '';
  for (let y = 0; y < data.length; y++) {
    let row = data[y];
    // console.log(row);
    for (let x = 0; x < row.length; x++) {
      let item = row[x];
      item.isMoveX = false; // 初始化是否移动状态
      item.isMoveY = false; // 初始化是否移动状态
      // console.log(item);
      if (!item.value) {
        continue;
      }

      let x = item.x;
      let y = item.y;
      if (opt.isScale) {
        str += `
        <div 
          class='game-item c${item.value} p${x}-${y} game-scale'
        >
          ${item.value}
        </div>`;
      } else {
        str += `
        <div 
          class='game-item c${item.value} p${x}-${y}'
        >
          ${item.value}
        </div>`;
      }
    }
  }
  // console.log(data, str);
  $('.game .game-box').html(str);
}

// 生成新元素
export function createNewEl (options) {
  console.group('生成新元素');
  let opt = Object.assign({
    direction: null
  }, options);
  if (!opt.direction) {
    new Error("函数：createNewEl未传入参数'direction'!!");
  }
  // 生成元素的数值 2 or 4, 2的几率大一些
  let innerNum = (Math.random() < 0.8) ? 2 : 4;

  let {x, y} = createCoordinate({
    direction: opt.direction
  });

  console.log(x, y);

  // 处理数据

  data[y][x].value = innerNum;

  console.groupEnd('生成新元素End');
  return $(`<div class='game-item c${innerNum} p${x}-${y}'>${innerNum}</div>`);
}

// 生成随机坐标，如果data对应的位置有元素，那么重新随机
function createCoordinate (opt) {
  console.log('生成随机坐标：', opt);
  let x = null;
  let y = null;
  let direction = opt.direction;
  let randomX = Math.random();
  let randomY = Math.random();
  // 上或下x坐标几率相等
  if (direction === 'up' || direction === 'down') {
    if (randomX <= 0.25) {
      x = 3;
    } else if (randomX <= 0.5) {
      x = 2;
    } else if (randomX <= 0.75) {
      x = 1;
    } else {
      x = 0;
    }
  }
  // 左或右y坐标几率相等
  if (direction === 'left' || direction === 'right') {
    if (randomY <= 0.25) {
      y = 3;
    } else if (randomY <= 0.5) {
      y = 2;
    } else if (randomY <= 0.75) {
      y = 1;
    } else {
      y = 0;
    }
  }
  if (direction === 'up') {
    if (randomY <= 0.5) {
      y = 3;
    } else if (randomX <= 0.8) {
      y = 2;
    } else if (randomX <= 0.95) {
      y = 1;
    } else {
      y = 0;
    }
  } else if (direction === 'down') {
    if (randomY <= 0.5) {
      y = 0;
    } else if (randomX <= 0.8) {
      y = 1;
    } else if (randomX <= 0.95) {
      y = 2;
    } else {
      y = 3;
    }
  } else if (direction === 'left') {
    if (randomX <= 0.5) {
      x = 3;
    } else if (randomY <= 0.8) {
      x = 2;
    } else if (randomY <= 0.95) {
      x = 1;
    } else {
      x = 0;
    }
  } else if (direction === 'right') {
    if (randomX <= 0.5) {
      x = 0;
    } else if (randomY <= 0.8) {
      x = 1;
    } else if (randomY <= 0.95) {
      x = 2;
    } else {
      x = 3;
    }
  }
  console.log('生成随机坐标：', x, y);
  if (data[y][x].value) {
    console.log('该位置已有元素，重新随机, data', data);
    return createCoordinate(opt);
  }
  return {x, y};
}

export function checkIsMove (colOrRow, num) { // 检测某一列或某一行是否可以移动
  // colOrRow： 'x'或'y'
  // num: 列或行数, 0 - 3
  let result = null;
  console.error('检测是否可以移动方法开始：', colOrRow, num);
  if (colOrRow === 'x') {
    for (let item of data[num]) {
      // 为true说明不能移动
      if (item.isMoveX) {
        result = false;
      } else {
        result = true;
      }
    }
  } else if (colOrRow === 'y') {
    for (let i = 0; i < data.length; i++) {
      if (data[i][num].isMoveY) {
        result = false;
      } else {
        result = true;
      }
    }
  }
  console.error('检测是否可以移动方法结果：', result);
  return result;
}
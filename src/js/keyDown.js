import {data} from './data'
import {moveUpOrDown, moveLeftOrRight} from './keyDownTool'

exports.up = function () {
  for (let y = 1; y < data.length; y++) {
    let row = data[y];
    for (let x = 0; x < row.length; x++) {
      let item = row[x];
      if (!item.value) {
        continue;
      }
      // 开始检测
      let val = item.value;
      // console.log('开始检查：', x, y);
      moveUpOrDown('up', {x, y, val});
    }
  }
};

exports.down = function () {
  console.log('down');

  for (let y = 2; y >= 0; y--) {
    console.log('for y down', y);
    let row = data[y];
    for (let x = 0; x < row.length; x++) {
      let item = row[x];
      let val = item.value;
      if (!val) {
        continue;
      }
      // 开始检测
      // console.log('开始检查：', x, y);
      moveUpOrDown('down', {x, y, val});
    }
  }
};

exports.left = function () {
  console.log('left');

  for (let y = 0; y < 4; y++) {
    let row = data[y];
    for (let x = 1; x < row.length; x++) {
      let item = row[x];
      let val = item.value;
      if (!val) {
        continue;
      }
      moveLeftOrRight('left', {x, y, val});
    }
  }
};

exports.right = function () {
  console.log('right');

  for (let y = 0; y < 4; y++) {
    let row = data[y];
    for (let x = 2; x >= 0; x--) {
      let item = row[x];
      let val = item.value;
      if (!val) {
        continue;
      }
      moveLeftOrRight('right', {x, y, val});
    }
  }
};



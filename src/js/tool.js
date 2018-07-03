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
  let opt = object.assign({
    direction: null
  }, options);
  if (!opt.direction) {
    new Error("函数：createNewEl未传入参数'direction'!!");
  }
  let innerNum = (Math.random() - 0.5) > 0.3 ? 2 : 4;
  let el = $(`<div class='game-item c${innerNum}'>${innerNum}</div>`);
}
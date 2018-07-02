import $ from 'jquery';
import {data} from './data'

// 传入数字返回坐标
exports.calculationCoordinate = function (num) {
  let x = num % 4;
  let y = Math.floor(num / 4);
  return {
    x,
    y
  }
};

exports.renderGame = function (data) {
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

        str += `
        <div 
          class='game-item c${item.value} p${x}-${y}'
        >
          ${item.value}
        </div>`;
      }
    }
    // console.log(data, str);
    $('.game .game-box').html(str);
};
import $ from 'jquery'
import {data} from './data'
import {calculationCoordinate, renderGame} from './tool'
import {check, moveTo} from './keyDownTool'


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
      moveUp({x, y, val});
    }
  }
};

function moveUp(obj) {
  // obj: 当前检测的格子信息
  // x: 当前检测的格子x
  // y: 当前检测格子的y
  // val: 当前检测格子的数值
  let {x, y, val} = obj;

  // flag: 检查结果,null为空
  let flag = checkNext();
  // console.log('flag: ', flag);
  function checkNext () {
    if (y <= 0) {
      // console.log('y到头了');
      return check({x, y})
    } else {
      y--;
      // console.log('检查第', y, '行');
      let flag = check({x, y});
      // console.log('检查结果: ', flag);
      if (!flag) {
        // 说明目标位置为空
        console.log('目标位置为空, row: ', y)
        if (y > 0) {
          // console.log('第', y, '行为空，继续往上查找');
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
          moveTo(obj, {x, y: y + 1});
        }
        console.log(data);
        return flag;
      }
    }
  }
}




exports.left = function () {
  console.log('left')
};

exports.right = function () {
  console.log('right')
};

exports.down = function () {
  console.log('down')
};

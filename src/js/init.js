import $ from 'jquery';

/*
* data:         游戏的数据
* positionObj:  存储着每个位置对应的left和top
* */
import {data, positionObj} from './data';
import {calculationCoordinate, renderGame} from './tool'


// 随机出2或者4(2几率大)
function random2Or4 () {
  let num = Math.random() - 0.3;
  return num > 0 ? 2 : 4;
}
// 随机出现16中的任意一个(可以排除一个数字)
function random16 (exclude) {
  if (exclude && typeof exclude !== 'number') {
    console.error('函数"random16"传参错误');
    return
  }
  let num = Math.floor(Math.random() * 16);
  if (exclude >= 0) {
    if (num === exclude) {
      // 说明重复，重新随机一次
      num = random16(exclude)
    }
  }
  return num;
}



// 初始化游戏
export default function init () {
  // 生成两个元素是第几个（0-16）
  let num1 = random16();
  let num2 = random16(num1);

  // 初始两个元素的值
  let baseVal1 = random2Or4();
  let baseVal2 = random2Or4();

  // 修改游戏数据
  let position1 = calculationCoordinate(num1);
  let position2 = calculationCoordinate(num2);
  let x1 = position1.x;
  let y1 = position1.y;
  data[y1][x1].value = baseVal1;
  let x2 = position2.x;
  let y2 = position2.y;
  data[y2][x2].value = baseVal2;

  // 根据data渲染结构
  renderGame(data);
}
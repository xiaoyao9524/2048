// 前期准备

// 计算绝对定位的坐标
let positionObj = [];
for (let i = 0; i < 16; i++) {
  let left = (i % 4) * 66;
  let top = Math.floor(i / 4) * 66;
  positionObj.push({
    left,
    top
  })
}

// 生成数据
let data = [];
let count = 0;
for (let i = 0; i < 4; i++) {
  let row = [];
  for (let j = 0; j < 4; j++) {
    let obj = {
      x: j,
      y: i,
      left: positionObj[count].left,
      top: positionObj[count].top,
      value: null
    };
    row.push(obj);
    count++;
  }
  data.push(row);
}


exports.data = data; // 游戏的数据
exports.positionObj = positionObj;

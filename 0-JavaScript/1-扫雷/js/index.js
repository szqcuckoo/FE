/**
 * 游戏主要逻辑
 */
// 地雷的数组
let mineArray = null;
// 雷区的容器
const mineArea = $(".mineArea");
// 存储整张地图每个格子额外的一些信息
const tableData = [];
// 存储用户插旗的 DOM 元素
let flagArray = [];
const btns = $$('.level>button')
let flagNum = $(".flagNum")
let mineNumber = $('.mainNum')

main();

// 程序入口
function main() {
  // 1. 游戏初始化
  init();
  // 2. 绑定事件
  bindEvent();
}

/**
 * 场景重置
 */
function clearScene() {
  mineArea.innerText = ''
  flagArray = []
  flagNum.innerText = 0
  mineNumber.innerText = curLevel.mineNum
}

// 游戏初始化
function init() {
  // 清空场景重置信息
  clearScene()
  // 1. 随机生成所选配置对应数量的雷
  mineArray = initMine();
  // 2. 生成所选配置的表格
  const table = document.createElement("table");
  // 初始化格子的下标
  let index = 0;
  for (let i = 0; i < curLevel.row; i++) {
    let tr = document.createElement("tr");
    tableData[i] = [];
    for (let j = 0; j < curLevel.col; j++) {
      let td = document.createElement("td");
      let div = document.createElement("div");
      // 每一个小格子由一个对象来存储额外的信息
      tableData[i][j] = {
        row: i,
        col: j,
        type: "number", // 格子是否是雷，雷的话为 mine
        value: 0,
        index, // 格子的下标
        checked: false,
      };
      // 为每一个 div 添加一个下标，方便用户点击的时候，获取对应格子的下标
      div.dataset.id = index;
      // 标记当前的 div 是可以插旗的
      div.classList.add("canFlag");
      // 查看当前格子的下标是否在雷的数组里面
      if (mineArray.includes(tableData[i][j].index)) {
        tableData[i][j].type = "mine";
        div.classList.add("mine");
      }
      td.appendChild(div);
      tr.appendChild(td);
      // 下标自增
      index++;
    }
    table.appendChild(tr);
  }
  // console.log(tableData);
  // console.log(mineArray);
  mineArea.appendChild(table);
  mineArea.onmousedown = function (e) {
    if (e.button === 0) {
      // 用户点击鼠标左键
      // 进行区域搜索
      searchArea(e.target);
    } else if (e.button === 2) {
      // 用户点击鼠标右键
      // 进行插旗操作
      flag(e.target);
    }
  };
}
// 绑定事件
function bindEvent() {

  // 阻止鼠标默认行为
  mineArea.oncontextmenu = (e) => e.preventDefault();

  $('.level').onclick = (e) => {
    for(let i =0;i<btns.length;i++) {
      btns[i].classList.remove('active')
    }
    e.target.classList.add('active')
    console.log(e.target.innerText)
    switch (e.target.innerText) {
      case 'easy':
        curLevel = config.easy
        break;
      case 'normal':
        curLevel = config.normal
        break;
      case 'hard':
        curLevel = config.hard
        break;
    
      default:
        break;
    }
    init()
  }
}

/**
 * 区域搜索
 * @param {*} cell 用户点击的DOM元素
 */
function searchArea(cell) {
  /* 
    1. 雷
    2. 分析雷的数量
      有雷，显示数量
      没有雷，递归搜索
  */
  if (cell.classList.contains("mine")) {
    // 踩雷了，游戏结束
    // 显示所有的雷，然后把其他的雷显示出来，弹出游戏结束的框
    cell.classList.add("error");
    showAnswer();
    return;
  }
  getAround(cell);
}

/**
 * 显示答案
 */
function showAnswer() {
  /* 
    显示所有的雷
      有些雷可能是插了旗的，判断插旗是否正确
      正确添加绿色背景，错误添加红色背景
  */
 let isAllRight = true
  let mineArr = $$("td>div.mine");
  for (let i = 0; i < mineArr.length; i++) {
    mineArr[i].style.opacity = 1;
  }

  // 遍历用户的插旗
  for(let i =0;i<flagArray.length;i++) {
    if(flagArray[i].classList.contains("mine")) {
      flagArray[i].classList.add('right')
    }else {
      flagArray[i].classList.add('error')
      isAllRight = false
    }
  }

  if(!isAllRight || flagArray.length !== curLevel.mineNum) {
    gameOver(false)
  }
  // 取消事件
  mineArea.onmousedown = null
}

/**
 * 搜索该单元格周围的九宫格区域雷的数量
 * @param {*} cell 用户点击的单元格
 */
function getAround(cell) {
  if(!cell.classList.contains("flag")) {
    // 当前单元格没有被插旗，我们才进行以下操作

  }
  cell.parentNode.style.border = "none";
  cell.classList.remove("canFlag");
  // 1. 获取到DOM元素在tableData 里面所对应的对象
  const tableItem = getTableItem(cell);
  if (!tableItem) return;
  tableItem.checked = true;

  // 查看周围一圈是否有雷
  let mineNum = findMineNum(tableItem);
  if (!mineNum) {
    // 周围没有雷，需要继续搜索
    const { rowTop, rowBottom, colLeft, colRight } = getBound(tableItem);
    let count = 0;
    for (let i = rowTop; i <= rowBottom; i++) {
      for (let j = colLeft; j <= colRight; j++) {
        if (!tableData[i][j].checked) {
          getAround(getDom(tableData[i][j]));
        }
      }
    }
    return count;
  } else {
    const cl = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
    ];
    // 周围有雷，把数字推入当前格子
    cell.classList.add(cl[mineNum]);
    cell.innerText = mineNum;
  }
}

/**
 * 根据 tableData 中的js对象，返回对应的 div
 * @param {*} obj
 * @returns
 */
function getDom(obj) {
  const divArray = $$("td>div");
  return divArray[obj.index];
}

/**
 * 返回周围一圈雷的数量
 * @param {object} obj 格子对应的对象
 */
function findMineNum(obj) {
  const { rowTop, rowBottom, colLeft, colRight } = getBound(obj);
  let count = 0;
  for (let i = rowTop; i <= rowBottom; i++) {
    for (let j = colLeft; j <= colRight; j++) {
      if (tableData[i][j].type === "mine") count++;
    }
  }
  return count;
}

/**
 * 返回该对象对应四周边界
 * @param {object} obj
 */
function getBound(obj) {
  // 确定边界
  let rowTop = obj.row - 1 < 0 ? 0 : obj.row - 1;
  let rowBottom = obj.row + 1 === curLevel.row ? curLevel.row - 1 : obj.row + 1;
  let colLeft = obj.col - 1 < 0 ? 0 : obj.col - 1;
  let colRight = obj.col + 1 === curLevel.col ? curLevel.col - 1 : obj.col + 1;
  return { rowTop, rowBottom, colLeft, colRight };
}

/**
 * 找到对应 DOM 在tableData 里面的 js 对象
 */
function getTableItem(cell) {
  const index = cell.dataset.id;
  return tableData.flat().filter((item) => item.index == index)[0];
}

/**
 *
 * @param {*} cell 用户点击的DOM元素
 */
function flag(cell) {
  // 只有包含canFlag才能插旗
  if (cell.classList.contains("canFlag")) {
    if (!flagArray.includes(cell)) {
      // 进行插旗工作
      flagArray.push(cell);
      cell.classList.add("flag");
      // 进行插旗数量的判断
      if (flagArray.length === curLevel.mineNum) {
        // 判断玩家是否胜利
        if (isWin(flagArray)) {
          gameOver(true);
        }
        // 无论游戏胜利胜利还是失败，都应该进入 showanswer
        showAnswer();
      }
    } else {
      // 已经在数组里面
      // 取消插旗
      const index = flagArray.indexOf(cell)
      flagArray.splice(index, 1)
      cell.classList.remove('flag')
    }
    flagNum.innerText = flagArray.length
  }
}

function isWin() {
  for (let i = 0; i < flagArray.length; i++) {
    if (!flagArray[i].classList.contains("mine")) {
      return false;
    }
  }
  return true;
}

function gameOver(isWin) {
  let msg = "";
  if (isWin) {
    msg = "游戏胜利，你找出了所有的雷";
  } else {
    msg = "游戏失败~";
  }
  setTimeout(() => {
    window.alert(msg);
  }, 0);
}

/**
 * 生成地雷的方法
 * @returns 地雷数组
 */
function initMine() {
  const arr = new Array(curLevel.row * curLevel.col);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }
  arr.sort(() => 0.5 - Math.random());
  return arr.slice(0, curLevel.mineNum);
}

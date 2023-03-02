// 游戏配置
const config = {
  easy: {
    row: 10,
    col: 10,
    mineNum: 10
  },
  normal: {
    row: 15,
    col: 15,
    mineNum: 30
  },
  hard: {
    row: 20,
    col: 20,
    mineNum: 60
  },
}

// 当前游戏难度
let curLevel = config.easy

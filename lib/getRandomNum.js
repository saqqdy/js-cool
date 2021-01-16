/**
 * 获取随机整数
 * @param {Number} min 随机数的最小值
 * @param {Number} max 随机数的最大值
 * @returns {Number} 返回数字
 */
const getRandomNum = (min = 1, max = 10) => {
  var Range = max - min
  var Rand = Math.random()
  return min + Math.round(Rand * Range)
}

export default getRandomNum

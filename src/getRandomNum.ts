/**
 * 获取随机整数
 *
 * @param min - 随机数的最小值
 * @param max - 随机数的最大值
 * @returns 返回数字
 */
function getRandomNum(min = 1, max = 10): number {
	const Range = max - min
	const Rand = Math.random()
	return min + Math.round(Rand * Range)
}

export default getRandomNum

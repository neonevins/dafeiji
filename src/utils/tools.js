/**
 * 计算两个矩形是否有重合部分
 * @param {Object}rectA
 * @param {Object}rectB
 */
export function rectCollide(rectA, rectB) {
  // 左上角最大的点x的坐标
  const xMin = Math.max(rectA.x, rectB.x)
  // 左上角最大的点y的坐标
  const yMin = Math.max(rectA.y, rectB.y)
  // 右下角最小的点x的坐标
  const xMax = Math.min(rectA.x + rectA.w, rectB.x + rectB.w)
  // 右下角最小的点y的坐标
  const yMax = Math.min(rectA.y + rectA.h, rectB.y + rectB.h)
  // 如果不重合, 左上角最大的点至少一个点一定在右下角最小的点左上 => 差值有小于0的
  const width = xMax - xMin
  const height = yMax - yMin
  if (width <= 0 || height <= 0){
    return 0
  }
  return width * height
}

export default {
  rectCollide
}

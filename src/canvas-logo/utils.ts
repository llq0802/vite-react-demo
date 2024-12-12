export function calculatePoints(x: number, y: number, distance: number) {
  // 计算四个角的坐标
  const topLeft = [x - distance, y - distance];
  const topRight = [x + distance, y - distance];
  const bottomLeft = [x - distance, y + distance];
  const bottomRight = [x + distance, y + distance];

  // 计算四条边的中点坐标
  const topCenter = [x, y - distance];
  const bottomCenter = [x, y + distance];
  const leftCenter = [x - distance, y];
  const rightCenter = [x + distance, y];

  const center = [x, y];

  // 返回所有 8 个点的坐标
  return {
    center,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    topCenter,
    bottomCenter,
    leftCenter,
    rightCenter,
  };
}

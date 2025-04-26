const binarySearch = (array: number[], target: number): number => {
  let left = 0
  let right = array.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (array[mid] === target) {
      return mid
    }
    if (array[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}

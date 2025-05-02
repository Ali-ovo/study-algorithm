type SortAlgoFn = (arr: number[]) => number[]


export function isSorted(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}


export function testSort(sortFn: SortAlgoFn) {
  const nums = Array.from({ length: 10 }, () => {
    return Math.floor(Math.random() * 20)
  })

  console.log('Before sorting:', nums)
  const newNums = sortFn(nums)
  console.log('After sorting:', newNums)
  console.log('Is sorted:', isSorted(newNums))
}

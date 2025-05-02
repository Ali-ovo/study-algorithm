import { testSort } from './utils'

const mergeSort = (arr: number[]): number[] => {
  const rec = (arr: number[]) => {
    const len = arr.length

    if (len <= 1) return arr

    const mid = len >> 1

    const leftArr = rec(arr.slice(0, mid))
    const rightArr = rec(arr.slice(mid))

    const res: number[] = []

    while (leftArr.length || rightArr.length) {
      if (leftArr.length && rightArr.length) {
        res.push(leftArr[0] < rightArr[0] ? leftArr.shift()! : rightArr.shift()!)
      } else if (leftArr.length) {
        res.push(leftArr.shift()!)
      } else if (rightArr.length) {
        res.push(rightArr.shift()!)
      }
    }

    return res
  }

  return rec(arr)
}

testSort(mergeSort)

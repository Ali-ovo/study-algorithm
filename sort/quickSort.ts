import { testSort } from './utils'

const quickSort = (arr: number[]) => {
  const rec = (arr: number[]) => {
    if (arr.length <= 1) return arr

    const left: number[] = []
    const right: number[] = []

    const mid = arr[0]

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }

    return [...rec(left), mid, ...rec(right)]
  }

  return rec(arr)
}

testSort(quickSort)

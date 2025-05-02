import { testSort } from "./utils"

const insertionSort = (arr: number[]) => {

  const len = arr.length
  for (let i = 1; i < len; i++) {
    const temp = arr[i]

    let j = i
    while (j > 0) {
      if(arr[j - 1] > temp) {
        arr[j] = arr[j - 1]
      } else {
        break
      }

      j--
    }

    arr[j] = temp
  }

  return arr
}

testSort(insertionSort)
import { testSort } from "./utils"

const selectionSort = (arr: number[]) => {
  const len = arr.length

  for (let i = 0; i < len - 1; i++) {
    let indexMin = i

    for (let j = i; j < len; j++) {
      if (arr[j] < arr[indexMin]) {
        indexMin = j
      }
    }

    if (indexMin !== i) {
      ;[arr[i], arr[indexMin]] = [arr[indexMin], arr[i]]
    }
  }

  return arr
}

testSort(selectionSort)
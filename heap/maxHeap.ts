export class MaxHeap<T> {
  data: T[] = []
  private length: number = 0

  private swap(i: number, j: number) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  private heap_up() {
    let index = this.length - 1

    while (index > 0) {
      let parentIndex = (index - 1) >> 1
      if (this.data[index] <= this.data[parentIndex]) {
        break
      }

      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  private heap_down(start: number ) {
    let index = start

    while (2 * index + 1 < this.length) {
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = leftChildIndex + 1
      let largerIndex = leftChildIndex
      if (
        rightChildIndex < this.length &&
        this.data[rightChildIndex] > this.data[leftChildIndex]
      ) {
        largerIndex = rightChildIndex
      }

      if (this.data[index] > this.data[largerIndex]) {
        break
      }

      this.swap(index, largerIndex)
      index = largerIndex
    }
  }

  insert(value: T) {
    this.data.push(value)
    this.length++

    this.heap_up()
  }

  extract() {
    if (this.length === 0) {
      return null
    }
    if (this.length === 1) {
      this.length--
      return this.data.pop()
    }

    const topValue = this.data[0]

    this.data[0] = this.data.pop()!
    this.length--

    this.heap_down(0)

    return topValue
  }

  peek() {
    if (this.length === 0) {
      return null
    }
    return this.data[0]
  }

  size() {
    return this.length
  }

  isEmpty() {
    return this.length === 0
  }

  buildHeap(arr: T[]) {
    this.data = arr
    this.length = arr.length

    const start = (this.size() - 1) >> 1

    for (let i = start; i >= 0; i--) {
      this.heap_down(start)
    }
  }
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7]
const heap = new MaxHeap<number>()

heap.buildHeap(arr)

// while(!heap.isEmpty()){
//   console.log(heap.extract())
//   console.log(heap.data)
// }

console.log(heap.data)

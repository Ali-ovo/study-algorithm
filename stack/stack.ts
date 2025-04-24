export class ArrayStack<T> {
  private data: T[] = []

  push(item: T) {
    this.data.push(item)
  }

  pop(){
    return this.data.pop()
  }

  peek() {
    return this.data[this.data.length - 1]
  }

  isEmpty() {
    return this.data.length === 0
  }

  size() {
    return this.data.length
  }

  clear() {
    this.data.length = 0
  }
}

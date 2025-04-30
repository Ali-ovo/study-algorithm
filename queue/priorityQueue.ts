import { Heap } from '../heap/minHeap'

class PriorityNode<T> {
  priority: number
  value: T
  constructor(value: T, priority: number) {
    this.value = value
    this.priority = priority
  }

  valueOf() {
    return this.priority
  }
}

class PriorityQueue<T> {
  private heap: Heap<T> = new Heap()

  enqueue(value: T ){
    this.heap.insert(value)
  }

  dequeue() {
    return this.heap.extract()
  }

  peek() {
    return this.heap.peek()
  }
  isEmpty() {
    return this.heap.isEmpty()
  }
  size() {
    return this.heap.size()
  }
}

const pQueue = new PriorityQueue<PriorityNode<string>>()
pQueue.enqueue(new PriorityNode('one', 99))
pQueue.enqueue(new PriorityNode('two', 5))
pQueue.enqueue(new PriorityNode('three', 1))

while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue())
}
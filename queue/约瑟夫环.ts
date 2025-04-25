import { ArrayQueue } from './queue'

const lastRemaining = (n: number, m: number) => {
  const queue = new ArrayQueue<number>()

  for (let i = 0; i <= n; i++) {
    queue.enqueue(i)
  }

  while (queue.size() > 1) {
    for (let i = 1; i < m; i++) {
      const n = queue.dequeue()
      if (n) {
        queue.enqueue(n)
      }
    }
    queue.dequeue()
  }

  return queue.dequeue()
}

const res = lastRemaining(5, 3)
console.log(res) // 3

const res2 = lastRemaining(10, 17)
console.log(res2) // 2

// 5 3   // 3
// 10 17 // 2
 
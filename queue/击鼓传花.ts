import { ArrayQueue } from './queue'

// 击鼓传花
function hotPotato(names: string[], m: number) {
  const queue = new ArrayQueue<string>()

  for (const name of names) {
    queue.enqueue(name)
  }

  while (queue.size() > 1) {
    for (let i = 1; i < m; i++) {
      const name = queue.dequeue()
      if (name) {
        queue.enqueue(name) 
      }
    }

    queue.dequeue()
  }

  return queue.front()
}

const leftName = hotPotato(['jack', 'james', 'emma', 'white'], 3)
console.log(leftName) // jack

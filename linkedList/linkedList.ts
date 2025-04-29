import { Node } from '.'

export class LinkedList<T> {
  protected head: Node<T> | null = null
  protected size: number = 0
  protected tail: Node<T> | null = null

  get length() {
    return this.size
  }

  protected getNode(index: number): Node<T> | null {
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }
    return current
  }

  private isTail(node: Node<T>) {
    return this.tail === node
  }

  append(value: T) {
    const newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
    } else {
      this.tail!.next = newNode
    }
    this.tail = newNode
    this.size++
  }

  traverse() {
    const values: T[] = []
    let current = this.head
    while (current) {
      values.push(current.value)

      if (this.isTail(current)) {
        current = null
      } else {
        current = current.next
      }
    }

    if (this.head && this.tail?.next === this.head) {
      values.push(this.head?.value!)
    }

    console.log(values.join(' -> '))
  }

  insert(value: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds')
    }

    const newNode = new Node(value)
    if (index === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      const pre = this.getNode(index - 1)
      newNode.next = pre?.next ?? null
      pre!.next = newNode

      if (index === this.length) {
        this.tail = newNode
      }
    }
    this.size++

    return true
  }

  removeAt(index: number) {
    if (index < 0 || index >= this.size) {
      return null
    }

    let current = this.head
    if (index === 0) {
      this.head = current!.next

      if (this.length === 1) {
        this.tail = null
      }
    } else {
      const pre = this.getNode(index - 1)
      current = pre?.next ?? null
      pre!.next = pre?.next?.next ?? null

      if (index === this.length - 1) {
        this.tail = pre
      }
    }

    this.size--

    return current?.value! ?? null
  }

  get(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds')
    }

    return this.getNode(index)?.value ?? null
  }

  update(value: T, index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds')
    }

    const node = this.getNode(index)
    if (node) {
      node.value = value
      return true
    }
    return false
  }

  indexOf(value: T) {
    let current = this.head
    let index = 0
    while (current) {
      if (current.value === value) {
        return index
      }

      if (this.isTail(current)) {
        current = null
      } else {
        current = current.next
      }
      index++
    }
    return -1
  }

  remove(value: T) {
    const index = this.indexOf(value)
    if (index !== -1) {
      this.removeAt(index)
      return true
    }
    return false
  }

  isEmpty() {
    return this.size === 0
  }

  clear() {
    this.head = null
    this.size = 0
  }
}

// const list = new LinkedList<number>()
// list.append(1)
// list.append(2)
// list.append(3)
// list.append(4)
// list.insert(999, 1)
// list.removeAt(1)

// console.log('get', list.get(1)) // 2

// console.log('update', list.update(100, 1)) // true
// console.log('indexOf', list.indexOf(100)) // 1
// list.traverse()

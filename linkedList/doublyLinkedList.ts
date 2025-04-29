import { DoublyNode } from '.'
import { LinkedList } from './linkedList'

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null
  protected tail: DoublyNode<T> | null = null

  append(value: T): void {
    const newNode = new DoublyNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.size++
  }

  prepend(value: T): void {
    const newNode = new DoublyNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
  }

  postTraverse() {
    const values: T[] = []
    let current = this.tail

    while (current) {
      values.push(current.value)
      current = current.prev
    }

    console.log(values.join(' -> '))
  }

  insert(value: T, index: number): boolean {
    if (index < 0 || index > this.size) {
      return false
    }

    if (index === 0) {
      this.prepend(value)
      return true
    }
    if (index === this.size) {
      this.append(value)
      return true
    }

    const newNode = new DoublyNode(value)
    let current = this.getNode(index) as DoublyNode<T>
    if (!current) {
      return false
    }

    const prevNode = current.prev
    newNode.prev = prevNode
    newNode.next = current

    if (prevNode) {
      prevNode.next = newNode
    }

    current.prev = newNode

    this.size++
    return true
  }

  removeAt(index: number): NonNullable<T> | null {
    if (index < 0 || index >= this.size) {
      return null
    }

    let current = this.head

    if (index === 0) {
      if (this.length === 1) {
        this.head = null
        this.tail = null
      } else {
        this.head = this.head!.next
        this.head!.prev = null
      }
    } else if (index === this.size - 1) {
      current = this.tail

      this.tail = this.tail!.prev
      this.tail!.next = null
    } else {
      current = this.getNode(index) as DoublyNode<T>

      current.next!.prev = current.prev
      current.prev!.next = current.next
    }

    this.size--
    return current?.value || null
  }
}

const doublyLinkedList = new DoublyLinkedList<string>()
doublyLinkedList.append('aaa')
doublyLinkedList.append('bbb')
doublyLinkedList.append('ccc')
doublyLinkedList.append('ddd')
doublyLinkedList.prepend('000')
doublyLinkedList.insert('222', 2)
doublyLinkedList.removeAt(2)

doublyLinkedList.traverse()
doublyLinkedList.postTraverse()

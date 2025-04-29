import { LinkedList } from './linkedList'

export class CircularLinkedList<T> extends LinkedList<T> {
  append(value: T) {
    super.append(value)

    this.tail!.next = this.head
  }

  insert(value: T, index: number) {
    const isSuccess = super.insert(value, index)

    if (isSuccess && (index === this.length - 1 || index === 0)) {
      this.tail!.next = this.head
    }

    return isSuccess
  }

  removeAt(index: number): NonNullable<T> {
    const value = super.removeAt(index)
    if (value && this.tail && (index === this.length - 1 || index === 0)) {
      this.tail.next = this.head
    }
    return value
  }
  
}

const cLinkedList = new CircularLinkedList<string>()
cLinkedList.append('aaa')
cLinkedList.append('bbb')
cLinkedList.append('ccc')
cLinkedList.append('ddd')
cLinkedList.traverse()

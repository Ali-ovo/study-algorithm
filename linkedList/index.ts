export class Node<T> {
  next: Node<T> | null = null
  constructor(public value: T) {}
}

export class ListNode<T = null> {
  val: T
  next: ListNode<T> | null = null
  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val
    this.next = next
  }
}

export class DoublyNode<T> extends Node<T>{
  prev: DoublyNode<T> | null = null
  next: DoublyNode<T> | null = null
}
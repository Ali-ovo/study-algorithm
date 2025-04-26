import { ListNode } from './linkedList'

function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head
  }

  let prev: ListNode | null = null
  let current: ListNode | null = head

  while (current) {
    const next: ListNode | null = current.next
    current.next = prev
    prev = current
    current = next
  }

  return prev
}

import { ListNode } from './linkedList'

const deleteNode = (node: ListNode<number> | null): void => {
  node!.val = node!.next!.val
  node!.next = node!.next!.next
}

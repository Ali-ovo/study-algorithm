import { TreeNode } from '.'

class AVLTreeNode<T> extends TreeNode<T> {
  left: AVLTreeNode<T> | null = null
  right: AVLTreeNode<T> | null = null
  parent: AVLTreeNode<T> | null = null

  height: number = 1

  getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0

    return Math.max(leftHeight, rightHeight) + 1
  }

  getBalanceFactor() {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0

    return leftHeight - rightHeight
  }

  get isBalanced(): Boolean {
    const factor = this.getBalanceFactor()
    return factor >= -1 && factor <= 1
  }

  public get higherChild() {
    let leftHeight = this.left ? this.left.getHeight() : 0
    let rightHeight = this.right ? this.right.getHeight() : 0

    if (leftHeight > rightHeight) return this.left
    if (leftHeight < rightHeight) return this.right
    return this.isLeft ? this.left : this.right
  }
}

const avlNode1 = new AVLTreeNode(10)
avlNode1.right = new AVLTreeNode(15)
avlNode1.right.right = new AVLTreeNode(20)

// console.log(avlNode1.getBalanceFactor())
// console.log(avlNode1.right.getBalanceFactor())

// console.log(avlNode1.isBalanced)
// console.log(avlNode1.right.isBalanced)


console.log(avlNode1.higherChild)
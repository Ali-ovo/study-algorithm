export class TreeNode<T> {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
  parent: TreeNode<T> | null

  constructor(value: T) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }

  get isLeft() {
    return this.parent !== null && this.parent.left === this
  }

  get isRight() {
    return this.parent !== null && this.parent.right === this
  }
}

export class BSTree<T> {
  private root: TreeNode<T> | null = null

  insert(value: T) {
    const newNode = new TreeNode(value)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  private insertNode(node: TreeNode<T> | null, newNode: TreeNode<T>) {
    if (node === null) {
      return newNode
    }

    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  preOrderTraversal(fn: (val: T) => void) {
    // this.preOrderTraverseNode(this.root, fn)
    this.preOrderTraverseNodeStack(this.root, fn)
  }

  private preOrderTraverseNode(node: TreeNode<T> | null, fn: (val: T) => void) {
    if (node === null) {
      return
    }
    fn(node.value)
    this.preOrderTraverseNode(node.left, fn)
    this.preOrderTraverseNode(node.right, fn)
  }

  private preOrderTraverseNodeStack(node: TreeNode<T> | null, fn: (val: T) => void) {
    if (node === null) {
      return
    }

    const stack = [node]
    while (stack.length > 0) {
      const n = stack.pop()

      if (!n) {
        continue
      }
      fn(n.value)

      if (n.right) stack.push(n.right)
      if (n.left) stack.push(n.left)
    }
  }

  inOrderTraverse(fn: (val: T) => void) {
    // this.inOrderTraverseNode(this.root, fn)
    this.inOrderTraverseNodeStack(this.root, fn)
  }

  private inOrderTraverseNode(node: TreeNode<T> | null, fn: (val: T) => void) {
    if (node === null) {
      return
    }
    this.inOrderTraverseNode(node.left, fn)
    fn(node.value)
    this.inOrderTraverseNode(node.right, fn)
  }

  private inOrderTraverseNodeStack(node: TreeNode<T> | null, fn: (val: T) => void) {
    if (node === null) {
      return
    }

    const stack: (TreeNode<T> | null)[] = []
    let pre: TreeNode<T> | null = node

    while (stack.length || pre) {
      while (pre) {
        stack.push(pre)
        pre = pre.left
      }

      const n = stack.pop()
      if (!n) {
        continue
      }
      fn(n.value)
      pre = n.right
    }
  }

  postOrderTraverse(fn: (val: T) => void) {
    // this.postOrderTraverseNode(this.root, fn)
    this.postOrderTraverseNodeStack(this.root, fn)
  }

  private postOrderTraverseNode(node: TreeNode<T> | null, fn: (val: T) => void) {
    if (node === null) {
      return
    }
    this.postOrderTraverseNode(node.left, fn)
    this.postOrderTraverseNode(node.right, fn)
    fn(node.value)
  }

  private postOrderTraverseNodeStack(node: TreeNode<T> | null, fn: (val: T) => void) {
    if (node === null) {
      return
    }

    const stack: (TreeNode<T> | null)[] = [node]
    const res: TreeNode<T>[] = []

    while (stack.length) {
      const n = stack.pop()
      if (!n) {
        continue
      }
      res.push(n)
      if (n.left) stack.push(n.left)
      if (n.right) stack.push(n.right)
    }

    while (res.length) {
      const n = res.pop()
      if (!n) {
        continue
      }
      fn(n.value)
    }
  }

  levelOrderTraverse(fn: (val: T) => void) {
    if (this.root === null) {
      return
    }

    const queue = [this.root]
    while (queue.length > 0) {
      const node = queue.shift()
      if (!node) {
        continue
      }

      fn(node.value)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }

  getMaxValue() {
    let currentNode = this.root

    while (currentNode && currentNode.right) {
      currentNode = currentNode.right
    }

    return currentNode ? currentNode.value : null
  }

  getMinValue() {
    let currentNode = this.root

    while (currentNode && currentNode.left) {
      currentNode = currentNode.left
    }

    return currentNode ? currentNode.value : null
  }

  private searchNode(value: T) {
    let currentNode = this.root
    let parentNode: TreeNode<T> | null = null

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode
      }
      parentNode = currentNode
      if (currentNode.value < value) {
        currentNode = currentNode.right
      } else {
        currentNode = currentNode.left
      }

      if (currentNode) currentNode.parent = parentNode
    }
    return null
  }

  search(value: T) {
    return !!this.searchNode(value)
  }

  remove(value: T) {
    const current = this.searchNode(value)
    if (!current) {
      return false
    }

    let replaceNode: TreeNode<T> | null = null

    if (current.left === null && current.right === null) {
      replaceNode = null
    } else if (current.right === null) {
      replaceNode = current.left
    } else if (current.left === null) {
      replaceNode = current.right
    } else {
      replaceNode = this.getSuccessor(current)
    }

    if (current === this.root) {
      this.root = replaceNode
    } else if (current.isLeft) {
      current.parent!.left = replaceNode
    } else {
      current.parent!.right = replaceNode
    }

    return true
  }

  private getSuccessor(delNode: TreeNode<T>) {
    let current = delNode?.right
    let successor: TreeNode<T> | null = null
    while (current) {
      successor = current
      current = current.left
      if (current) {
        current.parent = successor
      }
    }

    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right
      successor!.right = delNode.right
    }

    successor!.left = delNode.left

    return successor
  }

  print() {
    if (!this.root) {
      console.log('Empty tree')
      return
    }

    // Tree visualization using ASCII characters for a top-down display
    const printNode = (node: TreeNode<T> | null, prefix = '', isLeft = true) => {
      if (!node) return

      // Print right subtree first (will appear at the top)
      printNode(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)

      // Print current node
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`)

      // Print left subtree
      printNode(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }

    // Print root node
    console.log(this.root.value)

    // Print right subtree
    printNode(this.root.right, '', false)

    // Print left subtree
    printNode(this.root.left, '', true)
  }
}

const bts = new BSTree<number>()
bts.insert(11)
bts.insert(7)
bts.insert(15)
bts.insert(5)
bts.insert(3)
bts.insert(9)
bts.insert(8)
bts.insert(10)
bts.insert(13)
bts.insert(12)
bts.insert(14)
bts.insert(20)
bts.insert(18)
bts.insert(25)
bts.insert(6)
bts.remove(15)

bts.print()

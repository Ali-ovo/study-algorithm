export class Graph<T> {
  private vertexes: T[] = []
  private adjList: Map<T, T[]> = new Map()

  addVertex(vertex: T) {
    this.vertexes.push(vertex)

    this.adjList.set(vertex, [])
  }

  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2)
    this.adjList.get(v2)?.push(v1)
  }

  traverse() {
    console.log('Graph Traversal:')
    this.vertexes.forEach(vertex => {
      const edges = this.adjList.get(vertex)

      console.log(`${vertex} -> ${edges?.join(', ')}`)
    })
  }

  bfs() {
    if (this.vertexes.length === 0) return

    const queue = [this.vertexes[0]]

    const visited = new Set<T>()

    visited.add(this.vertexes[0])

    while (queue.length) {
      const vertex = queue.shift()!

      console.log(vertex)

      const edges = this.adjList.get(vertex)

      edges?.forEach(edge => {
        if (!visited.has(edge)) {
          visited.add(edge)
          queue.push(edge)
        }
      })
    }
  }

  dfs() {
    if (this.vertexes.length === 0) return

    const stack = [this.vertexes[0]]
    const visited = new Set<T>()

    visited.add(this.vertexes[0])
    while (stack.length) {
      const vertex = stack.pop()!

      console.log(vertex)

      const edges = this.adjList.get(vertex)

      for (let i = edges!.length - 1; i >= 0; i--) {
        const edge = edges![i]

        if (!visited.has(edge)) {
          visited.add(edge)
          stack.push(edge)
        }
      }
    }
  }
}

const graph = new Graph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')
graph.addVertex('G')
graph.addVertex('H')
graph.addVertex('I')

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

graph.traverse()
graph.dfs()

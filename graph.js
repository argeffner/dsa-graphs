class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // make sure to check if adjacent first
    for (let n of this.nodes) {
      if (n.adjacent.has(vertex)) {
        n.adjacent.delete(vertex)
      }
    }
    // now delete vertex from node set
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let saw = new Set();
    let arr = [];

    function traverse(n) {
      // if there is no vertex
      if (!n) return null;

      saw.add(n)
      arr.push(n.value);
      // check if vertex was seen
      n.adjacent.forEach(neighbor => {
        if (!saw.has(neighbor)) {
          return traverse(neighbor);
        }
      });
      // It did not pass test
      /* for (let neighbor of n.adjacent) {
        if (!saw.has(neighbor)) {
          return traverse(neighbor);
        }} */
    }

    traverse(start)
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const amount = [start];
    const saw = new Set();
    const arr = [];
    let n;

    saw.add(start);

    while (amount.length) {
      n = amount.shift();
      arr.push(n.value) ;
      // check neighbors
      n.adjacent.forEach( neighbor => {
        if (!saw.has(neighbor)) {
          saw.add(neighbor);
          amount.push(neighbor);
        }
      });
    }
    return arr;
  }
  
}

module.exports = {Graph, Node}
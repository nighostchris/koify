import Vertex from './vertex';

export class KoifyGraph<T> {
  private keyField: string;

  private graph: Vertex<T>[];

  constructor(keyField: string) {
    this.graph = [];
    this.keyField = keyField;
  }

  public hasVertex(vertex: Vertex<T>): boolean {
    const isExist = this.graph.find((v) => (<any>v.getData())[this.keyField] === (<any>vertex)[this.keyField]);

    if (typeof isExist !== 'undefined') {
      return true;
    }

    return false;
  }

  public addVertex(vertex: Vertex<T>): boolean {
    if (this.hasVertex(vertex)) {
      return true;
    }

    this.graph.push(vertex);

    return true;
  }

  public addEdge(vertexOne: Vertex<T>, vertexTwo: Vertex<T>): boolean {
    if (!this.hasVertex(vertexOne) || !this.hasVertex(vertexTwo)) {
      throw new Error(`Cannot find vertex in the graph with key field: ${this.keyField}`);
    }

    vertexOne.getConnectedVertices().push(vertexTwo);
    vertexTwo.getConnectedVertices().push(vertexOne);

    return true;
  }

  public deleteEdge(vertexOne: Vertex<T>, vertexTwo: Vertex<T>): boolean {
    if (!this.hasVertex(vertexOne) || !this.hasVertex(vertexTwo)) {
      throw new Error(`Cannot find vertex in the graph with key field: ${this.keyField}`);
    }

    vertexOne.getConnectedVertices().filter(
      (v) => (<any>v.getData())[this.keyField] !== (<any>vertexTwo)[this.keyField],
    );

    vertexTwo.getConnectedVertices().filter(
      (v) => (<any>v.getData())[this.keyField] !== (<any>vertexOne)[this.keyField],
    );

    return true;
  }
}

export default KoifyGraph;

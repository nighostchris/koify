export class Vertex<T> {
  private data: T;

  private connected: Vertex<T>[];

  constructor(data: T) {
    this.data = data;
    this.connected = [];
  }

  public getData(): T {
    return this.data;
  }

  public getConnectedVertices(): Vertex<T>[] {
    return this.connected;
  }
}

export default Vertex;

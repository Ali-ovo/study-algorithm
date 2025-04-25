export class ArrayQueue <T>{
  private data: T[] = [];

  enqueue(item: T): void {
    this.data.push(item);
  }

  dequeue(){
    return this.data.shift();
  }
  front(){
    return this.data[0];
  }
  isEmpty(){
    return this.data.length === 0;
  }
  size(){
    return this.data.length;
  }
  clear(){
    this.data = [];
  }
}
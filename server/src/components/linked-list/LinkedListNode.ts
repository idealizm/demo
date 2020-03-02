export default class LinkedListNode {
  public value: any;
  public next: any;

  constructor(value: any, next: any = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback: any) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

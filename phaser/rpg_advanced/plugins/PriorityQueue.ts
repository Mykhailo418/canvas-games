export default class  PriorityQueue {
  comparator: Function|any;
  items: any[];
  constructor(props){
    this.items = [];
    this.comparator = props.comparator;
  }
  addElement(element){
    let contain = false;
    for(let i = 0; i < this.items.length; i++){
      if(this.comparator(this.items[i], element)){
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }
    if(!contain){
      this.items.push(element);
    }
  }
  getAll(){
    return [...this.items];
  }
  lowest() {
    return this.items[this.items.length - 1];
  }
  highest() {
    return this.items[0];
  }
  getHighestAndRemove() {
    return this.items.shift();
  }
}

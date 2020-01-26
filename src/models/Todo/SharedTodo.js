import Todo from "./Todo";

export default class SharedTodo extends Todo {
  constructor(obj, isOwner) {
    super(obj);
    this.isOwner = isOwner;
  }
}

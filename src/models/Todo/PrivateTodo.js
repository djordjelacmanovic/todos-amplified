import Todo from "./Todo";

export default class PrivateTodo extends Todo {
  constructor(obj) {
    super(obj);
    this.isOwner = true;
  }
}

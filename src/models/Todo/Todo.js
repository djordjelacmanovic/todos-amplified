import moment from "moment";

export default class Todo {
  constructor({ id, owner, title, text, createdAt, updatedAt }) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get relativeCreatedAt() {
    return moment(this.createdAt).fromNow();
  }
}

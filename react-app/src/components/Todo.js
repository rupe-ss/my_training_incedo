import { Component } from "react";
import "../styles/Todo.css";

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: {
        userId: "",
        id: "",
        title: "",
        completed: "",
      },
      todos: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          todos: data,
        });
      });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.todos.map((e) => {
            return (
              <div className="todo" key={e.id}>
                ID: {e.id} USERID: {e.userId} <br />
                Title: {e.title} <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

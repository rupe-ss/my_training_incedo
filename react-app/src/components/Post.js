import axios from "axios";
import React, { Component } from "react";

export class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      msg: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        this.setState({
          posts: response.data.slice(0, 5),
        });
      })
      .catch((error) => {
        this.setState({
          msg: "Could not load posts",
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>{this.state.msg === "" ? "" : this.state.msg}</div>
        <h1>{!this.state.posts ? <h1>App Posts</h1> : ""}</h1>
        {this.state.posts.map((e) => {
          return (
            <div key={e.id}>
              ID: {e.id}
              UserID: {e.userId} <br />
              Title: {e.title} <br />
              {e.body}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

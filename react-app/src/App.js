import { Component } from "react";
import { Calc } from "./components/Calc";
import { Nums } from "./components/Nums";
import { Post } from "./components/Post";
import { Todo } from "./components/Todo";
import "./styles/AppStyles.css";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Calc />
        <Nums /> */}
        <Todo />
        {/* <Post /> */}
      </div>
    );
  }
}

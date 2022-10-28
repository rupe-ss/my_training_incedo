import { Component } from "react";
import "./styles/AppStyles.css";

export default class App extends Component {
  spanStyle = {
    fontSize: 30,
  };
  constructor(props) {
    super(props);

    this.state = {
      x: 10,
      y: 5,
      ans: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>Calc Ops</h1>
        <p>x = {this.state.x}</p>
        <p>y = {this.state.y}</p>
        <span className="span-style">
          Ans is: {this.state.ans === 0 ? "" : this.state.ans}
        </span>
        <hr></hr>
        <button
          onClick={() => {
            this.calc("ADD");
          }}
        >
          ADD
        </button>
        <button
          onClick={() => {
            this.calc("SUB");
          }}
        >
          SUB
        </button>
        <button
          onClick={() => {
            this.calc("MUL");
          }}
        >
          MUL
        </button>
        <button
          onClick={() => {
            this.calc("DIV");
          }}
        >
          DIV
        </button>
      </div>
    );
  }

  calc(op) {
    console.log(op);
    switch (op) {
      case "ADD":
        this.setState({
          ans: this.state.x + this.state.y,
        });
        break;
      case "SUB":
        this.setState({
          ans: this.state.x - this.state.y,
        });
        break;
      case "MUL":
        this.setState({
          ans: this.state.x * this.state.y,
        });
        break;
      case "DIV":
        this.setState({
          ans: this.state.x / this.state.y,
        });
        break;
      default:
    }
  }
}

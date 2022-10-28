import { Component } from "react";

export class Nums extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arry: [4, 2, 4, 6, 8, 5],
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.arry.map((num) => {
            return <li key={Math.random() * 10000}>{num}</li>;
          })}
          <button
            onClick={() => {
              this.sort("ASC");
            }}
          >
            Sort-ASC
          </button>{" "}
          <button
            onClick={() => {
              this.sort("DSC");
            }}
          >
            Sort-DSC
          </button>
        </ul>
      </div>
    );
  }

  sort(sort) {
    if (sort === "ASC") {
      this.setState({ arry: this.state.arry.sort((a, b) => a - b) });
    } else this.setState({ arry: this.state.arry.sort((a, b) => b - a) });
  }
}

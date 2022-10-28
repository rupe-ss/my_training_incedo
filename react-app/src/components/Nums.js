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
        </ul>
      </div>
    );
  }
}

import React, { Component } from "react";

class Sharedtextarea extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <label><pre>Enter value : </pre> </label>
        <input type="textare" 
          name="textValue"
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default Sharedtextarea;
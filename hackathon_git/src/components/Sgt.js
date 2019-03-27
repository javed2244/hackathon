// eslint-disable-next-line
import React from "react";
import { postData } from "../network/API";
import { type } from "../utils/Type";
import { clearData } from "../storage/asyncStorage";
import { Button } from 'react-bootstrap';
var a = [];

class Sgt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", value: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    postData(this.state.name, this.state.value, type.typeSG);
  }

  render() {
    return (

     <form onSubmit={(event)=>this.handleSubmit(event)}>

        <h2>SGT</h2>
        <p>This is SGT Page.Here inputs will be Tag name.</p>

        <br />
        <br />

        <label><strong>
          Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            name="sgtName"
            type="string"
            value={this.state.name}
            onChange={name => this.setState({ name: name.target.value })}
          />
          <br />
          <br />
          <br />
          Tag Value:&nbsp;&nbsp;
          <input
            name="sgtTag"
            type="number"
            value={this.state.value}
            // onChange={this.handleInputChange}
            onChange={value => this.setState({ value: value.target.value })}
          />
          </strong>
        </label>
        <br />
        <br />
        <br />

        <input type="Submit" class="btn btn-primary" value="Submit" />&nbsp;
        <button class="btn btn-secondary" onClick={(event) => {event.preventDefault();
          clearData(type.typeSG);}}>RESET SGTs</button>
      </form>
    );
  }
}

export default Sgt;

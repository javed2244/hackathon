import React from "react";
import { type } from "../utils/Type";
import { postData } from "../network/API";
import { clearData } from "../storage/asyncStorage";

class Sgacl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    postData(this.state.name, this.state.value, type.typeSGACLs);
  }

  render() {
    return (
    <form onSubmit={(event)=>this.handleSubmit(event)}>
        <h2>SGACL</h2>
        <p>This is SGACL Page.Here inputs will be name and ACL content.</p>
        <br />
        <br />
        <label><strong>
          Name:&nbsp;&nbsp;
          <input
            name="sgaclName"
            type="string"
            value={this.state.sgaclName}
            onChange={name => this.setState({ name: name.target.value })}
          />
          <br />
          <br />
          <br />
          SGACL Content:
          <br />
          <br />
          <textarea
            name="sgaclContent"
            rows="10"
            cols="50"
            value={this.state.sgaclContent}
            onChange={value => this.setState({ value: value.target.value })}
          />
          </strong>
        </label>
        <br />
        <br />
        <input type="Submit" class="btn btn-primary" value="Push" />&nbsp;
        <button class="btn btn-secondary" onClick={(event) => {event.preventDefault();
          clearData(type.typeSGACLs);}}>RESET SGACLs</button>
      </form>
    );
  }
}

export default Sgacl;

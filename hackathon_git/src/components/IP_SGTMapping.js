// eslint-disable-next-line
import React, { Component } from "react";
import { type } from "../utils/Type";
import {
  getStorage,
  getSelectedMapping,
  clearData
} from "../storage/asyncStorage";
import { postData } from "../network/API";

class IP_SGTMapping extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    selectedMappingName: "Select",
    selectedMapping: {},
    mappings: [],
    ipAddress: "",
    selectedSecurityGroupUUID: "",
    selectedSecurityGroupACLsUUID: "",
    score:null
  };
  setMapping(selectedMapping) {
    console.log("Inside setmapping");
    this.setState({ selectedMapping });
    console.log("Inside setmapping" + JSON.stringify(selectedMapping));
  }
  onValueChangeMapping(selectedMappingName) {
    this.setState({ selectedMappingName });

    getSelectedMapping(
      selectedMappingName,
      this.setMapping.bind(this)
    );
  }

  componentWillMount() {
    getStorage(type.typeMapping).then(async mappings => {
      if (mappings) {
        this.setState({ mappings });
      }
    });
  }
  handleSubmit(event) {

    // if(this.state.selectedMappingName === "Select"){
    //   alert("Please Select a SecurityGroup");
    //   return;
    // }
    console.log("selectedMapping:" + JSON.stringify(this.state.selectedMapping));
    console.log("selectedMappingName:" + this.state.selectedMappingName);
    console.log("destinationSgtId:" + this.state.selectedMapping.destinationSgtId);
    event.preventDefault();

   postData(
      this.state.selectedMapping.destinationSgtId,
      this.state.ipAddress,
      type.typeMapping
    );
    setTimeout(() => { postData(
      this.state.selectedMapping.destinationSgtId,
      this.state.selectedMapping.sgacls,
      type.typeMatrixCell
    ); }, 5000);



  }

  render() {
    return (
      <form onSubmit={(event)=>this.handleSubmit(event)}>
        <h2>Interested URL</h2>
        <br />
        <br />
        <br />

        <label><strong>
          Enter an Interested URL: &nbsp;&nbsp;&nbsp;&nbsp;
          </strong>
          <input
            name="destUrl"
            type="string"
            value={this.state.destUrl}
            onChange={ipAddress =>
              this.setState({ ipAddress: ipAddress.target.value })
            }
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input type="submit" class="btn btn-primary" value="Submit" />&nbsp;
        <button class="btn btn-secondary"
          onClick={(event) => {
            event.preventDefault();
            localStorage.clear();
          }}
        >
          RESET ALL
        </button>
      </form>
    );
  }
}

export default IP_SGTMapping;

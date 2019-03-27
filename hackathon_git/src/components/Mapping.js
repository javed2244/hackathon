// eslint-disable-next-line
import React, { Component } from "react";
import { type } from "../utils/Type";
import { getStorage, getSetUUID } from "../storage/asyncStorage";
import { store, clearData } from "../storage/asyncStorage";
import { mappingFormatter } from "../model/DataFormatter";

class Mapping extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    selectedSecurityGroup: "Select",
    selectedSecurityGroupACLs: "Select",
    selectedSecurityGroupUUID: "",
    selectedSecurityGroupACLsUUID: "",
    SecurityGroup: [],
    SecurityGroupACLs: []
  };
  setUUIDValue(valueType, uuid) {
    switch (valueType) {
      case type.typeSG:
        this.setState({ selectedSecurityGroupUUID: uuid });
        break;
      case type.typeSGACLs:
        this.setState({ selectedSecurityGroupACLsUUID: uuid });
        break;
    }
  }
  onValueChangeSecurityGroup(selectedSecurityGroup) {
    this.setState({ selectedSecurityGroup });
    console.log("Hi");

    console.log(JSON.stringify(selectedSecurityGroup));
    getSetUUID(
      type.typeSG,
      selectedSecurityGroup,
      this.setUUIDValue.bind(this)
    );
  }
  onValueChangeSecurityGroupACLs(selectedSecurityGroupACLs) {
    this.setState({ selectedSecurityGroupACLs });
    console.log(JSON.stringify(selectedSecurityGroupACLs));
    getSetUUID(
      type.typeSGACLs,
      selectedSecurityGroupACLs,
      this.setUUIDValue.bind(this)
    );
  }
  componentDidMount() {
    getStorage(type.typeSG).then(async item => {
      if (item) {
        this.setState({ SecurityGroup: item });
      }
    });
    getStorage(type.typeSGACLs).then(async item => {
      if (item) {
        this.setState({ SecurityGroupACLs: item });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

if(this.state.selectedSecurityGroup === "Select"){
  alert("Please Select a SecurityGroup");
  return;
}
else if(this.state.selectedSecurityGroupACLs === "Select"){
  alert("Please Select a SecurityGroupACLs");
  return;
}

console.log(JSON.stringify(this.state.selectedSecurityGroup));
console.log(JSON.stringify(this.state.selectedSecurityGroupUUID));
console.log(JSON.stringify(this.state.selectedSecurityGroupACLs));
console.log(JSON.stringify(this.state.selectedSecurityGroupACLsUUID));
    store(
      type.typeMapping,
      mappingFormatter(
        this.state.selectedSecurityGroup,
        this.state.selectedSecurityGroupUUID,
        this.state.selectedSecurityGroupACLs,
        this.state.selectedSecurityGroupACLsUUID
      )
    );
  }

  render() {
    // console.log("State->" + JSON.stringify(this.state));
    return (
      <form onSubmit={(event)=>this.handleSubmit(event)}>
        <h2>SGT-SGACL</h2>
        <p>here Binding of SGT & SGACL happens</p>
        <br />
        <br />
        <br />
        <label><strong>
          SGT &nbsp;&nbsp;
          <select
            name="sgtDropDown"
            value={this.state.selectedSecurityGroup}
            onChange={name =>
              this.onValueChangeSecurityGroup(name.target.value)
            }
          >
          <option value={"Select"}>Select</option>

            {this.state.SecurityGroup &&
              this.state.SecurityGroup.length > 0 &&
              this.state.SecurityGroup.map((item, index) => {
                return (
                  <option key={index.toString()} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select></strong>
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label><strong>
          SGACL &nbsp;&nbsp;
          <select
            name="sgaclDropDown"
            value={this.state.selectedSecurityGroupACLs}
            onChange={name =>
              this.onValueChangeSecurityGroupACLs(name.target.value)
            }
          >
            <option value={"Select"}>Select</option>
            {this.state.SecurityGroupACLs &&
              this.state.SecurityGroupACLs.length > 0 &&
              this.state.SecurityGroupACLs.map((item, index) => {
                return (
                  <option key={index.toString()} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          </strong>
        </label>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <input type="submit" class="btn btn-primary" value="Bind" />&nbsp;
        <button class="btn btn-secondary" onClick={(event) => {event.preventDefault();
          clearData(type.typeMapping);}}>RESET Bindings</button>
      </form>
    );
  }
}

export default Mapping;

export const dataFormatter = (name, value, uuid) => {
  return { name, value, uuid };
};

export const mappingFormatter = (
  selectedSecurityGroup,
  selectedSecurityGroupUUID,
  selectedSecurityGroupACLs,
  selectedSecurityGroupACLsUUID
) => {
  return {
    sgtName: selectedSecurityGroup,  //selectedSecurityGroup+" -> "+selectedSecurityGroupACLs,
    destinationSgtId: selectedSecurityGroupUUID,
    sgtACLsName: selectedSecurityGroupACLs,
    sgacls: selectedSecurityGroupACLsUUID
  };
};

export const sgtFormatter = (name, value) => {
 return {
    "Sgt": {
      "id": "id",
      "name": name,
      "description": "description",
      "value": value
    }
  };
};
export const sgACLsFormatter = (name, value) => {
  return {
    Sgacl: {
      id: "id",
      name: name,
      description: "description",
      ipVersion: "IPV4",
      aclcontent: value
    }
  };
};
export const ipSGTMappingFormatter = (sgtUUID, hostName) => {
  var hostIp = hostName+"/32";
  console.warn(
    JSON.stringify({
      SGMapping: {
        name: hostIp,
        sgt: sgtUUID,
        deployTo: "70c79c30-8bff-11e6-996c-525400b48521", //All Device type
        deployType: "NDG",
        hostIp: hostIp
      }
    })
  );
  return {
    SGMapping: {
      name: hostIp,
      sgt: sgtUUID,
      deployTo: "70c79c30-8bff-11e6-996c-525400b48521",  //All device type
      deployType: "NDG",
      hostIp: hostIp
    }
  };
};
export const egressmatrixcellFormatter = (destinationSgtIdUUID, sgaclsUUID, sourceSgtId) => {
  console.warn(JSON.stringify({
    EgressMatrixCell: {
      sourceSgtId: sourceSgtId,  //id for ww2
      destinationSgtId: destinationSgtIdUUID,
      matrixCellStatus: "ENABLED",
      defaultRule: "PERMIT_IP",
      sgacls: [sgaclsUUID]
    }
  })
);
  return {
    EgressMatrixCell: {
      sourceSgtId: sourceSgtId,  //id for ww2
      destinationSgtId: destinationSgtIdUUID,
      matrixCellStatus: "ENABLED",
      defaultRule: "PERMIT_IP",
      sgacls: [sgaclsUUID]
    }
  };
};

/*
export const egressmatrixcellFormatter = (destinationSgtIdUUID, sgaclsUUID) => {
  console.warn({
    EgressMatrixCell: {
      sourceSgtId: "a70f8fa0-3d00-11e9-b9b4-a68f2a82a759",  //id for ww2
      destinationSgtId: destinationSgtIdUUID,
      matrixCellStatus: "MONITOR",
      defaultRule: "PERMIT_IP",
      sgacls: [sgaclsUUID]
    }
  });
  return {
    EgressMatrixCell: {
      sourceSgtId: "a70f8fa0-3d00-11e9-b9b4-a68f2a82a759",  //id for ww2
      destinationSgtId: destinationSgtIdUUID,
      matrixCellStatus: "MONITOR",
      defaultRule: "PERMIT_IP",
      sgacls: [sgaclsUUID]
    }
  };
};
*/

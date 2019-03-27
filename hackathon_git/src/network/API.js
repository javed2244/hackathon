import axios from "axios";
import { store } from "../storage/asyncStorage";
import { type } from "../utils/Type";
import {
  dataFormatter,
  ipSGTMappingFormatter,
  egressmatrixcellFormatter,
  sgtFormatter,
  sgACLsFormatter
} from "../model/DataFormatter";
  //import * as domainPing from "domain-ping";
import {
  getStorage,
  getSelectedMapping,
  clearData
} from "../storage/asyncStorage";
//import * as whois from 'node-xwhois';
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
  /* auth: {
      username: "soumya.sethy",
      password: "password"
    }*/
};
var sgtUUID, sgaclsUUID, score;
const getBodyEgress = async (TYPE, name, value, sourceSgtId) => {
  let body = {};
  if(TYPE == type.typeMatrixCell)
  {
    console.log("Type getBodyEgress called now");
    body = egressmatrixcellFormatter(name, value, sourceSgtId);
  }
  return body;
}
const getBody = (TYPE, name, value) => {
  console.log("Recieved Body Req...");
  let body = {};
  switch (TYPE) {
    case type.typeSG:
      body = sgtFormatter(name, value);
      break;
    case type.typeSGACLs:
      body = sgACLsFormatter(name, value);
      break;
    case type.typeMapping:
      console.log("Type mapping called now");
      body = ipSGTMappingFormatter(name, value);
      break;
    case type.typeMatrixCell:
      console.log("Type matrixcell/egress called now");
      body = egressmatrixcellFormatter(name, value);
  }
  return body;
};
const getURL = TYPE => {
  var URL = "";
  switch (TYPE) {
    case type.typeSG:
      URL = "/config/sgt/";
      break;
    case type.typeSGACLs:
      URL = "/config/sgacl/";
      break;
    case type.typeMapping:
      URL = "/config/sgmapping";
      break;
    case type.typeMatrixCell:
      URL = "/config/egressmatrixcell";
      break;
  }
  return URL;
};
/*
const postEgressFunction = (TYPE, name, value, sourcesgt) {
  console.log("Inside called function b[itr]=" + sourcesgt);
  axios
       .post(subUrl, getBodyEgress(TYPE, name, value, sourcesgt), {
         headers
       })
       .then(response => {
          console.log("Successfully posted for -> " + b[itr]);
          console.log(response);
        })
      .catch(error => {
        console.log("Error happened for " + b[itr]);
        console.log(error.message);
      })
};
*/
export const postData = (name, value, TYPE) => {
  console.log(name);
  console.log(value);
  console.log(TYPE);
  var subUrl = getURL(TYPE);

  //Temporary code for geting all sgt
  if(TYPE == type.typeMatrixCell)
  {
  var b = [];
  var itr = 0, len = 0,arrLen = 0;
  //Get all sgts to be filled in source SGT field
  axios.get("/config/sgt",{headers})
  .then(response => {
         console.log(response);
         console.log(response.data.SearchResult.total);
         len = response.data.SearchResult.total;


         while(itr < len){
           console.log(response.data.SearchResult.resources[itr].id);
           b.push(response.data.SearchResult.resources[itr].id);

        // console.log(response.data.SearchResult.resources[itr].id);
         itr = itr+1;
       }
           name = sgtUUID;
           value = sgaclsUUID ;
           console.log(name);
           console.log(value);
  	   console.log("Successfull");
     })
  .catch(error => {
        console.log("Error happened while sgt fetching");
        console.log(error.message);
      })
  .then(async () => {
       // always executed
       itr = -1;
       arrLen = b.length;
       console.log(b);
       console.log("Array length Now" + arrLen);
     //  console.log("Length Now" + len);
       //Traverse the array and send post request
       while(++itr< arrLen)
       {console.log("Itr value = " + itr);
       console.log("Itr value = " + b[itr]);
    await axios
         .post(subUrl, await getBodyEgress(TYPE, name, value, b[itr]), {
           headers
         })
         .then(async response => {
           console.log("Successfully posted for -> " + b[itr]);
           console.log(await response);
           if(itr == arrLen-1)
           alert(" successfully updated");
         })
         .catch(error => {
           console.log("Error happened for " + b[itr]);
           console.log(error.message);
         });
       }
     });

  } //End of If
  else if(TYPE == type.typeMapping)
  {
    axios.get("https://api.threatintelligenceplatform.com/v1/reputation?domainName="+value+"&apiKey=at_gwAdHjmkfDQcCofdvtJ4El5bTtb6J")
  .then(response => {
         console.log(response);
         console.log(response.data.reputationScore);
         score = response.data.reputationScore;
         //Manupulating wrong score to lesser value
         // if (score == 100){
         //   console.log("Wrong score.Updated to new score as 60");
         //    score = 60;
         //  }
         alert(value+" site has a score of  "+ score);


         getStorage(type.typeMapping).then(async mappings => {
           if (mappings) {
             console.log(mappings);
           console.log(mappings[0].sgtName);
           console.log(mappings[0].destinationSgtId);
           console.log(mappings[0].sgacls);
          var value2;
          if(score >= 90){
            sgtUUID = mappings[0].destinationSgtId;
            sgaclsUUID = mappings[0].sgacls;
            console.log(mappings[0].destinationSgtId);
            console.log(mappings[0].sgacls);
            value2="176.32.103.205";
            console.log("Good score sgt-sgacls update");
          }
          else if (score > 60 && score < 70){
            sgtUUID = mappings[1].destinationSgtId;
            sgaclsUUID = mappings[1].sgacls;
            console.log(mappings[1].destinationSgtId);
            console.log(mappings[1].sgacls);
            value2="104.25.66.105";
            console.log("Bad score sgt-sgacls update");
          }
          else{
            sgtUUID = mappings[2].destinationSgtId;
            sgaclsUUID = mappings[2].sgacls;
            console.log(mappings[2].destinationSgtId);
            console.log(mappings[2].sgacls);
            value2="172.217.167.165";
            console.log("Average score sgt-sgacls update");
          }

          console.log("About to post IP-SGT mappings");
            axios
            .post(subUrl, getBody(TYPE, sgtUUID, value2), {headers})
            .then(response => {
              console.log(response);
            })
	            .catch(error => {
                console.log("Error happened while IP_SGT pushing");
                console.log(error.message);
              });
           }
         });
         console.log("hi javed interURL = ",value);

     })
  .catch(error => {
        console.log("Error happened while IP_SGT pushing/domainquery");
        console.log(error.message);
        alert("error");
      });
  }
  //Apart from egress matrix cell
else{


  axios
    .post(subUrl, getBody(TYPE, name, value), {
      headers
    })
    .then(response => {
       console.log(response);
       var baseUrl = "https://10.106.174.59:9060/ers";
       var index = baseUrl.length + (subUrl.length);
       console.log(index);
      if (response.status === 201) {
        console.log("Data sent successfully");
        //For 3rd and 4th page no need to process for uuid
        if(!( (TYPE == type.typeMapping) || (TYPE == type.typeMatrixCell))) {
        console.log(response.headers.location);
        var uuid = response.headers.location.substring(index);  //let uuid = response.data.uuid;
        console.log("UUID->" + uuid);
        alert("data Sent Successfully");
        return uuid;
        }
      }
      else {
        return null;
      }


      })
    .then(uuid => {
      if (uuid) store(TYPE, dataFormatter(name, value, uuid));
    })
    .catch(error => {
      console.log("Error happened");
      console.log(error.message);
    });

  }
};

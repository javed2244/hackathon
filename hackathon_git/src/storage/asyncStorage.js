// import { AsyncStorage } from "react";
import { type } from "../utils/Type";

export const store = async (type, newObject) => {
  try {
    const oldArray = await localStorage.getItem(type);
    let mergedArray = oldArray
      ? JSON.stringify([...JSON.parse(oldArray), newObject])
      : JSON.stringify([newObject]);
    await localStorage.setItem(type, mergedArray);
    console.warn(type + "->", mergedArray);
  } catch (error) {
    console.warn("Writing->" + error.message);
  }
};

export const getStorage = async type => {
  try {
    const myArray = await localStorage.getItem(type);
    if ((await myArray) !== null) {
      return JSON.parse(await myArray);
    } else return {};
  } catch (error) {
    console.warn("Reading->" + error.message);
  }
};
export const getSetUUID = async (valueType, name, callBack) => {
  try {
    const data = await localStorage.getItem(valueType);
    if (data) {
      let dataArray = await JSON.parse(data);
      if (dataArray) {
        dataArray.map(item => {
          if (item) {
            if (name === item.name) {
              callBack(valueType, item.uuid);
            }
          }
        });
      }
    }
  } catch (error) {
    console.warn("Error Reading UUID->" + error.message);
  }
};
export const getSelectedMapping = async (name, callBack) => {
  try {
    const data = await localStorage.getItem(type.typeMapping);
    if (data) {
      let dataArray = await JSON.parse(data);
      if (dataArray) {
        dataArray.map(item => {
          if (item) {
            if (name === item.sgtName) {
              console.log(item.sgtName);
              callBack(item);
            }
          }
        });
      }
    }
  } catch (error) {
    console.warn("Error Reading UUID->" + error.message);
  }
};
export const clearData = async type => {
  await localStorage.removeItem(type);
};

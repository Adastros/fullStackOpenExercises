import axios from "axios";

// const baseUrl = "http://localhost:3001/persons";
const baseUrl = "/api/persons";

const postToServer = (dataObj) => {
  return axios.post(baseUrl, dataObj);
};

const deleteFromServer = (dataId) => {
  return axios.delete(baseUrl.concat(`/${dataId}`));
};

const getAllFromServer = () => {
  return axios.get(baseUrl);
};

const putToServer = (dataObj, newNumber) => {
  return axios.put(baseUrl.concat(`/${dataObj.id}`), {
    ...dataObj,
    number: newNumber,
  });
};

const phonebookService = {
  postToServer,
  deleteFromServer,
  getAllFromServer,
  putToServer,
};

export default phonebookService;

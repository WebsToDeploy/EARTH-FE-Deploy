/* eslint-disable no-unused-vars */
import axios from "axios";
// import BASE_URL from "env";

// const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:9000";

function getAPI(id, moduleName) {
  return axios.get(`${BASE_URL}/${moduleName}/get/${id}`);
}

function getAllAPI(moduleName, category, brand, supplier, minPrice, maxPrice) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${moduleName}/get`, {
        params: {
          category,
          brand,
          supplier,
          minPrice,
          maxPrice,
        },
      })
      .then((res) => resolve(res?.data?.data))
      .catch((err) => {
        reject(err);
      });
  });
}

// eslint-disable-next-line camelcase
function getAllItemsAPI(moduleName, ref_code = "") {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${moduleName}/getAllItems`, {
        params: {
          // eslint-disable-next-line camelcase
          ref_code,
        },
      })
      .then((res) => resolve(res?.data?.data))
      .catch((err) => {
        reject(err);
      });
  });
}

function getPriceAPI(moduleName) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${moduleName}/price`)
      .then((res) => resolve(res?.data?.data))
      .catch((err) => {
        reject(err);
      });
  });
}

function addAPI(data, moduleName) {
  return axios.post(`${BASE_URL}/${moduleName}`, data);
}

function updateAPI(id, data, moduleName) {
  return axios.put(`${BASE_URL}/${moduleName}/update/${id}`, data);
}

function deleteAPI(id, moduleName) {
  return axios.delete(`${BASE_URL}/${moduleName}/delete/${id}`);
}

export default {
  getAPI,
  getAllAPI,
  getAllItemsAPI,
  getPriceAPI,
  addAPI,
  updateAPI,
  deleteAPI,
};

/* eslint-disable no-unused-vars */
import axios from "axios";
// import API_URL from "env";

const BASE_URL = "http://localhost:9000";

function getById(id, moduleName) {
  return axios.get(`${BASE_URL}/${moduleName}/get/${id}`);
}

function searchAPI(region = "", start = "", end = "", search = "", moduleName) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${moduleName}/data`, {
        params: {
          region,
          start,
          end,
          search,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteAPI(id, moduleName) {
  return axios.delete(`${BASE_URL}/${moduleName}/delete/${id}`);
}

function updateAPI(id, body, moduleName) {
  return axios.put(`${BASE_URL}/${moduleName}/update/${id}`, body);
}

function importDataAPI(importedBy, file, moduleName) {
  const formData = new FormData();
  formData.append("imported_by", importedBy);
  formData.append("file", file);
  return axios.post(`${BASE_URL}/${moduleName}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function downloadTemplateAPI(fileName) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  const updatedFileName = `${fileName}_${formattedDate}`;

  return axios
    .get(`${BASE_URL}/download/${fileName}`, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", updatedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up by removing the link element
      window.URL.revokeObjectURL(url); // Clean up by revoking the temporary URL
    })
    .catch((error) => {
      console.error("Error occurred while downloading template:", error);
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getById,
  searchAPI,
  deleteAPI,
  updateAPI,
  importDataAPI,
  downloadTemplateAPI,
};

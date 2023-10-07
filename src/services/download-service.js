/* eslint-disable no-unused-vars */
import axios from "axios";
// import API_URL from "env";

const BASE_URL = "http://localhost:9000";

function downloadTemplate(fileName) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
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
export default { downloadTemplate };

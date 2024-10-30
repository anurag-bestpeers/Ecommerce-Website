import axios from "axios";

const api = async (method, url, data) => {
  if (method == "get") {
    const response = await axios.get(url);

    const filterdData = response.data.filter((item) => !item.deleted);
    return filterdData;
  } else if (method == "post") {
    const response = await axios.post(url, data);
    return response.data;
  } else if (method == "put") {
    const response = await axios.put(url, data);
    return response.data;
  } else if (method == "patch") {
    const response = await axios.patch(url, data);
    return response.data;
  }
};
export default api;

import axios from "axios";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token === null) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp && payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
};

export const fetchRequest = async (url, method = "GET", payload = null) => {
  const config = {
    method,
    url,
    headers: {},
  };
  if (payload) {
    config.headers["Content-Type"] = "application/json";
    config.data = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await axios(config);

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

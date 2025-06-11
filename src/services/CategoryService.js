import axios from "axios";
import { axiosJWT } from "./UserService";

export const createCategory = async (access_token, data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/category/create`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllCategories = async (search = "", limit = 0) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/category/getAllCategories?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/category/getAllCategories?limit=${limit}`
    );
  }
  return res.data;
};

export const getDetailsCategory = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/category/getCategoryById/${id}`
  );
  return res.data;
};

export const updateCategory = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/category/updateCategory/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteCategory = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/category/deleteCategory/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

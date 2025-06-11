import axios from "axios";
import { axiosJWT } from "./UserService";

export const createPost = async (access_token, data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/create`,
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

export const getAllPosts = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/post/getAllPosts?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/post/getAllPosts?limit=${limit}`
    );
  }
  return res.data;
};

export const getApprovedPosts = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/post/getApprovedPosts?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/post/getApprovedPosts?limit=${limit}`
    );
  }
  return res.data;
};

// export const getApprovedAndPaidPosts = async (search, limit, categoryId) => {
//   let url = `${process.env.REACT_APP_API_URL_BACKEND}/post/getApprovedAndPaidPosts?limit=${limit}`;
//   if (search?.length > 0) {
//     url += `&filter=name&filter=${search}`;
//   }
//   if (categoryId) {
//     url += `&categoryId=${categoryId}`;
//   }
//   const res = await axios.get(url);
//   return res.data;
// };
export const getApprovedAndPaidPosts = async (
  search,
  limit,
  categoryId,
  sort
) => {
  let url = `${process.env.REACT_APP_API_URL_BACKEND}/post/getApprovedAndPaidPosts?limit=${limit}`;
  if (search?.length > 0) {
    url += `&filter=${search}`;
  }
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  if (sort && sort !== "default") {
    url += `&sort=${sort}`;
  }
  const res = await axios.get(url);
  return res.data;
};

export const getPendingPosts = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/post/getPendingPosts?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/post/getPendingPosts?limit=${limit}`
    );
  }
  return res.data;
};

export const getDetailsPost = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/getPostById/${id}`
  );
  return res.data;
};

export const deletePost = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/deletePost/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updatePost = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/updatePost/${id}`,
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

export const getPostByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/getPostByUserId/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const approvedPost = async (id, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/aprovePost/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const rejectPost = async (id, access_token, rejectedReason) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/rejectPost/${id}`,
    { rejectedReason },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAverageRating = async (sellerId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/average-rating?sellerId=${sellerId}`
  );
  return res.data;
};


export const markAsSold = async (postId, access_token, receiverId) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/${postId}/sold`,
    {
      buyerId: receiverId,
    }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const markAsPurchased = async (postId, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/post/${postId}/purchased`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  return res.data;
};
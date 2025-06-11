import axios from "axios";
import { axiosJWT } from "./UserService"

export const chatBot = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/gemini/suggest`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};
export const upLoadImage = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/gemini/upload-image`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data;
};
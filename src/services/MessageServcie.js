import axios from "axios"
import { axiosJWT } from "./UserService"

export const getUserConversations = async (senderId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/conversation/list?userId=${senderId}`
    )
    return res.data
}
export const getOrCreateConversation = async (query) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/conversation?${query}`
    )
    return res.data
}
export const getMessages = async (conversationId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/message/${conversationId}`
    )
    return res.data
}
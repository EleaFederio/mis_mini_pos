import Axios from "axios";

export const axios = Axios.create({
    baseURL: "https://mis-pos.herokuapp.com/api",
    headers: {
        Auth: ""
    },
    timeout: 3000
})

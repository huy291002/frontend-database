import axiosClient from "./axiosClient";

const userAPI = {
    login: (user) => {
        const url = '/auth/login';
        return axiosClient.post(url, user);
    }
}

export default userAPI;
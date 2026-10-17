import {apiService} from "@/services/apiService";

const http = apiService();

export const userService = {
    usersIndex: async function () {
        return await http.get(`/api/users`)
    },
    usersPagination: async function (page = 1) {
        return await http.get(`/api/users?page=${page}`)
    },
    userShow: async function (user) {
        return await http.get(`/api/user/show/${user}`)
    },
    userUpdate: async function (user, payload) {
        return await http.put(`/api/user/update/${user}`, payload)
    },
    userDelete: async function (userID) {
        return await http.delete(`/api/user/destroy/${userID}`)
    },
}
import {apiService} from "@/services/apiService";

const http = apiService();

export const userRoleService = {
    userRolesIndex: async function (user) {
        return await http.get(`/api/user/${user}/roles`)
    },
    userRoleCreate: async function (user,role) {
        return await http.post(`/api/user/${user}/role/create`,role)
    },
    userRoleDelete: async function (user, role) {
        return await http.delete(`/api/user/${user}/role/${role}/destroy`)
    },
}
import {apiService} from "@/services/apiService";

const http = apiService();

export const userPermissionService = {
    userPermissionsIndex: async function (user) {
        return await http.get(`/api/user/${user}/permissions`)
    },
    userPermissionCreate: async function (user,permission) {
        return await http.post(`/api/user/${user}/permission/create`,permission)
    },
    userPermissionDelete: async function (user, permission) {
        return await http.delete(`/api/user/${user}/permission/${permission}/destroy`)
    },
}
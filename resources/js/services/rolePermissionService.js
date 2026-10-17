import {apiService} from "@/services/apiService";

const http = apiService();

export const rolePermissionService = {
    rolePermissionsIndex: async function (role) {
        return await http.get(`/api/role/${role}/permissions`)
    },
    rolePermissionCreate: async function (role,payload) {
        return await http.post(`/api/role/${role}/permission/create`,payload)
    },
    rolePermissionDelete: async function (roleID,permissionID) {
        return await http.delete(`/api/role/${roleID}/permission/${permissionID}/destroy`)
    },
}
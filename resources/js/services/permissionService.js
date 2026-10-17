import { apiService } from '@/services/apiService';

const http = apiService();

export const permissionService = {
  permissionsIndex: async function () {
    return  http.get('/api/permissions');
  },
  permissionShow: async function (permissionID) {
    return  http.get(`/api/permission/edit/${permissionID}`);
  },
  permissionCreate: async function (payload) {
    return  http.post('/api/permission/create',payload);
  },
  permissionUpdate: async function (permissionID, payload) {
    return  http.put(`/api/permission/update/${permissionID}`,payload);
  },
  permissionDelete: async function (permissionID) {
    return  http.delete(`/api/permission/destroy/${permissionID}`);
  },
};

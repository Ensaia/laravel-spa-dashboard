import { apiService } from '@/services/apiService';

const http = apiService();

export const roleService = {
  rolesIndex: async function () {
    return  http.get('/api/roles');
  },
  roleShow: async function (roleID) {
    return  http.get(`/api/role/edit/${roleID}`);
  },
  roleCreate: async function (payload) {
    return  await http.post('/api/role/create',payload);
  },
  roleUpdate: async function (roleID, payload) {
    return  http.put(`/api/role/update/${roleID}`,payload);
  },
  roleDelete: async function (roleID) {
    return  http.delete(`/api/role/destroy/${roleID}`);
  },
};

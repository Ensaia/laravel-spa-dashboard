import {apiService} from '@/services/apiService';

const http = apiService();

export const authService = {
    login: async function (payload) {
        return http.post('/login', payload);
    },
    register: async function (payload) {
        return http.post('/register', payload);
    },
    getCurrentUser: async function () {
        return http.get('/api/user/auth');
    },
    logout: async function () {
        return http.post('/logout');
    },
    forgotPassword: async function (payload) {
        return http.post('/forgot-password', payload);
    },
    resetPassword: async function (payload) {
        return http.post('/reset-password', payload);
    },
    updatePassword: async function (payload) {
        return http.put('/user/password', payload);
    },
    sendEmailVerification: async function () {
        return http.post('/api/email/verification-notification');
    },
    emailVerification: async function (id, hash,queryParams) {
        return http.get(`/api/email/verify/${id}/${hash}${queryParams}`);

    },
    updateProfile: async function (payload) {
        return http.put('/user/profile-information', payload);
    }
};

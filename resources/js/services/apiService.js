import axios from '@/plugins/axios'
import middleware401 from '@/services/middleware/middleware401'
import middlewareCSRF from '@/services/middleware/middlewareCSRF'
import { useAuthStore } from '@/stores/auth';

export const apiService = () => {

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  /**
   *middleware 401
   */
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
   middleware401
  );
  /**
   * middlewareCSRF
   */
  axiosInstance.interceptors.request.use(
  middlewareCSRF,
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

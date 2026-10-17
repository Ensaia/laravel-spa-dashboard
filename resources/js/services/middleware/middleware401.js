import { useAuthStore } from '@/stores/auth'
import router from '@/router'
/**
 * Middleware - if user lost authentication (401) it gets kicked out
 * FROM https://youtu.be/BWNcuB3LQz8?t=1119
 */

const middleware401 = async (error) => {
          const { status } = error.request;
          console.log(`middleware401  ${status}`)
          if(status === 403){
              router.push({ name: 'VerifyEmail' });
          }
          if (status === 401 || status === 419) {
            const auth = useAuthStore();
            setTimeout(async () => {
              await auth.logout();
            }, 3000);
            return Promise.reject({
              name: 'تم رفض الإذن',
              message:
                'لقد فقدت بيانات اعتمادك - سيتم إعادة توجيهك إلى صفحة تسجيل الدخول.',
            });
          }
          return Promise.reject(error);
}
export { middleware401 as default }

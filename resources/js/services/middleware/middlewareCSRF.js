import axios from '@/plugins/axios'

const getCookiesArray = () => document.cookie.split(';').reduce((cookieArray, cookie) => {
	let [key] = cookie.split('=')
	if (key) cookieArray.push(key.trim())
	return cookieArray
}, [])
const middlewareCSRF = async (config) => {
      let coockie = getCookiesArray();
      let isTokenMissing = !coockie.includes('XSRF-TOKEN');
      let methodsNeedCsrf = ['post', 'put', 'delete'];
      let doseMethodRequireCsrf = methodsNeedCsrf.includes(config.method);
      if (isTokenMissing && doseMethodRequireCsrf) {
        let csrfPath = '/sanctum/csrf-cookie';
        let url = 'http://localhost:8000'
        let urlToCall = `${url}${csrfPath}`;
        await axioa.get(urlToCall, { withCredentials: true });
        return config
      }
      return config
    }
    export { middlewareCSRF as default }
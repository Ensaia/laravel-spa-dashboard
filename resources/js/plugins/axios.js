import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.baseURL = window.AppConfig.url;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
axios.defaults.params = {};
axios.defaults.timeout = 10000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-Locale'] = 'ar';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;

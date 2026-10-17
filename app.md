<p>bootstrap 5 </p>

```
npm i bootstrap@5.3.8

app.css
@import 'bootstrap/dist/css/bootstrap.css'; //main.css

app.js
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
app.provide('bootstrap', bootstrap);
```
<p>vue-router</p>

```
npm install vue-router

app.js
import router from './router';
app.use(router);

router.js
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Index'),
    meta: { layout: 'home'},
  }
]
export default routes;

index.js
import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});
router.beforeEach(async (to, from) => {})
export default router;
```
<p>pinia</p>

```
npm install pinia
main.js
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
store.js
import { defineStore } from 'pinia'
export const useExampleStore = defineStore('example', {
state:() => { return { users: [] } },
actions: { async getUsers(){} },
getters: { users: (state) => state.users }
})
```

<p>fontawesome</p>

```
npm install @fortawesome/vue-fontawesome@latest-3

npm install @fortawesome/fontawesome-svg-core

npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/free-regular-svg-icons
npm install @fortawesome/free-brands-svg-icons

app.js
app.component("font-awesome-icon", fontAwesomeIcon)

utilities/fontawesome.js
import { FontAwesomeIcon as fontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {} from "@fortawesome/free-solid-svg-icons";
library.add()
export default fontAwesomeIcon;
```

<p>axios</p>

```
npm install axios

plugins/axios.js
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
```


<p>API Service</p>

```
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

middleware401.js
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
/**
 * Middleware - if user lost authentication (401) it gets kicked out
 * FROM https://youtu.be/BWNcuB3LQz8?t=1119
 */

const middleware401 = async (error) => {
          const { status } = error.request;
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

middlewareCSRF.js
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
```

<p>vuejs</p>

```
npm install --save-dev vue @vitejs/plugin-vue
npm add -D vite-plugin-vue-devtools
```

<p>vite.config.js</p>

```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { bunny } from 'laravel-vite-plugin/fonts';
import path from 'path'; // or use fileURLToPath if preferred
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js/'),
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});

```

<p>Controller</p>

```
SpaController.php 
<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

class SpaController extends BaseController
{
    /**
     * Renders the main app screen
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function __invoke()
    {
        return view('index');
    }
}
?>

AuthController.php
<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __invoke()
    {
        return Auth::check() ? new UserResource(Auth::user()) : null;
    }
}
?>

TokenController.php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TokenController extends Controller
{
    /**
     * This controller provides a token for mobile devices
     * It can also be used to access the API via a GUI
     * Insomnia or Postman are two examples of GUI's
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json(['token' => $token], 200);
    }
}
?>
```

<p>Router</p>

```
routes/web.php
Route::get('{path}', App\Http\Controllers\SpaController::class)->where('path', '(.*)');
```

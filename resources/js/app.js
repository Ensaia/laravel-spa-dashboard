import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'

import router from '@/router'

import CoreuiVue from '@coreui/vue'

import registerLayout from '@/helpers/registerLayout';
import fontAwesomeIcon from "@/utilities/fontawesome";
import icons from "@/utilities/coreui";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { CIcon } from '@coreui/icons-vue';
import '@coreui/coreui/dist/css/coreui.min.css'

// Import your layout files
import HomeLayout from '@/components/layouts/HomeLayout.vue'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'


const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(pinia);
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.use(VueSweetalert2);
app.component("font-awesome-icon", fontAwesomeIcon)
/* layouts */
app.component('HomeLayout', HomeLayout);
app.component('DashboardLayout', DashboardLayout);
app.component('AuthLayout', AuthLayout);
/* layouts */
// registerLayout(app);
app.mount('#app')

import {createRouter, createWebHistory} from 'vue-router';
import routes from '@/router/routes';

import {useAuthStore} from '@/stores/auth';

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();

    const exceptionalRoutes = ['login', 'register', 'forgot-password'];
    const isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name);

    const requiresAuth = to.matched.some((record) => record.meta.auth);
    const requiresVerify = to.matched.some((record) => record.meta.verify);
    const requiresGuest = to.matched.some((record) => record.meta.guest);


    console.log(`is email verified : ${authStore.isEmailVerified}`)

    if (!authStore.isLoggedIn) {
        if (requiresGuest) {
            if (isGoingExceptionalRoutes) {
                return;
            } else {
                return {name: 'login'};
            }
        }
    }

    if (requiresAuth && !authStore.isLoggedIn) {
        authStore.clearBrowserData();
        return {name: 'login', query: {'message': 'يجب عليك تسجيل الدخول حتى تتمكن من المتابعة',redirect: to.fullPath}}
    }

    if (authStore.isLoggedIn && isGoingExceptionalRoutes) {
        return {name: 'dashboard', query: {'message': 'تم تسجيل الدخول بالفعل'}}
    }

    if (requiresVerify) {
        if (!authStore.isEmailVerified && to.name !== 'verifyEmail') {
            return {name: 'verifyEmail'}
        }
    }
    if (authStore.isEmailVerified) {
        if(to.name === 'verifyEmail'){
            return {name: 'dashboard'}
        }
     }



})

export default router;

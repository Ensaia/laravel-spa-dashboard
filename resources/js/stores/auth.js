import {defineStore} from 'pinia';
import {useRouter, useRoute} from 'vue-router';
import {authService} from '@/services/authService';
import {messages} from '@/helpers/messages';
import router from '@/router'
import Swal from "sweetalert2";

export const useAuthStore = defineStore('auth', {
    state: () => JSON.parse(localStorage.getItem('authState')) ?? {
        user: null,
        isLoggedIn: false,
        errors: [],
        messages: []
    },
    // state: () => {
    //     return   {
    //         user: null,
    //         isLoggedIn: false,
    //         errors: [],
    //         loginErrors: [],
    //         loginErrorsMessages: [],
    //         registrationErrors: [],
    //         registrationErrorsMessages: [],
    //         message: [],
    //     }
    // },
    actions: {
        updateStateFromLocalStorage(payload) {
            let newAuthState = {...this.$state, ...payload}
            localStorage.removeItem('authState')
            localStorage.setItem('authState', JSON.stringify(newAuthState))
            this.$reset()
        },
        async login(payload) {
            try {
                const route = useRoute();
                const response = await authService.login(payload)
                await this.getCurrentUser()
                this.updateStateFromLocalStorage({isLoggedIn: true})
                const redirectTo = route.query.redirect || '/dashboard';
                await router.push(redirectTo)
            } catch (error) {
                console.log(error)
                if (error.response && error.response.status === 422 || error.response.status === 401) {
                    this.errors = error.response.data
                } else if (error.response && error.response.status === 403) {
                    router.push({name: 'verifyEmail'});
                } else {
                    this.errors = {general: [error.response.data.message]}
                    console.error("An unexpected error occurred:", error);
                }
            }
        },
        async register(payload) {
            try {
                await authService.register(payload).then((response) => {
                    if (response.status == 201) {
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: messages.REGISTER_SUCCESS,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            width: '620px',
                            timerProgressBar: true,
                        })
                    }
                });
                this.updateStateFromLocalStorage({isLoggedIn: true})
                // await router.push({name: 'dashboard'})
            } catch (error) {
                if (error.response && error.response.status === 422 || error.response.status === 401) {
                    this.errors = error.response.data;
                } else {
                    this.errors = {general: [error.response.data.message]}
                    console.error("An unexpected error occurred:", error);
                }
            }
        },
        async getCurrentUser() {
            try {
                const response = await authService.getCurrentUser()
                this.user = response.data.data
                this.setBrowserData()
            } catch (error) {
                console.error(error)
            }
        },
        async logout(optionalQuery = {}) {
            localStorage.clear()
            this.$reset()
            try {
                const response = await authService.logout()
                await router.push({name: 'login' , query : optionalQuery})
            } catch (error) {
                console.error(error);
            }
        },
        async forgotPassword(payload) {
            try {
                await authService.forgotPassword(payload).then((response) => {
                    if (response.status == 200) {
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: response.data.message,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            width: '600px',
                            timerProgressBar: true,
                        })
                    }
                });
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async resetPassword(payload) {
            try {
                await authService.resetPassword(payload).then((response) => {
                    if (response.status == 200) {
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: response.data.message,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            width: '600px',
                            timerProgressBar: true,
                        })
                    }
                    router.push({name: 'login'})
                });
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async emailVerification(id, hash, queryParams) {
            try {
                await authService.emailVerification(id, hash, queryParams).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: response.data.message,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            width: '450px',
                            timerProgressBar: true,
                        })
                    }
                })
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async sendEmailVerification() {
            try {
                await authService.sendEmailVerification()
                    .then((response) => {
                        if (response.status === 204) {
                            Swal.fire({
                                toast: true,
                                icon: 'success',
                                title: 'تم إرسال رابط جديد للتحقق من البريد الإلكتروني !!',
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                width: '450px',
                                timerProgressBar: true,
                            })
                        }
                    })
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                    if (error.response && error.response.status === 429) {
                        this.errors = "عدد كبير جداً من الطلبات. يرجى الانتظار قبل المحاولة مرة أخرى.";
                    } else {
                        this.errors = "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.";
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        hasBrowserData() {
            let data = window.localStorage.getItem('currentUser');
            return !!data;
        },
        setBrowserData() {
            window.localStorage.setItem('currentUser', JSON.stringify(this.user))
        },
        clearBrowserData() {
            window.localStorage.removeItem('currentUser');
        },
    },
    getters: {
        // isAuthenticated: (state) => !!state.user && state.isLoggedIn,
        username: (state) => (state.user ? state?.user?.name : 'ضيف'),
        userEmail: (state) => (state.user ? state?.user?.email : 'لا يوجد بريد إلكتروني'),
        // isEmailVerified: (state) => ( !!state.user && state.user.email_verified_at === null),
        isEmailVerified: (state) => (Object.keys(state.user?.email_verified_at ?? {}).length != 0 && state?.user?.is_email_verified === true),
    },
});

/*
   JSON.parse(localStorage.getItem('authState')) ?? {
      user: null,
      isLoggedIn: false,
      errors: [],
      loginErrors: [],
      loginErrorsMessages: [],
      registrationErrors: [],
      registrationErrorsMessages: [],
      message: [],
  },
 */

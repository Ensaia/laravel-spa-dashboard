import { defineStore } from 'pinia'
import { messages } from "@/helpers/messages"
import router from '@/router'
import { userService } from "@/services/userService"

import Swal from 'sweetalert2'


export const useUserStore = defineStore('user', {

    state: () => {
        return {
            users: [],
            user: [],
            errors: []
        }
    },
    persist: true,
    actions: {
        async usersIndex(page = 1) {
            try {
                await userService.usersIndex(page).then((response) => {
                    this.users = response.data
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
        async usersPagination(page = 1) {
            try {
                await userService.usersPagination(page)
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
        async userShow(user) {
            try {
                await userService.userShow(user).then((response) => {
                    this.user = response.data.data
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
        async userUpdate(user, payload) {
            try {
                await userService.userUpdate(user, payload).then((response) => {
                    console.log(response)
                    if (response.status == 201) {
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: response.data.success,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            width: '400px',
                            timerProgressBar: true,
                        })
                        setTimeout(() => {
                            router.push({ name: 'users' })
                        }, 3000)
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
        async userDelete(userID) {
            try {
                await userService.userDelete(userID).then((response) => {
                    if(response.status === 204){
                        window.scrollTo(0, 0)
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: messages.DELETE_SUCCESS,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            width: '400px',
                            timerProgressBar: true,
                        })
                        this.users = this.users.filter(user => user.id !== userID)
                        setTimeout(() => {
                            router.push({ name: 'users' })
                        }, 5000)
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
    },

    getters: {

        isEmailVerified: (state) => (state.users ? state.users.is_email_verified : 'الحساب غير مفعل'),
        getUsers: (state) => {
            return state.users
        },
        getUser: (state) => {
            return state.user
        }
    },

})
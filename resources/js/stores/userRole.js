import { defineStore } from 'pinia'
import { getResponseErrors } from "@/helpers/getResponseErrors"
import router from '@/router'
import { messages } from "@/helpers/messages"
import { userRoleService } from "@/services/userRoleService"
import Swal from 'sweetalert2'

export const useUserRoleStore = defineStore("userRole", {
    state: () => {
        return {
            roles: [],
            role: [],
            errors: null,
        };
    },
    persist: true,
    actions: {
        async userRolesIndex(user) {
            try {
                await userRoleService.userRolesIndex(user).then((response) => {
                    this.roles = response.data.data
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
        async userRoleCreate(user, role) {
            try {
                await userRoleService.userRoleCreate(user, role).then((response) => {
                    if (response.status === 201) {
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
                        }, 5000)
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
        async userRoleDelete(user, role) {
            try {
                await userRoleService.userRoleDelete(`/user/${user}/role/${role}/destroy`).then((response) => {
                    console.log(response.status)
                    if (response.status === 204) {
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
                        setTimeout(() => {
                            router.push({ name: 'users' })
                        }, 5000)
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
    },
    getters: {
        getRoles: (state) => {
            return state.roles;
        },
        getRole: (state) => {
            return state.role;
        },
    },
});
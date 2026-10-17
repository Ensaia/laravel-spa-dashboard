import { defineStore } from 'pinia'
import { getResponseErrors } from "@/helpers/getResponseErrors"
import router from '@/router'
import { messages } from "@/helpers/messages"
import { userPermissionService } from "@/services/userPermissionService"
import Swal from 'sweetalert2'

export const useUserPermissionStore = defineStore("userPermission", {
    state: () => {
        return {
            permissions: [],
            errors: null,
        };
    },
    persist: true,
    actions: {
        async userPermissionsIndex(user) {
            try {
                await userPermissionService.userPermissionsIndex(user).then((response) => {
                    this.permissions = response.data.data
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
        async userPermissionCreate(user, permission) {
            try {
                await userPermissionService.userPermissionCreate(user, permission).then((response) => {
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
                        }, 3000)
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
        async userPermissionDelete(user, permission) {
            try {
                await userPermissionService.userPermissionDelete(user, permission).then((response) => {
                    if (response.status == 204) {
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
                        }, 3000)
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
        getPermissions: (state) => {
            return state.permissions;
        }
    },
});
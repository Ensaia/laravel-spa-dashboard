import { defineStore } from 'pinia'
import { messages }  from "@/helpers/messages"
import router from '@/router'
import { permissionService } from "@/services/permissionService"
import Swal from 'sweetalert2'


export const usePermissionStore = defineStore("permission", {
    state: () => {
        return {
            permissions: [],
            permission: [],
            errors: [],
        };
    },
    persist: true,
    actions: {
        async permissionsIndex() {
            try {
                await permissionService.permissionsIndex().then((response) => {
                    this.permissions = response.data.data;
                });
            } catch (error) {
                  if(error.response) {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                }else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async permissionShow(permissionID) {
            try {
                await permissionService.permissionShow(permissionID).then((response) => {
                    this.permission = response.data.data;
                });
            } catch (error) {
                  if(error.response) {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                }else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async permissionCreate(payload) {
            try {
                await permissionService.permissionCreate(payload).then((response) => {
                    if(response.status == 201){
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: response.data.success,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                             width:'400px',
                            timerProgressBar: true,
                        })
                        setTimeout(() => {
                            router.push({name : 'permissions'})
                        },3000)
                    }
                })
            } catch (error) {
                  if(error.response) {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                }else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async permissionUpdate(permissionID, payload) {
            try {
                await permissionService.permissionUpdate(permissionID,payload).then((response) => {
                    if(response.status == 201){
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: response.data.success,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                             width:'400px',
                            timerProgressBar: true,
                        })
                        setTimeout(() => {
                            router.push({name : 'permissions'})
                        },3000)
                    }
                })
            } catch (error) {
                  if(error.response) {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                }else if (error.request) {
                    console.error('No response received:', error.request)
                } else {
                    console.error('Error:', error.message)
                }
            }
        },
        async permissionDelete(permissionID) {
            try {
                await permissionService.permissionDelete(permissionID).then((response) => {
                    if(response.status == 204){
                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: messages.DELETE_SUCCESS,
                            animation: false,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                             width:'400px',
                            timerProgressBar: true,
                        })
                        this.permissions = this.permissions.filter(permission => permission.id !== permissionID)
                    }
                })
            } catch (error) {
                if(error.response) {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                }else if (error.request) {
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
        },
        getPermission: (state) => {
            return state.permission;
        },
        getErrors: (state) => {
            return state.errors;
        },
    },
});

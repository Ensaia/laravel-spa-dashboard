import { defineStore } from 'pinia'
import { messages }  from "@/helpers/messages"
import router from '@/router'
import { roleService } from "@/services/roleService"
import Swal from 'sweetalert2'

export const useRoleStore = defineStore("role", {
    state: () => {
        return {
            roles: [],
            role: [],
            errors: [],
        };
    },
    actions: {
        async rolesIndex() {
            try {
                await roleService.rolesIndex().then((response) => {
                    this.roles = response.data.data;
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
        async roleShow(payload) {
            try {
                await roleService.roleShow(payload).then((response) => {
                    this.role = response.data.data;
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
        async roleCreate(payload) {
            try {
                await roleService.roleCreate(payload).then((response) => {
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
                            router.push({name : 'roles'})
                        },3000)
                    }
                })
            } catch (error) {
                if(error.response) {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                }
                 else if (error.request) {
                     console.error('No response received:', error.request)
                 } 
                 else {
                     console.error('Error:', error.message)
                 }
            }
        },
        async roleUpdate(roleID, payload) {
            try {
                await roleService.roleUpdate(roleID, payload).then((response) => {
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
                            router.push({name : 'roles'})
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
        async roleDelete(roleID) {
            try {
                await roleService.roleDelete(roleID).then((response) => {
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
                        this.roles = this.roles.filter(role => role.id !== roleID)
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
        getRoles: (state) => {
            return state.roles;
        },
        getRole: (state) => {
            return state.role;
        },
        getErrors: (state) => {
            return state.errors;
        },
    },
});

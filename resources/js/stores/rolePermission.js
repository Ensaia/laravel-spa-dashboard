import { defineStore } from 'pinia'
import { getResponseErrors } from "@/helpers/getResponseErrors"
import router from '@/router'
import { messages } from "@/helpers/messages"
import { rolePermissionService } from "@/services/rolePermissionService"
import Swal from 'sweetalert2'

export const useRolePermissionStore = defineStore("rolePermission", {
    state: () => {
        return {
            role: [],
            permissions: [],
            errors: null,
        };
    },
    persist: true,
    actions: {
        async rolePermissionsIndex(role) {
            try {
                await rolePermissionService.rolePermissionsIndex(role).then((response) => {
                    this.role = response.data.data[0]
                    this.permissions = response.data?.data[0]?.permissions
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
        // async permissionShow(payload) {
        //     const rolePermissionService = new rolePermissionService();
        //     const alertStore = useAlertStore();
        //     try {
        //         await rolePermissionService.permissionShow(payload).then((response) => {
        //             this.permission = response.data.data;
        //         });
        //     } catch (error) {
        //         alertStore.error(getResponseError(error));
        //     }
        // },
        async rolePermissionCreate(role, payload) {
            try {
                await rolePermissionService.rolePermissionCreate(role, payload).then((response) => {
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
                            router.push({ name: 'rolePermissions', params: { id: role } })
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
        // async permissionUpdate(itemID, payload) {
        //     const rolePermissionService = new rolePermissionService();
        //     const alertStore = useAlertStore();
        //     try {
        //         await rolePermissionService.permissionUpdate(itemID, payload);
        //         alertStore.success("data updated");
        //         // alertStore.clear();
        //     } catch (error) {
        //         alertStore.error(getResponseError(error));
        //     }
        // },
        async rolePermissionDelete(roleID, permissionID) {
            try {
                await rolePermissionService.rolePermissionDelete(roleID, permissionID).then((response) => {
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
                            // this.role = this.role.filter(role => role.id !== roleID)
                        this.role = this.role.filter(role => role.permissions.some(permission => permission.id !== permissionID))
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
        getRole: (state) => {
            return state.role;
        },
        getPermissions: (state) => {
            return state.permissions;
        },
    },
});
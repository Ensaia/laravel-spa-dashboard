import axios from "@/plugins/axios.js"
import { defineStore } from "pinia"

export const useDashboardStore = defineStore('dashboard',{
    state: () => {
        return {
            usersCount: [],
            rolesCount: [],
            permissionsCount: [],
            postsCount: [],
        }
    },
        actions: {
        async getDataCount(){
            try {
                const response = await axios.get(`/api/dashboard/data`)
                this.usersCount = response.data.users_count
                this.rolesCount = response.data.roles_count
                this.permissionsCount = response.data.permissions_count
                this.postsCount = response.data.posts_count
            } catch (error) {
                console.log(error)
            }
        },
    },
    getters: { },
})
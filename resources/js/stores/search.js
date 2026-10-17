import { defineStore } from 'pinia'
import { getResponseErrors } from "@/helpers/getResponseErrors"
import { messages } from "@/helpers/messages"
import router from '@/router'
import { searchService } from "@/services/searchService"

import Swal from 'sweetalert2'

export const useSearchStore = defineStore('search', {

    state: () => {
        return {
            users: [],
            user: [],
            errors: null
        }
    },
    persist: true,
    actions: {
        async userSearch(page = 1) {
            try {
                await searchService.userSearch(page).then((response) => {
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
        }
    },

    getters: {
        getUsers: (state) => {
            return state.users
        },
        getUser: (state) => {
            return state.user
        }
    },

})
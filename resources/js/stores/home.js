import axios from "@/plugins/axios.js"
import { defineStore } from "pinia"

export const useHomeStore = defineStore('home',{
    state: () => {
        return {
            latestPosts: [],
            prayerTimes: [],
            cityName: [],
        }
    },
        actions: {
        async getLatestPosts(){
            try {
                const response = await axios.get(`/api/home/data`)
                this.latestPosts = response.data.latest_posts
            } catch (error) {
                console.log(error)
            }
        },
            async getPrayerTimes(){
                try {
                    const response = await axios.get(`/api/prayer-times`)
                    this.cityName = response.data.city_name
                    this.prayerTimes = response.data.prayer_times
                } catch (error) {
                    console.log(error)
                }
            },
    },
    getters: { },
})
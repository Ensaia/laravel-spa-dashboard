import {apiService} from "@/services/apiService";

const http = apiService();

export const searchService = {
    userSearch: async function (page = 1) {
        return await http.post(`/user/search?page=${page}`)
    },
}
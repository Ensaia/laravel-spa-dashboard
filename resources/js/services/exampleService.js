import {apiService} from "@/services/apiService";

const http = apiService();

export const exampleService = {
    exampleService: async function () {
        return await http.get(`/api/users`)
    },
}
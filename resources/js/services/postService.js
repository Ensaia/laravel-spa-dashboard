import {apiService} from "@/services/apiService";

const http = apiService();

export const postService = {
    postsIndex: async function () {
        return await http.get(`/api/posts`)
    },
     postShow: async function (postID) {
    return  http.get(`/api/post/edit/${postID}`);
  },
    postCreate: async function (payload) {
        return await http.post(`/api/post/create`,payload)
    },
    postUpdate: async function (postID,payload) {
        return await http.put(`/api/post/update/${postID}`,payload)
    },
    postDelete: async function (postID) {
        return  http.delete(`/api/post/destroy/${postID}`);
    },
}
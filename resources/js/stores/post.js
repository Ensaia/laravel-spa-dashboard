import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { messages }  from "@/helpers/messages"
import { postService } from '@/services/postService';
import router from '@/router'
import Swal from 'sweetalert2'
// const router = useRouter();



export const usePostStore = defineStore('post', {
    state: () => {
        return   {
            posts: [],
            post: [],
            errors: [],
        }
    },
    actions:{
        async postsIndex(){
            try {
                await postService.postsIndex().then((response) => {
                    this.posts = response.data.data;
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
        async postShow(payload) {
            try {
                await postService.postShow(payload).then((response) => {
                    this.post = response.data.data;
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
        async postCreate(payload) {
            try {
                await postService.postCreate(payload).then((response) => {
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
                            router.push({name : 'posts'})
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
        async postUpdate(postID, payload) {
            try {
                await postService.postUpdate(postID, payload).then((response) => {
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
                            router.push({name : 'posts'})
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
        async postDelete(postID) {
            try {
                await postService.postDelete(postID).then((response) => {
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
                        this.posts = this.posts.filter(post => post.id !== postID)
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
    getters:{
        getPosts: (state) => {
            return state.posts;
        },
        getPost: (state) => {
            return state.post;
        },
        getErrors: (state) => {
            return state.errors;
        },
    },
})
<template>
    <CCol md="12" class="py-5">
    <CAlert color="success">
        <h2>{{ statusMessage }}</h2>
    </CAlert>
    </CCol>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import {useAuthStore} from "@/stores";
    //import router from '@/router'

    defineOptions({name : 'verifyEmailStatus'})

    const props = defineProps({
        id:{
            type: String
        },
        hash:{
            type: String
        }
    })

    const seconds = ref(10)

    const statusMessage = ref('يتم التحقق من بريدك الإلكتروني، يرجى الانتظار...');
    const redirectMessage = ref()
    const authStore = useAuthStore();

    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {

        const { id, hash } = route.params
        const queryParams = new URLSearchParams(route.query).toString()

        try{
            const response = await authStore.emailVerification(id,hash,queryParams)
            const optionalQuery = { 'message' : 'تم التحقق من بريدك الإلكتروني! يرجى تسجيل الدخول للمتابعة.'}
            await authStore.logout(optionalQuery)
        }catch (error) {
            console.log(error)
        }

        // const interval = setInterval(() => {
        //     if (seconds.value === 0) {
        //         clearInterval(interval)
        //         emailVerification()
        //         statusMessage.value = 'تم التحقق من بريدك الإلكتروني! يرجى تسجيل الدخول للمتابعة.'
        //         statusMessage.value = 'Email successfully verified! Redirecting...';
        //         redirectMessage.value = ` سيتم إعادة توجيهك إلى صفحة تسجيل الدخول خلال${seconds} ثواني `
        //     } else {
        //         seconds.value--
        //     }
        // }, 1000)

    });
</script>

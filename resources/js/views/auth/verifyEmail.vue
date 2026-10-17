<template>
   <CRow class="justify-content-center">
       <CCol md="12" class="py-5">
               <CCard>
                   <CCardBody class="text-center">
                       <h4 class="card-title">
                           يرجى التحقق من عنوان بريدك الإلكتروني.
                       </h4>

                       <p class="card-text">
                           يجب عليك التحقق من عنوان بريدك الإلكتروني للوصول إلى هذه
                           الصفحة.
                       </p>
                       <div v-if="errors.length > 0" class="alert alert-danger">
                           {{ errors }}
                       </div>
                   </CCardBody>
                   <CCardFooter class="d-flex justify-content-between">
                       <div>
                           <CButton
                               @click="resendVerificationEmail"
                               :disabled="isSubmitting"
                               class="btn btn-dark"
                           >
                        <span
                            v-show="isSubmitting"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                               <span>{{
                            isSubmitting
                                ? "إرسال..."
                                : "أعد إرسال رسالة التأكيد"
                        }}</span>
                           </CButton>
                       </div>
                       <div>
                           <CButton
                               @click="handleLogout"
                               class="btn btn-dark"
                               :disabled="isSubmitting"
                           >
                        <span
                            v-show="isSubmitting"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                               <span>تسجيل الخروج</span>
                           </CButton>
                       </div>
                   </CCardFooter>
               </CCard>
       </CCol>
   </CRow>
</template>

<script setup>
defineOptions({
    name: "verifyEmail",
});
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores";
import router from "@/router";

const isSubmitting = ref(false);
const authStore = useAuthStore();

const errors = computed(() => {
    return authStore.errors
})

const resendVerificationEmail = async () => {
    isSubmitting.value = true;
    try {
        await authStore.sendEmailVerification()
    } catch (error) {
        console.log(error)
    } finally {
        isSubmitting.value = false;
    }
};

const handleLogout = async () => {
    isSubmitting.value = true;
    try {
        await authStore.logout();
        await router.push({ name: "login" });
    } catch (error) {
        console.error("فشل تسجيل الخروج:", error);
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped></style>

<template>
    <CCol md="12" class="py-5">
        <div class="text-center mb-3">
            <span class="fs-3 fw-semibold">هل نسيت كلمة المرور</span>
        </div>
        <CForm id="forgot-password-form" @submit.prevent="onFormSubmit">
            <div class="mb-3">
                <CFormInput
                    type="email"
                    id="email"
                    name="email"
                    label="البريد الإلكتروني"
                    v-model="formData.email"
                    autocomplete="email"
                    :class="[
                        'form-control',
                        { 'is-invalid': 'email' in errors },
                    ]"
                    ref="autofocus"
                    :disabled="processing"
                    placeholder="البريد الإلكتروني"
                    required
                />
                <div v-if="'email' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "email") }}
                </div>
            </div>
            <div class="d-grid gap-2">
                <CButton
                    class="btn btn-md btn-dark"
                    type="submit"
                    name="submit"
                    :disabled="processing"
                >
                    <span
                        v-show="processing"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    <span class="p-2">إرسال</span>
                    <span
                        ><font-awesome-icon :icon="['fas', 'paper-plane']"
                    /></span>
                </CButton>
            </div>
        </CForm>
        <div class="mt-3 mb-3 text-center">
            <span class="text-sm mt-4 mb-4 fw-semibold">
                سنرسل لك رابط إعادة تعيين كلمة المرور على بريدك الإلكتروني
            </span>
        </div>
        <div class="d-flex justify-content-between">
            <div class="">
                <router-link to="/login" class="text-sm btn btn-dark">
                    تسجيل الدخول
                </router-link>
            </div>
            <div class="">
                <router-link to="/register" class="text-sm btn btn-dark">
                    إنشاء حساب
                </router-link>
            </div>
        </div>
    </CCol>
</template>

<script setup>
import {
    defineComponent,
    reactive,
    computed,
    ref,
    onMounted,
    inject,
} from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import { displayValidationError } from "@/helpers/displayValidationError";

defineOptions({ name: "ForgotPassword" });

const processing = ref(false);
const autofocus = ref(null);
const router = useRouter();
const authStore = useAuthStore();
onMounted(() => {
    autofocus.value.focus();
});
const errors = computed(() => {
    return authStore.errors;
});
const formData = reactive({
    email: "mohammed@laravel.com",
});

async function onFormSubmit() {
    try {
        const response = await authStore.forgotPassword({
            email: formData.email,
        });
        processing.value = true;
    } catch (error) {
        setTimeout(() => {
            autofocus.value.focus();
            autofocus.value.select();
        }, 5);
        console.log(error.message);
        console.error(error);
    }
    processing.value = false;
    //   authService
    //     .forgotPassword({ email: formData.email })
    //     .then((response) => alertStore.success(response.data.message))
    //     .catch((error) => alertStore.error(getResponseError(error)));
}
</script>

<template>
    <CCol md="12" v-if="redirectMessage">
        <CAlert
            color="warning"
            dismissible
            class="d-flex justify-content-between"
        >
            <div>
                {{ redirectMessage }}
            </div>
            <div>
                <font-awesome-icon
                    :icon="['fas', 'exclamation-triangle']"
                    size="lg"
                />
            </div>
        </CAlert>
    </CCol>
    <CCol md="12" class="" v-if="errorMessage">
        <CAlert
            color="danger"
            dismissible
            class="d-flex justify-content-between"
        >
            <div>
                {{ errorMessage }}
            </div>
            <div>
                <font-awesome-icon
                    :icon="['fas', 'exclamation-triangle']"
                    size="lg"
                />
            </div>
        </CAlert>
    </CCol>
    <CCol md="12" class="py-5">
        <div class="text-center">
            <span class="fs-3 fw-semibold">تسجيل الدخول</span>
        </div>
        <CForm id="login-form" @submit.prevent="onFormSubmit">
            <div class="mb-3">
                <CFormInput
                    type="email"
                    id="email"
                    label="البريد الإلكتروني"
                    placeholder="البريد الإلكتروني"
                    name="email"
                    v-model.trim="formData.email"
                    autocomplete="email"
                    :class="[
                        'form-control form-control-md',
                        { 'is-invalid': 'email' in errors },
                    ]"
                    ref="autofocus"
                    :disabled="processing"
                />
                <div v-if="'email' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "email") }}
                </div>
            </div>
            <div class="mb-3">
                <CFormInput
                    type="password"
                    id="password"
                    label="كلمة المرور"
                    placeholder="كلمة المرور"
                    name="password"
                    v-model.trim="formData.password"
                    :class="[
                        'form-control form-control-md',
                        { 'is-invalid': 'password' in errors },
                    ]"
                    ref="autofocus"
                    :disabled="processing"
                />
                <div v-if="'password' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "password") }}
                </div>
            </div>
            <div class="mb-3 mt-3 d-grid gap-2">
                <CButton
                    type="submit"
                    class="btn btn-dark"
                    :disabled="processing"
                >
                    <span
                        v-show="processing"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    <span class="p-2">تسجيل الدخول</span>
                    <span
                        ><font-awesome-icon
                            class="fa-fw"
                            :icon="['fas', 'right-to-bracket']"
                        ></font-awesome-icon
                    ></span>
                </CButton>
            </div>
        </CForm>
        <div class="d-flex justify-content-between">
            <div>
                <router-link
                    :to="{ name: 'register' }"
                    class="text-sm btn btn-dark"
                >
                    إنشاء حساب
                </router-link>
            </div>
            <div>
                <router-link
                    :to="{ name: 'forgotPassword' }"
                    class="text-sm btn btn-dark"
                >
                    هل نسيت كلمة المرور ؟
                </router-link>
            </div>
        </div>
    </CCol>
</template>
<script setup>
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import router from "@/router";
import { useRoute } from 'vue-router';
import { useAuthStore } from "@/stores";
import { displayValidationError } from "@/helpers/displayValidationError";

defineOptions({
    name: "Login",
});

const isAlertVisible = ref(true);

const processing = ref(false);
const autofocus = ref(null);
// const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const formData = reactive({
    email: "mohammed@laravel.com",
    password: "password",
});
//2026-10-07 05:15:37

// onMounted(() => {
//     autofocus.value.focus();
// });
const errors = computed(() => {
    return authStore.errors.errors || {};
});
const errorMessage = computed(() => {
    return authStore.errors.message;
});
const redirectMessage = computed(() => {
    return route.query.message;
});

const onFormSubmit = async () => {
    const payload = {
        email: formData.email,
        password: formData.password,
    };
    try {
        processing.value = true;
        await authStore.login(payload);
        // await router.push({ name: "dashboard" });
    } catch (error) {
        // setTimeout(() => {
        //     autofocus.value.focus();
        //     autofocus.value.select();
        // }, 5);
        console.log(error);
    }
    processing.value = false;
};

/*
        const login = async () => {
        processing.value = true;
        const auth = useAuthStore();
        const response = await auth.login(form.value);
        if (response.data.success) {
            router.push('/');
        }
        else {
            errors.value = response.data.errors;
            setTimeout(() => {
                autofocus.value.focus();
                autofocus.value.select();
            }, 5);
        }
        processing.value = false;
    }
         */

/*
{"message":"These credentials do not match our records.","errors":{"email":["These credentials do not match our records."]}}
        */
</script>

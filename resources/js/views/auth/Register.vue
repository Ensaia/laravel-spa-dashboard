<template>
    <CCol md="12" class="py-5">
        <!--    <div v-if="errorsMessages" class="alert alert-danger" role="alert">-->
        <!--      <strong>خطأ!</strong> {{ errorsMessages }} <strong>خطأ!</strong>-->
        <!--      {{ errors }}-->
        <!--    </div>-->
        <div class="text-center">
            <span class="fs-3 fw-semibold">إنشاء حساب</span>
        </div>
        <CForm id="register-form" @submit.prevent="onFormSubmit">
            <div class="mb-3 mt-3">
                <CFormInput
                    type="text"
                    id="name"
                    label="اسم المستخدم"
                    :class="[
                        'form-control',
                        { 'is-invalid': 'name' in errors },
                    ]"
                    placeholder="اسم المستخدم"
                    name="name"
                    v-model="formData.name"
                    ref="autofocus"
                    :disabled="processing"
                    autocomplete="name"
                />
                <div v-if="'name' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "name") }}
                </div>
            </div>
            <div class="mb-3 mt-3">
                <CFormInput
                    type="email"
                    id="email"
                    label="البريد الإلكتروني"
                    :class="[
                        'form-control',
                        { 'is-invalid': 'email' in errors },
                    ]"
                    placeholder="البريد الإلكتروني"
                    name="email"
                    v-model="formData.email"
                    ref="autofocus"
                    :disabled="processing"
                    autocomplete="email"
                />
                <div v-if="'email' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "email") }}
                </div>
            </div>
            <div class="mb-3 mt-3">
                <div class="row g-3">
                    <div class="col-md-6">
                        <CFormInput
                            type="password"
                            id="password"
                            label="كلمة المرور"
                            :class="[
                                'form-control',
                                { 'is-invalid': 'password' in errors },
                            ]"
                            placeholder="كلمة المرور"
                            name="password"
                            v-model="formData.password"
                            ref="autofocus"
                            :disabled="processing"
                        />
                        <div
                            v-if="'password' in errors"
                            class="invalid-feedback"
                        >
                            {{ displayValidationError(errors, "password") }}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <CFormInput
                            type="password"
                            id="password-confirm"
                            label="تأكيد كلمة المرور"
                            :class="[
                                'form-control',
                                {
                                    'is-invalid':
                                        'password_confirmation' in errors,
                                },
                            ]"
                            placeholder="تأكيد كلمة المرور"
                            name="password-confirm"
                            v-model="formData.passwordConfirm"
                            ref="autofocus"
                            :disabled="processing"
                        />
                        <div
                            v-if="'password_confirmation' in errors"
                            class="invalid-feedback"
                        >
                            {{
                                displayValidationError(
                                    errors,
                                    "password_confirmation",
                                )
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-3 mt-3 d-grid gap-2">
                <CButton
                    type="submit"
                    name="submit"
                    class="btn btn-dark"
                    :disabled="processing"
                >
                    <span
                        v-show="processing"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    <span class="p-2">إنشاء حساب</span>
                    <span
                        ><font-awesome-icon
                            :icon="['fas', 'user-plus']"
                        ></font-awesome-icon
                    ></span>
                </CButton>
            </div>
        </CForm>
        <div class="d-flex justify-content-between">
            <div>
                <router-link
                    :to="{ name: 'login' }"
                    class="text-sm btn btn-dark"
                >
                    تسجيل الدخول
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
import { reactive, defineComponent, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import { displayValidationError } from "@/helpers/displayValidationError";

defineOptions({
    name: "Register",
});
const processing = ref(false);
const autofocus = ref(null);
//const router = useRouter();
const authStore = useAuthStore();
// onMounted(() => {
//     autofocus.value.focus();
// });
const errors = computed(() => {
    return authStore.errors.errors || {};
});
const errorMessage = computed(() => {
    return authStore.errors.message;
});
const formData = reactive({
    name: "User",
    email: "user@laravel.com",
    password: "123456789",
    passwordConfirm: "123456789",
});

const onFormSubmit = async () => {
    const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
    };
    try {
        processing.value = true;
        await authStore.register(payload);
        // await router.push({ name: "dashboard" });
    } catch (error) {
        // setTimeout(() => {
        //     autofocus.value.focus();
        //     autofocus.value.select();
        // }, 5);
        console.log(error.message);
    }
    processing.value = false;
    // console.log("Form submitted", payload);
    // await authStore
    //   .register(payload)
    //   .then((response) => {
    //     console.log("Registration Response:", response.status);
    //   })
    //   .catch((error) => {
    //     console.error("Registration Error:", error);
    //   });
};
</script>

<template>
    <CCol md="12" class="py-5">
        <div class="text-center">
            <span class="fs-3 fw-semibold">إعادة تعيين كلمة المرور</span>
        </div>
        <CForm id="reset-password-form" @submit.prevent="onFormSubmit">
            <div class="mb-3 mt-3">
                <CFormInput
                    type="email"
                    id="email"
                    label="البريد الإلكتروني"
                    v-model="formData.email"
                    :class="[
                        'form-control',
                        { 'is-invalid': 'email' in errors },
                    ]"
                />
                <div v-if="'email' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "email") }}
                </div>
            </div>
            <div class="mb-3 mt-3">
                <CFormInput
                    type="password"
                    id="password"
                    label="كلمة المرور"
                    v-model="formData.password"
                    :class="[
                        'form-control',
                        { 'is-invalid': 'password' in errors },
                    ]"
                />
                <div v-if="'password' in errors" class="invalid-feedback">
                    {{ displayValidationError(errors, "password") }}
                </div>
            </div>
            <div class="mb-3 mt-3">
                <CFormInput
                    type="password"
                    id="password-confirm"
                    label="تأكيد كلمة المرور"
                    v-model="formData.passwordConfirm"
                    :class="[
                        'form-control',
                        { 'is-invalid': 'password_confirmation' in errors },
                    ]"
                />
                <div
                    v-if="'password_confirmation' in errors"
                    class="invalid-feedback"
                >
                    {{
                        displayValidationError(errors, "password_confirmation")
                    }}
                </div>
            </div>
            <div class="mb-3 mt-3 d-grid gap-2">
                <CButton type="submit" name="submit" class="btn btn-dark">
                    <span class="p-2">تحديث البيانات</span>
                    <span
                        ><font-awesome-icon
                            :icon="['fas', 'edit']"
                        ></font-awesome-icon
                    ></span>
                </CButton>
            </div>
        </CForm>
    </CCol>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores";
import { displayValidationError } from "@/helpers/displayValidationError";

defineOptions({ name: "ResetPasswordForm" });

const authStore = useAuthStore();
const route = useRoute();

const errors = computed(() => {
    return authStore.errors;
});

const formData = reactive({
    email: null,
    password: null,
    passwordConfirm: null,
});

const onFormSubmit = async () => {
    const payload = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
        token: route.query.token,
    };
    await authStore.resetPassword(payload);
};
</script>

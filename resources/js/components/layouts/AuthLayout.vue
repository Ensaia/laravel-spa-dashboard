<template>
    <CContainer fluid class="bg-transparent">
        <CRow class="no-gutter">
            <CCol md="6" class="d-none d-md-flex bg-image"></CCol>
            <CCol md="6" class="bg-light">
                <div class="login d-flex align-items-center py-5">
                    <CContainer>
                        <CRow>
                            <CCol lg="10" xl="7" class="mx-auto bg-transparent">
                                <slot></slot>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script setup>
import { defineComponent } from "vue";
defineComponent({
    name: "AuthLayout",
});
</script>
<style>
.login,
.image {
    min-height: 100vh;
}

.bg-image {
    background-image: url("@/assets/images/auth.png");
    background-size: cover;
    background-position: center center;
}
</style>

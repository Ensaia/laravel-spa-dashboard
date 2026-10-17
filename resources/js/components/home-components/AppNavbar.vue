<template>
    <CContainer fluid class="py-5">
        <CNavbar expand="lg" color-scheme="light" class="bg-light">
            <CNavbarBrand href="#">CoreUI</CNavbarBrand>
            <CNavbarToggler
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navbarSupportedContent"
                @click="visible = !visible"
            />
            <CCollapse class="navbar-collapse" :visible="visible">
                <CNavbarNav class="me-auto mb-2 mb-lg-0">
                    <CNavItem>
                        <CNavLink href="/">Home</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="/dashboard">Dashboard</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">About</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Services</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">Contact</CNavLink>
                    </CNavItem>
                </CNavbarNav>
                <CNavbarNav class="d-flex">
                    <CNavItem>
                        <CNavLink href="/login">تسجيل الدخول</CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="/register">إنشاء حساب</CNavLink>
                    </CNavItem>
                </CNavbarNav>
            </CCollapse>
        </CNavbar>
    </CContainer>
</template>

<script setup>
import {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CNavLink,
} from "@coreui/vue";
import { ref } from "vue";
const visible = ref(true);
defineOptions({ name: "AppNavbar" });
</script>

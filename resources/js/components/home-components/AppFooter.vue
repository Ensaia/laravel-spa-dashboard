<template>
    <CContainer fluid>
        <CFooter>
            <div>
                <CLink href="https://coreui.io">CoreUI</CLink>
                <span>&copy; {{ currenYear }} creativeLabs.</span>
            </div>
            <div>
                <span>Powered by</span>
                <CLink href="https://coreui.io">CoreUI</CLink>
            </div>
        </CFooter>
    </CContainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CFooter, CLink } from "@coreui/vue";
const currenYear = ref(new Date().getFullYear());
defineOptions({ name: "AppFooter" });
</script>

<template>
    <div>
        <DashboardSidebar />
        <div class="wrapper d-flex flex-column min-vh-100">
            <DashboardHeader />
            <div class="body flex-grow-1">
                <CContainer class="px-4" lg>
                    <router-view />
                </CContainer>
            </div>
            <DashboardFooter />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import DashboardSidebar from "@/components/coreui/DashboardSidebar";
import DashboardHeader from "@/components/coreui/DashboardHeader";
import DashboardFooter from "@/components/coreui/DashboardFooter";

defineOptions({ name: "DashboardLayout" });

const sidebarVisible = ref(true);

import { hijriDate } from "@/libs/hijriDate";

onMounted(() => {
    hijriDate.today().toString();
});
</script>
<style lang="scss">
/*
    @use "../../../sass/app.scss";
    @use "../../../sass/examples.scss";
*/
</style>

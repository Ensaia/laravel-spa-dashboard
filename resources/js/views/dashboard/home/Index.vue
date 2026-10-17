<template>
    <h1>dashboard index</h1>
</template>

<script setup>

    defineOptions({ name: "DashboardIndex" });
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from "@/stores";

    const authStore = useAuthStore();

    console.log(authStore.$state.user)
    console.log(authStore.isEmailVerified)
</script>
<style scoped></style>

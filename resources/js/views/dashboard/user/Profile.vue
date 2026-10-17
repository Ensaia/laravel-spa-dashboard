<template>
    <h1>User Profile</h1>
    <p>Name: {{ authStore.user.name }}</p>
    <p>Email: {{ authStore.user.email }}</p>
    <p>Email Verified: {{ authStore.user.is_email_verified }}</p>
    <h2>
        <pre dir="rtl">{{ JSON.stringify(authStore.$state, null, 2) }} </pre>
    </h2>
</template>

<script setup>
defineOptions({
    name: "UserProfile",
});
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<style scoped></style>

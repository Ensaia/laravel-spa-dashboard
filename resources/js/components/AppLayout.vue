<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
defineComponent({
    name: "AppLayout",
});

const route = useRoute();
const layout = computed(() => {
    const layout = route?.meta?.layout;
    console.log("Current route layout:", layout);
    if (layout) {
        return `${layout}Layout`;
    }
    return "div";
});
</script>

<style scoped></style>

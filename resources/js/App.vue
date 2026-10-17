<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useColorModes } from "@coreui/vue";
import { useRoute } from "vue-router";

import { useThemeStore } from "@/stores";

const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-vue-admin-template-theme",
);
const currentTheme = useThemeStore();

onBeforeMount(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    let theme = urlParams.get("theme");

    if (theme !== null && theme.match(/^[A-Za-z0-9\s]+/)) {
        theme = theme.match(/^[A-Za-z0-9\s]+/)[0];
    }

    if (theme) {
        setColorMode(theme);
        return;
    }

    if (isColorModeSet()) {
        return;
    }

    setColorMode(currentTheme.theme);
});
defineOptions({ name: "App" });

const route = useRoute();
const layout = computed(() => {
    const layout = route?.meta?.layout;
    if (layout) {
        return `${layout}Layout`;
    }
    return "div";
});
</script>


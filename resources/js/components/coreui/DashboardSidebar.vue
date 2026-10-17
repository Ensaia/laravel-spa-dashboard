<template>
    <CSidebar
        class="border-end"
        colorScheme="dark"
        position="fixed"
        :unfoldable="sidebar.unfoldable"
        :visible="sidebar.visible"
        @visible-change="(value) => sidebar.toggleVisible(value)"
    >
        <CSidebarHeader class="border-bottom">
            <CSidebarBrand>
                <CImage
                    src="@/assets/images/laravel.png"
                    height="80"
                    class="text-white text-center"
                />
                <span>ِبالعربي ﻻرفيل</span>
            </CSidebarBrand>
            <CCloseButton
                class="d-lg-none"
                dark
                @click="sidebar.toggleVisible()"
            />
        </CSidebarHeader>
        <CSidebarNav>
            <CNavTitle>القائمة الرئيسية</CNavTitle>
            <CNavItem
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                class="d-flex justify-content-between"
            >
                <div>
                    <font-awesome-icon
                        :icon="['fas', link.icon]"
                        class="me-2"
                        size="lg"
                    />
                </div>
                {{ link.title }}
            </CNavItem>
        </CSidebarNav>
        <CSidebarFooter class="border-top d-none d-lg-flex text-center mr-2">
            <!--       <CSidebarToggler @click="sidebar.toggleUnfoldable()" />-->
            <h4>LARAVEL V 11.0.1</h4>
        </CSidebarFooter>
    </CSidebar>
</template>
<script setup>
import { defineComponent, inject, ref } from "vue";
import { useSidebarStore } from "@/stores";
import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

defineOptions({
    name: "DashboardSidebar",
});
const sidebar = useSidebarStore();
const isActive = (path) => {
    return (
        sidebar.visible &&
        sidebar.unfoldable &&
        path === window.location.pathname
    );
};
const links = ref([
    {
        href: "/",
        title: "الرئيسية",
        icon: "home",
    },
    {
        href: "/dashboard",
        title: "لوحة التحكم",
        icon: "gauge-high",
    },
    {
        href: "/dashboard/users",
        title: "المستخدمون",
        icon: "users",
    },
    {
        href: "/dashboard/roles",
        title: "اﻷدوار",
        icon: "user-gear",
    },
    {
        href: "/dashboard/permissions",
        title: "الصلاحيات",
        icon: "user-lock",
    },
    {
        href: "/dashboard/posts",
        title: "المنشورات",
        icon: "book",
    },
]);
// export default defineComponent({
//     name: "AppSidebar",
//     components: { Simplebar },
//     props: {},
//     setup(props, context) {
//         const sidebar = useSidebarStore();
//         const isActive = (path) => {
//             return (
//                 sidebar.visible &&
//                 sidebar.unfoldable &&
//                 path === window.location.pathname
//             );
//         };
//         return { sidebar, isActive };
//     },
// });
</script>

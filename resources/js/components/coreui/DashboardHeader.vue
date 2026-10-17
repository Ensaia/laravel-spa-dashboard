<template>
    <CHeader position="sticky" :class="headerClassNames">
        <CContainer class="border-bottom px-4" fluid>
            <CHeaderToggler
                @click="sidebarStore.toggleVisible()"
                style="margin-inline-start: -14px"
            >
                <font-awesome-icon
                    :icon="['fas', 'bars']"
                    size="lg"
                    class="ms-2"
                />
            </CHeaderToggler>
            <CHeaderNav>
                <CNavItem>
                    <CNavLink href="#" disabled>
                        <span
                            ><font-awesome-icon
                                :icon="['fas', 'bell']"
                                size="lg"
                        /></span>
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#" disabled>
                        <span
                            ><font-awesome-icon
                                :icon="['fas', 'envelope-open']"
                                size="lg"
                        /></span>
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
                </CNavItem>
                <CDropdown variant="nav-item" placement="bottom-end">
                    <CDropdownToggle :caret="true">
                        <font-awesome-icon
                            v-if="colorMode === 'dark'"
                            :icon="['fas', 'moon']"
                            size="lg"
                        />
                        <font-awesome-icon
                            v-else-if="colorMode === 'light'"
                            :icon="['fas', 'sun']"
                            size="lg"
                        />
                        <font-awesome-icon
                            v-else
                            :icon="['fas', 'circle-half-stroke']"
                            size="lg"
                        />
                    </CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem
                            :active="colorMode === 'light'"
                            class="d-flex justify-content-between"
                            component="button"
                            type="button"
                            @click="setColorMode('light')"
                        >
                            <div>نهاري</div>
                            <div>
                                <font-awesome-icon
                                    :icon="['fas', 'sun']"
                                    class="me-2"
                                    size="lg"
                                />
                            </div>
                        </CDropdownItem>
                        <CDropdownItem
                            :active="colorMode === 'dark'"
                            class="d-flex justify-content-between"
                            component="button"
                            type="button"
                            @click="setColorMode('dark')"
                        >
                            <div>ليلي</div>
                            <div>
                                <font-awesome-icon
                                    :icon="['fas', 'moon']"
                                    class="me-2"
                                    size="lg"
                                />
                            </div>
                        </CDropdownItem>
                        <CDropdownItem
                            :active="colorMode === 'auto'"
                            class="d-flex justify-content-between"
                            component="button"
                            type="button"
                            @click="setColorMode('auto')"
                        >
                            <div>تلقائي</div>
                            <div>
                                <font-awesome-icon
                                    :icon="['fas', 'circle-half-stroke']"
                                    class="me-2"
                                    size="lg"
                                />
                            </div>
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                <CNavItem>
                    <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="/dashboard/user/profile">
                        <span class="p-1"> {{ authStore.user.name }} </span>
                        <span
                            ><font-awesome-icon
                                :icon="['fas', 'user-circle']"
                                size="lg"
                            />
                        </span>
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="javascript:void(0);" @click="handleLogout">
                        <span class="p-1"> تسجيل الخروج </span>
                        <span
                            ><font-awesome-icon
                                :icon="['fas', 'right-from-bracket']"
                                size="lg"
                            />
                        </span>
                    </CNavLink>
                </CNavItem>
            </CHeaderNav>
        </CContainer>
    </CHeader>
</template>
<script setup>
import { defineComponent, onMounted, ref, inject, computed } from "vue";
import { CNavItem, useColorModes } from "@coreui/vue";

import { useAuthStore } from "@/stores";
import { useSidebarStore } from "@/stores";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import fontAwesomeIcon from "@/utilities/fontawesome";

defineOptions({
    name: "DashboardHeader",
});

const headerClassNames = ref("mb-4 p-0");
const { colorMode, setColorMode } = useColorModes(
    "coreui-free-vue-admin-template-theme",
);
const sidebarStore = useSidebarStore();
const authStore = useAuthStore();

onMounted(() => {
    document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 0) {
            headerClassNames.value = "mb-4 p-0 shadow-sm";
        } else {
            headerClassNames.value = "mb-4 p-0";
        }
    });
});

const handleLogout = async () => {
    await authStore.logout();
};

const unreadCount = ref(5);
</script>

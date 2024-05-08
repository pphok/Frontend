<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
const router = useRouter();

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const menu = ref(null);
const profileMenu = ref(null);
const display = ref(false);
const topbarMenuActive = ref(false);
const store = useAuthStore();

const overlayMenuItems = ref([
    {
        label: 'Create class',
        icon: 'pi pi-plus',
        command: () => open()
    },
    {
        label: 'Join class',
        icon: 'pi pi-sign-in',
        command: () => open()
    }
]);

const overlayMenuProfileItems = ref([
    {
        label: 'My profile',
        icon: 'pi pi-user',
        command: () => user_profile()
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            store.Logout();
            router.push('/login');
        }
    }
]);
const user_profile = () => {
    router.push('/profileuser');
};
const logout = () => {
    router.push('/login');
};

const toggleMenu = (event) => {
    menu.value.toggle(event);
};

const toggleProfileMenu = (event) => {
    profileMenu.value.toggle(event);
};

const open = () => {
    display.value = true;
};

const close = () => {
    display.value = false;
};

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'krukit-white' : 'krukit-dark'}.png`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
// const onSettingsClick = () => {
//     topbarMenuActive.value = false;
//     router.push('/documentation');
// };
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" class="w-5 h-auto" />
        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <InputText type="text" placeholder="Search" class="layout-topbar-search"></InputText>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <Dialog header="Create Class" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                <form action="" style="width: 100%">
                    <div class="mb-4">
                        <input type="text" id="class1" name="class1" style="border: 1px solid #b6b0b0; padding: 12px; border-radius: 15px; background-color: #f1f1f1; width: 100%; border: none" placeholder="Class Name (require)" />
                    </div>
                    <div class="mb-4">
                        <input type="text" id="class2" name="class2" style="border: 1px solid #b6b0b0; padding: 12px; border-radius: 15px; background-color: #f1f1f1; width: 100%; border: none" placeholder="Section (optional)" />
                    </div>
                    <div class="mb-4">
                        <input type="text" id="class3" name="class3" style="border: 1px solid #b6b0b0; padding: 12px; border-radius: 15px; background-color: #f1f1f1; width: 100%; border: none" placeholder="Subject (optional)" />
                    </div>
                    <div class="mb-4">
                        <input type="text" id="class4" name="class4" style="border: 1px solid #b6b0b0; padding: 12px; border-radius: 15px; background-color: #f1f1f1; width: 100%; border: none" placeholder="Room (optional)" />
                    </div>
                </form>
                <template #footer>
                    <Button label="Cancel" @click="close" class="p-button-outlined p-button-text main-button" style="background-color: white; color: black; border: 1px solid white" />

                    <Button label="Create" @click="close" class="p-button-outlined main-button" />
                </template>
            </Dialog>
            <Menu ref="menu" :model="overlayMenuItems" :popup="true" style="position: fixed" />
            <Button type="button" label="Class" icon="pi pi-plus" @click="toggleMenu" style="width: auto" class="main-button" />

            <!-- <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-calendar"></i>
                <span>Calendar</span>
            </button> -->
            <Menu ref="profileMenu" :model="overlayMenuProfileItems" :popup="true" style="position: fixed" />
            <button type="button" @click="toggleProfileMenu" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <!-- <button @click="onSettingsClick()" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button> -->
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

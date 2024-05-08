<script setup>
import { ref, onBeforeMount, watch, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';

const route = useRoute();

const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout();
const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: null
    },
    parentLabel: {
        type: String,
        default: null
    }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

    const activeItem = layoutState.activeMenuItem;

    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
});

watch(
    () => layoutConfig.activeMenuItem.value,
    (newVal) => {
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
    }
);

const itemClick = (event, item) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    const { overlayMenuActive, staticMenuMobileActive } = layoutState;

    if ((item.to || item.url) && (staticMenuMobileActive.value || overlayMenuActive.value)) {
        onMenuToggle();
    }

    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }

    const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value;

    setActiveMenuItem(foundItemKey);
};

const checkActiveRoute = (item) => {
    return route.path === item.to;
};

const shouldDisplayC = (label) => {
    return label === 'Teaching' || label === 'Enrolled';
};
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <a v-if="(!root && !item.to) || item.items" :href="item.url" @click="itemClick($event, item, index)" :class="item.class" :target="item.target" tabindex="0" class="menu-link">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">
                <span v-if="shouldDisplayC(parentLabel)" :style="{ backgroundColor: getRandomColor() }" class="c-shape">C</span>
                <span class="label-container">
                    <span class="section">{{ item.section }}</span>
                    <span class="label">{{ item.label }}</span>
                </span>
            </span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </a>
        <router-link v-else-if="item.to && !item.items && item.visible !== false" @click="itemClick($event, item, index)" :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to" class="menu-link">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">
                <span v-if="shouldDisplayC(parentLabel)" :style="{ backgroundColor: getRandomColor() }" class="c-shape">C</span>
                <span class="label-container">
                    <span class="section">{{ item.section }}</span>
                    <span class="label">{{ item.label }}</span>
                </span>
            </span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
        </router-link>
        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false" :parentLabel="item.label"></app-menu-item>
            </ul>
        </Transition>
    </li>
</template>

<style scoped>
.menu-link {
    display: flex;
    align-items: center;
}

.c-shape {
    display: inline-flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
    justify-content: center;
    font-size: 23px;
    color: white;
    margin-right: 5px;
}

.label {
    margin-left: 10px;
    font-size: 15px;
    color: black;
}
</style>
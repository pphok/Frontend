<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'krukit-white' : 'krukit-dark'}.png`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" width="50" class="mr-2" />
        copyright
        <span class="font-medium ml-2"> © 2024</span>
    </div>
</template>
<style lang="scss" scoped></style>

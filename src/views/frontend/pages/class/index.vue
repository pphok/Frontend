<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import People from './People.vue';
import Grade from './Grade.vue';
import Activity from './Activity.vue';
import Archive from './Archive.vue';

const dataviewValue = ref(null);

const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <TabView class="tabview-custom">
                    <TabPanel header="Activities">
                        <Activity />
                    </TabPanel>
                    <TabPanel header="People">
                        <People />
                    </TabPanel>
                    <TabPanel header="Grades">
                        <Grade />
                    </TabPanel>
                    <TabPanel header="Archived">
                        <Archive />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    padding-top: 5px;
    padding-bottom: 0;
}
.text-truncated-threeline {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.text-truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.p-tabview-nav {
    border-radius: 12px 12px 0 0;
}
.p-tabview-ink-bar {
    background-color: #1ebbd7;
}
.p-tabview-header.p-highlight {
    .p-tabview-header-action {
        color: #1ebbd7;
    }
}
</style>

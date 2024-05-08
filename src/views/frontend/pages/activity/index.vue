<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import DataInput from './DataInput.vue';
import Description from './Description.vue';
import Toolkits from './toolkits/index.vue';
import Rubric from './rubrics/index.vue';

const dataviewValue = ref(null);

const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card-context">
                <TabView class="tabview-custom">
                    <TabPanel header="Toolkits">
                        <Toolkits />
                    </TabPanel>
                    <TabPanel header="Data Input">
                        <DataInput />
                    </TabPanel>
                    <TabPanel header="Descriptions">
                        <Description />
                    </TabPanel>
                    <TabPanel header="Rubrics">
                        <Rubric />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.card-context {
    height: calc(100vh - 18rem);
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

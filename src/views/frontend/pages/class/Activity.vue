<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useRouter } from 'vue-router';

const router = useRouter();
const dataviewValue = ref(null);
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);
const classMenu = ref([]);

const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));
});

const overlayClassMenuItems = ref([
    {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {}
    },
    {
        label: 'Archive',
        icon: 'pi pi-fw pi-inbox',
        command: () => {}
    }
]);

const toggleClassMenu = (event, index) => {
    classMenu.value[index].toggle(event);
};

const onCardClick = (index) => {
    console.log(index);
    router.push('/activity');
};
</script>

<template>
    <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" class="p-0">
        <template #grid="slotProps">
            <div class="grid grid-nogutter scrollable-container p-0">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
                    <Card style="overflow: hidden; border: 0.2px solid #1ebbd7; padding: 0" @click="() => onCardClick(index)">
                        <template #header>
                            <div class="p-3">
                                <div class="title flex justify-content-space-between align-item-center">
                                    <div class="w-full p-0">
                                        <h3 class="text-truncated p-0">Activity 01</h3>
                                    </div>
                                    <div style="text-align: end">
                                        <Menu ref="classMenu" :model="overlayClassMenuItems" :popup="true" />
                                        <button type="button" @click.stop="(e) => toggleClassMenu(e, index)" class="p-link">
                                            <i class="pi pi-ellipsis-v"></i>
                                        </button>
                                    </div>
                                </div>
                                <p class="p-date">Jan 01, 2024</p>
                            </div>
                            <Divider layout="horizontal"></Divider>
                        </template>
                        <template #content>
                            <p class="m-0 text-truncated-threeline" @click.stop="() => {}">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
                                cupiditate neque quas!
                            </p>
                        </template>
                    </Card>
                </div>
            </div>
        </template>
    </DataView>
</template>
<style lang="scss" scoped>
.scrollable-container {
    height: calc(100vh - 22rem);
    overflow-y: auto;
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
.p-tabview-ink-bar {
    background-color: #1ebbd7;
}
.p-tabview-header.p-highlight {
    .p-tabview-header-action {
        color: #1ebbd7;
    }
}
.p-date {
    text-align: start;
    color: grey;
}
</style>

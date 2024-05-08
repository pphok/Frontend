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
    router.push('/class');
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <template #grid="slotProps">
                        <div class="grid grid-nogutter">
                            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 lg:col-3 p-3">
                                <!-- <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                                    <div class="pt-4">
                                        <div class="flex flex-row justify-content-between align-items-start gap-2">
                                            <div>
                                                <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                                <div class="text-lg font-medium text-900 mt-1">{{ item.name }}</div>
                                            </div>
                                            <div class="surface-100 p-1" style="border-radius: 30px">
                                                <div
                                                    class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                                                    style="
                                                        border-radius: 30px;
                                                        box-shadow:
                                                            0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                    "
                                                >
                                                    <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-column gap-4 mt-4">
                                            <span class="text-2xl font-semibold text-900">${{ item.price }}</span>
                                            <div class="flex gap-2">
                                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto white-space-nowrap"></Button>
                                                <Button icon="pi pi-heart" outlined></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                                <Card style="overflow: hidden" @click="() => onCardClick(index)">
                                    <template #header>
                                        <div class="p-4" style="background-color: darkgray; color: white">
                                            <div class="title flex justify-content-space-between align-item-center">
                                                <div class="w-full">
                                                    <h3 class="text-truncated t-white">Class 01 Class 01 Class 01 Class 01 Class 01 Class 01</h3>
                                                </div>
                                                <div style="text-align: end">
                                                    <Menu ref="classMenu" :model="overlayClassMenuItems" :popup="true" />
                                                    <button type="button" @click.stop="(e) => toggleClassMenu(e, index)" class="p-link t-white">
                                                        <i class="pi pi-ellipsis-v"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="class-section">
                                                <h5 class="text-truncated t-white">Section 1</h5>
                                            </div>
                                        </div>
                                    </template>
                                    <template #content>
                                        <div class="class-label mb-3">
                                            <i class="pi pi-list-check mr-3"></i>
                                            <span>2 Activities</span>
                                        </div>
                                        <div class="class-label">
                                            <i class="pi pi-user mr-3"></i>
                                            <span>Mr. Teacher1</span>
                                        </div>
                                    </template>
                                </Card>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </div>
</template>
<style>
.text-truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.t-white {
    color: white;
}
</style>

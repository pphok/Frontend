<script setup>
import { useClassRecordStore } from '@/store/class';
import { onMounted, watch } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = useClassRecordStore();
const pageNum = ref(1);
const pageSize = ref(24);
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);
const classMenu = ref([]);
const dataviewValue = ref([]);
const totalItems = ref(0);

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

const onCardClick = (index, id) => {
    console.log(index);
    // router.push('/class');
    router.push({
        path: route.query.to ? String(route.query.to) : '/class',
        query: {
            id: id
        }
    });
};

const onPageChange = (event) => {
    const { page, rows } = event; // Extract page and pageSize from the event
    pageNum.value = page + 1;
    pageSize.value = rows;
};

const fetchData = async () => {
    dataviewValue.value = [];
    await store.GetAll(pageNum.value, pageSize.value);
    dataviewValue.value = store.data;
    totalItems.value = store.meta?.total;
};

// Call fetchData initially and whenever page or pageSize changes
onMounted(fetchData);
watch([pageNum, pageSize], fetchData);
</script>

<template>
    <div class="card p-2">
        <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="pageSize" :sortOrder="sortOrder" :sortField="sortField" @page="onPageChange" :totalRecords="totalItems">
            <template #grid="">
                <div class="grid grid-nogutter scrollable-container p-0">
                    <div v-for="(item, index) in dataviewValue" :key="index" class="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
                        <Card style="overflow: hidden" @click="() => onCardClick(index, item.id)">
                            <template #header>
                                <div class="p-4" style="background-color: darkslateblue; color: white">
                                    <div class="title flex justify-content-space-between align-item-center">
                                        <div class="w-full">
                                            <h3 class="text-truncated t-white">{{ item.title }}</h3>
                                        </div>
                                        <div style="text-align: end">
                                            <Menu ref="classMenu" :model="overlayClassMenuItems" :popup="true" />
                                            <button type="button" @click.stop="(e) => toggleClassMenu(e, index)" class="p-link t-white">
                                                <i class="pi pi-ellipsis-v"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="class-section">
                                        <h5 class="text-truncated t-white">{{ item.section }}</h5>
                                    </div>
                                </div>
                            </template>
                            <template #content>
                                <div class="class-label mb-3">
                                    <i class="pi pi-list-check mr-3"></i>
                                    <span>{{ item.total_activities }} {{ item.total_activities > 0 ? 'Activities' : 'Activity' }}</span>
                                </div>
                                <div class="class-label">
                                    <i class="pi pi-user mr-3"></i>
                                    <span>Mr. {{ item.owner }}</span>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>
<style scoped>
.scrollable-container {
    height: calc(100vh - 18rem);
    overflow-y: auto;
    padding: 1rem; /* Optional: Add some padding inside the scrollable area */
}
.card-context-home {
    height: calc(100vh - 20rem);
}
.text-truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.t-white {
    color: white;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);
const classMenu = ref([]);
const dataviewValue = ref([
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' },
    { title: 'Class 01', section: 'Section 1', activities: 2, owner: 'Teacher1' }
]);

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
    <div class="card p-2">
        <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="24" :sortOrder="sortOrder" :sortField="sortField">
            <template #grid="slotProps">
                <div class="grid grid-nogutter scrollable-container p-0">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
                        <Card style="overflow: hidden" @click="() => onCardClick(index)">
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
                                    <span>{{ item.activities }} {{ item.activities > 0 ? 'Activities' : 'Activity' }}</span>
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

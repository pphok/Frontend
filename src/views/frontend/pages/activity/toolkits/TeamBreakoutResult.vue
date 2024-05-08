<script setup>
import { ref } from 'vue';

const layout = ref('grid');
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
</script>

<template>
    <DataView :value="dataviewValue" :layout="layout" :paginator="false" class="mt-0">
        <template #grid="slotProps">
            <div class="grid grid-nogutter scrollable-container">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 lg:col-4 p-2">
                    <Card style="overflow: hidden; border-radius: 5px" @click="() => {}">
                        <template #header>
                            <div class="p-1 flex justify-content-start align-item-center" style="background-color: darkslateblue; color: white">
                                <h6 class="text-truncated t-white full mt-auto mb-auto">{{ item.title }}</h6>
                            </div>
                        </template>
                        <template #content>
                            <div class="class-label mb-3">
                                <i class="pi pi-user mr-3"></i>
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
</template>
<style scoped>
.scrollable-container {
    height: calc(100vh - 50rem);
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

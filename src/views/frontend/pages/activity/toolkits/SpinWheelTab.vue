<script setup>
import { ref } from 'vue';
import ScoringRubric from './scoring_rubric/Scoring.vue';

const props = defineProps({
    inputData: String
});

const inputText = ref(props.initialValue);
const calendarValue = ref(null);

const emit = defineEmits(['update:inputData']);

function updateInputData() {
    emit('update:inputData', inputText.value);
}

const isUseRubric = ref(false);
const fullScore = ref(100);
const students = ref([
    { name: 'John 1', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John 2', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John 3', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John 4', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null },
    { name: 'John', img: '/images/avatar/amyelsner.png', score: null }
]);

const dropdownValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const dropdownValue = ref(null);

const dataviewValue = ref([
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() },
    { result: 'New York', date: new Date() }
]);

const OpenRubric = () => {
    isUseRubric.value = true;
};
const CloseRubric = () => {
    isUseRubric.value = false;
};
</script>
<template>
    <TabView class="tabview-custom">
        <!-- Input  -->
        <TabPanel header="Input">
            <InputGroup class="mb-3">
                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" :filter="true" />
                <InputGroupAddon>
                    <i class="pi pi-plus"></i>
                </InputGroupAddon>
                <InputGroupAddon>
                    <i class="pi pi-download"></i>
                </InputGroupAddon>
            </InputGroup>
            <Textarea v-model="inputText" placeholder="Your input data" @input="updateInputData" :autoResize="false" class="w-full" style="height: calc(100vh - 34rem)" />
            <Button label="Save for later" class="w-full mt-2" />
        </TabPanel>
        <!-- History  -->
        <TabPanel header="History">
            <Calendar :showIcon="true" iconDisplay="input" :showButtonBar="true" v-model="calendarValue" class="w-full"></Calendar>
            <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9">
                <template #list="slotProps">
                    <div class="grid grid-nogutter scrollable-container">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                            <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                                <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                    <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                        <div>
                                            <span class="font-medium text-secondary text-sm">{{ item.date }}</span>
                                            <div class="text-lg font-medium text-900 mt-2">{{ item.result }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template #grid="slotProps">
                    <div class="grid grid-nogutter">
                        <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 p-2">
                            <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                                <div class="surface-50 flex justify-content-center border-round p-3">
                                    <div class="relative mx-auto">
                                        <img class="border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 300px" />
                                        <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute" style="left: 4px; top: 4px"></Tag>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </TabPanel>
        <!-- Score  -->
        <TabPanel header="Score">
            <InputText class="w-full fix" type="text" placeholder="Search student" />
            <div class="scrollable-container mt-2">
                <div class="student-list mt-4" v-for="(item, index) in students" :key="index">
                    <div class="grid grid-nogutter">
                        <div class="col-12 sm:col-12 md:col-12 lg:col-7">
                            <span class="flex align-items-center gap-2">
                                <Avatar :image="item.img" shape="circle" />
                                <span class="font-bold white-space-nowrap text-truncated">{{ item.name }}</span>
                            </span>
                        </div>
                        <div class="col-12 sm:col-12 md:col-12 lg:col-5 flex justify-content-end">
                            <span>
                                <InputText class="w-5rem" type="text" placeholder="Score" />
                                <span> / {{ fullScore }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-nogutter mt-2">
                <div class="col-12 p-1">
                    <Sidebar v-model:visible="isUseRubric" :baseZIndex="1000" position="full" :show-close-icon="false">
                        <template #header>
                            <div class="flex justify-content-between align-items-center gap-2">
                                <Button @click="CloseRubric" icon="pi pi-times" class="text-secondary" style="background: transparent; color: black; border: none" label="Close" />
                            </div>
                            <h4>Student Name</h4>
                            <div class="save-button">
                                <Button class="mr-2 font-bold" severity="secondary">Reset</Button>
                                <Button class="mr-2 font-bold">Save & Release</Button>
                                <Button class="mr-2 font-bold" severity="info">Save</Button>
                            </div>
                        </template>
                        <ScoringRubric />
                    </Sidebar>
                    <Button label="Use rubric" @click="OpenRubric" class="w-full main-button" />
                </div>
                <div class="col-6 sm:col-12 md:col-12 lg:col-6 p-1">
                    <Button label="Export" class="w-full outlined" />
                </div>
                <div class="col-6 sm:col-12 md:col-12 lg:col-6 p-1">
                    <Button label="Save score" class="w-full" />
                </div>
            </div>
        </TabPanel>
    </TabView>
</template>
<style scoped lang="scss">
.scrollable-container {
    height: calc(100vh - 35rem);
    overflow-y: auto;
    padding: 1rem; /* Optional: Add some padding inside the scrollable area */
}
.text-truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.outlined {
    background: transparent;
    border: 1px solid black;
    color: black;
}
</style>

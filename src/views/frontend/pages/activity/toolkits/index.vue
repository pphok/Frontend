<script setup>
import { ref, onMounted } from 'vue';
import SpinWheel from './SpinWheel.vue';
import TeamBreakout from './TeamBreakout.vue';
import SpinWheelTab from './SpinWheelTab.vue';
import TeamBreakoutTab from './TeamBreakoutTab.vue';

const dropdownValue = ref(null);
const dropdownValues = ref([
    { name: 'Spin wheel', id: '1' },
    { name: 'Teams break-out', id: '2' }
]);
const inputData = ref('');

onMounted(() => {
    dropdownValue.value = dropdownValues.value[0];
});
const updateInputData = (newValue) => {
    inputData.value = newValue;
};
</script>

<template>
    <div className="card-context">
        <div class="grid grid-nogutter h-full">
            <div class="col-12 sm:col-12 md:col-12 lg:col-7 .col-xl-8 .col-xxl-8 p-3">
                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" class="w-full" />
                <!-- TODO: Insert Wheel here -->
                <div v-if="dropdownValue && dropdownValue.name == 'Spin wheel'" style="height: calc(100% - 2.3rem)">
                    <SpinWheel :input-data="inputData" />
                </div>
                <div v-if="dropdownValue && dropdownValue.name == 'Teams break-out'" style="height: calc(100% - 2.3rem)">
                    <TeamBreakout />
                </div>
            </div>
            <div class="col-12 sm:col-12 md:col-12 lg:col-5 .col-xl-4 .col-xxl-4 p-3">
                <div v-if="dropdownValue && dropdownValue.name == 'Spin wheel'" class="card card-tab h-full">
                    <SpinWheelTab :input-data="inputData" @update:input-data="updateInputData" />
                </div>
                <div v-if="dropdownValue && dropdownValue.name == 'Teams break-out'" class="card card-tab h-full">
                    <TeamBreakoutTab />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-tab {
    padding-bottom: 0;
    padding-top: 1rem;
}
</style>

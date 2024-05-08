<script setup>
import { ref } from 'vue';
import Table from './Table.vue';
import Criteria from './Criterial.vue';

const radioValue = ref('table');
const tableHeaders = ref([
    ['Scores', 'Criteria', ''],
    ['Column 2', 'Min', 'Max'],
    ['Column 3', 'Min', 'Max']
]);
const tableData = ref([
    ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'],
    ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3']
]);

function addColumn() {
    tableHeaders.value.push('New Column');
    tableData.value.forEach((row) => row.push(''));
}

function resetTable() {
    tableData.value = [Array(tableHeaders.value.length).fill('')];
}

function submitTable() {
    const jsonData = JSON.stringify({
        headers: tableHeaders.value,
        data: tableData.value
    });
    console.log(jsonData);
}
</script>
<template>
    <div class="grid grid-nogutter mt-3 mb-3">
        <div class="col-6 md:col-6 sm:col-12 flex align-item-center gap-4">
            <div class="field-radiobutton mb-0">
                <RadioButton id="table" name="option" value="table" v-model="radioValue" />
                <label for="table">By table</label>
            </div>
            <div class="field-radiobutton mb-0">
                <RadioButton id="criteria" name="option" value="criteria" v-model="radioValue" />
                <label for="criteria">By criteria</label>
            </div>
        </div>
        <div class="col-6 md:col-6 sm:col-12 action-btn flex justify-content-end gap-2">
            <Button @click="resetTable" class="bg-red-500">Reset</Button>
            <Button @click="addColumn" class="bg-primary">Save & Share</Button>
            <Button label="Save" @click="submitTable" />
        </div>
    </div>
    <div v-if="radioValue == 'table'">
        <Table />
    </div>
    <div v-else>
        <Criteria />
    </div>
</template>

<style scoped lang="scss">
.action-btn {
    Button {
        border: none;
    }
    Button:nth-child(3) {
        border: none;
        background: #1ebbd7;
        color: white;
    }
}
</style>

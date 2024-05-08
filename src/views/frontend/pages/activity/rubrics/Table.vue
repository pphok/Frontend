<script setup>
import { ref } from 'vue';

const tableHeaders = ref([
    ['Scores', 'Criteria', ''],
    ['Column 2', 'Min', 'Max'],
    ['Column 3', 'Min', 'Max']
]);
const tableData = ref([
    ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'],
    ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3']
]);
function removeColumn(index) {
    tableHeaders.value.splice(index, 1);
    tableData.value.forEach((row) => row.splice(index, 1));
}

function addRow() {
    tableData.value.push(new Array(tableHeaders.value.length).fill(''));
}

function addColumn() {
    tableHeaders.value.push(['New Column', 'Min', 'Max']);
    tableData.value.forEach((row) => row.push(''));
}

function removeRow(index) {
    tableData.value.splice(index, 1);
}
</script>

<template>
    <div>
        <div class="flex align-item-center">
            <div class="scrollable-table">
                <table class="dynamic-table">
                    <tr class="table-header">
                        <th v-for="(header, columnIndex) in tableHeaders" :key="columnIndex">
                            <div class="grid grid-nogutter">
                                <div class="col-12 slope"></div>
                                <div class="col-12">
                                    <input type="text" v-model="tableHeaders[columnIndex][0]" class="header-input h-1" />
                                </div>
                                <div class="col-6">
                                    <input type="text" v-model="tableHeaders[columnIndex][1]" class="header-input h-2" />
                                </div>
                                <div class="col-6">
                                    <input type="text" v-model="tableHeaders[columnIndex][2]" class="header-input h-3" />
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                            <Textarea v-model="tableData[rowIndex][cellIndex]" placeholder="Your input data" rows="3" :autoResize="true" class="cell-input" />
                        </td>
                        <td class="remove-row" style="width: 4rem">
                            <div class="w-full remove-row-item">
                                <Button @click="removeRow(rowIndex)" class="trash">
                                    <i class="pi pi-trash"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                    <tr style="height: 4rem">
                        <td v-for="(header, columnIndex) in tableHeaders" :key="columnIndex" class="remove-col">
                            <div class="w-full remove-col-item">
                                <Button @click="removeColumn(columnIndex)" class="trash">
                                    <i class="pi pi-trash"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <Button @click="addColumn" class="h-full flex justify-content-center align-item-center gap-2 add-btn" style="width: 2.2rem">
                    <span class="rotated-text">
                        <i class="pi pi-plus"></i>
                        ADD
                    </span>
                </Button>
            </div>
        </div>
        <Button @click="addRow" class="w-full flex justify-content-center align-item-center gap-2 mt-3 add-btn">
            <i class="pi pi-plus"></i>
            ADD
        </Button>
    </div>
</template>
<style scoped lang="scss">
.scrollable-table {
    height: calc(100vh - 25rem);
    overflow-y: auto;
}
th:nth-child(1) {
    width: 20%;
    height: 30px;
    .slope {
        position: relative;
        z-index: 15;
        border-bottom: solid 1px #ddd;
        transform: rotate(14deg);
        transform-origin: left;
        // -o-transform: rotate(45deg);
        // -moz-transform: rotate(45deg);
        // -webkit-transform: rotate(45deg);
    }

    .h-1 {
        border-bottom: none;
        text-align: end;
        cursor: not-allowed; /* Change cursor to indicate it's disabled */
        pointer-events: none;
        font-weight: bold;
    }
    .h-3 {
        border-right: none;
        cursor: not-allowed; /* Change cursor to indicate it's disabled */
        pointer-events: none;
        font-weight: bold;
    }
    .h-2 {
        border-right: none;
        cursor: not-allowed; /* Change cursor to indicate it's disabled */
        pointer-events: none;
        font-weight: bold;
    }
}

.table-header {
    position: sticky;
    top: 0;
    z-index: 10; /* Ensures the header stays above the body */
    background-color: white; /* Optional: Matches the body background */

    th {
        background-color: #ddd;
    }
}

.add-btn {
    background: #f1f1f1;
    color: #707070;
    border: none;
}
.rotated-text {
    transform: rotate(90deg);
    white-space: nowrap;
}
.dynamic-table {
    border-collapse: collapse;
    width: 100%;
}

.dynamic-table th,
.dynamic-table td {
    border: 1px solid #ddd;
    text-align: left;
}

button {
    background-color: gray;
    border: 1px solid black;
    cursor: pointer;
}

.header-input {
    padding: 8px;
    width: 100%;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;

    &.h-1 {
        border-top: none;
    }
    &.h-2 {
        border-right: 1px solid #ddd;
    }
    &.h-2,
    &.h-3 {
        border-top: none;
        border-bottom: none;
    }
}

.cell-input {
    width: 100%;
    height: 100%;
    margin-bottom: -4px;
    box-sizing: border-box;
    border: none;
    box-shadow: none;
}
td.remove-col {
    border: none;
    overflow: hidden;

    .remove-col-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &:hover .trash {
        display: block;
    }
}

td.remove-row {
    border: none;
    padding-top: 1rem;

    .remove-row-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &:hover .trash {
        display: block;
    }
}

.trash {
    display: none;
    background: white;
    border: none;
    box-shadow: 0 1px 2px 1px rgba(17, 12, 46, 0.15);
    color: #707070;
}

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

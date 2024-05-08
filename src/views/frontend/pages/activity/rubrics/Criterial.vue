<script setup>
import { ref } from 'vue';

const criteriaData = ref([
    {
        criteria: '',
        context: ref([
            {
                context: '',
                min: '',
                max: ''
            }
        ])
    },
    {
        criteria: '',
        context: ref([
            {
                context: '',
                min: '',
                max: ''
            }
        ])
    }
]);

const removeColumn = (index) => {
    criteriaData.value.splice(index, 1);
};

function addCriteriaItem() {
    criteriaData.value.push({
        criteria: '',
        context: ref([
            {
                context: '',
                min: '',
                max: ''
            }
        ])
    });
}

function addContext(index) {
    criteriaData.value[index].context.push({
        context: '',
        min: '',
        max: ''
    });
}

function removeContext(index, i) {
    criteriaData.value[index].context.splice(i, 1);
}
</script>

<template>
    <div>
        <div class="scrollable-table w-full">
            <div v-for="(header, index) in criteriaData" :key="index">
                <div class="card w-full p-3 shadow-1 mb-4" style="border: 1px solid #cacaca">
                    <InputText class="w-full mb-3 input-context" placeholder="Criteria" />
                    <div class="grid grid-nogutter">
                        <div v-for="(item, i) in criteriaData[index].context" :key="i" class="col-3 p-2 flex align-item-center">
                            <div class="card shadow-1 p-3 pb-1">
                                <div class="grid grid-nogutter mb-2">
                                    <div class="col-12">
                                        <Textarea v-model="item.context" placeholder="Your input data" rows="3" :autoResize="true" class="w-full input-context" />
                                    </div>
                                    <div class="col-6 pr-2 pt-2">
                                        <InputText v-model="item.min" class="w-full input-context" placeholder="Min" />
                                    </div>
                                    <div class="col-6 pl-2 pt-2">
                                        <InputText v-model="item.max" class="w-full input-context" placeholder="Max" />
                                    </div>
                                </div>
                                <div class="w-full remove-row-item">
                                    <Button @click="(e) => removeContext(index, i)" class="trash">
                                        <i class="pi pi-trash"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div class="p-2" style="min-height: 10rem">
                            <Button @click="addContext(index)" class="h-full flex justify-content-center align-item-center gap-2 add-btn" style="width: 2.2rem">
                                <span class="rotated-text">
                                    <i class="pi pi-plus"></i>
                                    ADD
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div class="w-full remove-col-item">
                        <Button @click="removeColumn(index)" class="trash">
                            <i class="pi pi-trash"></i>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <Button @click="addCriteriaItem" class="w-full flex justify-content-center align-item-center gap-2 mt-3 add-btn">
            <i class="pi pi-plus"></i>
            ADD
        </Button>
    </div>
</template>
<style scoped lang="scss">
.input-context {
    background-color: #ddd;
}
.scrollable-table {
    height: calc(100vh - 25rem);
    overflow-y: auto;
}

.scrollable-row {
    overflow-x: auto;
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

.remove-col-item {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover .trash {
        opacity: 1;
    }
}

.remove-row-item {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover .trash {
        opacity: 1;
    }
}

.trash {
    opacity: 0;
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

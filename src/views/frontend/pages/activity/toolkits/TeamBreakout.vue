<script setup>
import { ref } from 'vue';
import TeamBreakoutResult from './TeamBreakoutResult.vue';
const checkboxValue = ref([]);
</script>
<template>
    <div class="card mt-3">
        <div class="card-body">
            <div class="field grid">
                <label for="quantity" class="col-12 mb-2 md:col-4 md:mb-0">Quantity: </label>
                <div class="col-12 md:col-8">
                    <InputText id="quantity" type="text" />
                </div>
            </div>
            <div class="field grid">
                <label for="group" class="col-12 mb-2 md:col-4 md:mb-0">Number of group: </label>
                <div class="col-12 md:col-8">
                    <InputText id="group" type="text" />
                </div>
            </div>
            <div class="field grid">
                <label for="max" class="col-12 mb-2 md:col-4 md:mb-0">Max people per group: </label>
                <div class="col-12 md:col-8">
                    <InputText id="max" type="text" />
                </div>
            </div>
            <div class="field grid">
                <label for="representative" class="col-12 mb-2 md:col-4 md:mb-0">A representative? </label>
                <div class="col-12 md:col-8">
                    <Checkbox id="representative" name="representative" value="representative" v-model="checkboxValue" />
                </div>
            </div>
            <br />
            <div class="start-button">
                <Button label="Start" class="w-full main-button" />
            </div>
        </div>
    </div>
    <div class="team-result">
        <div class="field grid grid-nogutter p-0 m-0">
            <div class="col-6">
                <h4>Result:</h4>
            </div>
            <div class="col-6 text-right pt-2">
                <div class="field-checkbox mb-0 flex justify-content-end align-item-center">
                    <Checkbox id="score" name="option" value="score" v-model="checkboxValue" />
                    <label for="score">Add to score</label>
                </div>
            </div>
        </div>
        <TeamBreakoutResult />
    </div>
</template>

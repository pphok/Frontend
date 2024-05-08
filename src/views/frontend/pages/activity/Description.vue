<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>
<template>
    <div className="card-context">
        <Editor v-model="value" placeholder="Enter your description" editorStyle="height: calc(100vh - 30rem)" />
        <div class="mt-3" style="float: right">
            <Button label="Save & Share" class="mr-3" />
            <Button label="Save" class="main-button" />
        </div>
    </div>
</template>

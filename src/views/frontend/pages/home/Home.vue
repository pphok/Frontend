<script setup>
import Class from './Class.vue';
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card-context-home">
                <Class />
            </div>
        </div>
    </div>
</template>
<style scoped>
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

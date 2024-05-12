<script setup>
import { ref } from 'vue';
import { watch } from 'vue';
import { watchEffect } from 'vue';
import { SearchIcon, AdjustmentsHorizontalIcon, XIcon } from 'vue-tabler-icons';

const props = defineProps({
  closesearch: {
    type: Function,
    required: false
  }
});

const search = ref('');

const emit = defineEmits(['update:modelValue']);

watchEffect(() => {
  emit('update:modelValue', search.value);
});

</script>

<template>
  <div class="search-bar-wrapper">
    <v-text-field persistent-placeholder placeholder="Search" color="primary" variant="outlined" hide-details v-model="search">
      <template v-slot:prepend-inner >
        <SearchIcon stroke-width="1.5" size="17" class="text-lightText" />
      </template>
    </v-text-field>
  </div>
</template>


<style scoped>
.v-text-field {
  background-color: white;
  box-sizing: border-box;
  border-radius: 11px; /* Adjust this value to make the corners more or less rounded */
  padding: 0.25px; /* Adjust this value to make the size smaller or larger */
}

.v-text-field .v-input__control {
  background-clip: padding-box;
}


</style>
<script setup>
import { ref } from 'vue';
import Timer from '../Timer.vue';

const selectedUser = ref();
const menu = ref();
const users = ref([
    { id: 0, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
    { id: 1, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
    { id: 2, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
    { id: 3, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
    { id: 4, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' },
    { id: 5, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
    { id: 6, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
    { id: 7, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
    { id: 8, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
    { id: 9, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' },
    { id: 10, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
    { id: 11, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
    { id: 12, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
    { id: 13, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
    { id: 14, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' },
    { id: 15, name: 'Amy Elsner', image: 'amyelsner.png', role: 'Admin' },
    { id: 16, name: 'Anna Fali', image: 'annafali.png', role: 'Member' },
    { id: 17, name: 'Asiya Javayant', image: 'asiyajavayant.png', role: 'Member' },
    { id: 18, name: 'Bernardo Dominic', image: 'bernardodominic.png', role: 'Guest' },
    { id: 19, name: 'Elwin Sharvill', image: 'elwinsharvill.png', role: 'Member' }
]);

const onRightClick = (event, user) => {
    selectedUser.value = user;
    menu.value.show(event);
};
</script>
<template>
    <ul class="scrollable-sidebar m-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-20rem lg:w-20rem">
        <li
            v-for="user in users"
            :key="user.id"
            :class="['p-2 hover:surface-hover border-round border-1 border-transparent transition-all transition-duration-200 flex align-items-center justify-content-between', { 'border-primary': selectedUser?.id === user.id }]"
            @contextmenu="onRightClick($event, user)"
        >
            <div class="flex align-items-center gap-2">
                <Avatar :image="`https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1`" shape="circle" />
                <span class="font-bold">{{ user.name }}</span>
            </div>
        </li>
    </ul>
    <div class="card p-3 md:w-20rem lg:w-20rem mt-4">
        <Timer />
    </div>
</template>
<style scoped>
.scrollable-sidebar {
    height: calc(100vh - 19rem);
    overflow-y: auto;
    padding: 1rem; /* Optional: Add some padding inside the scrollable area */
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import { me } from '@/api/me';

const swt1 = ref(true);
const swt2 = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout(); // Clear user data
  router.push('/auth/login'); // Navigate directly after logout
};

const userFirstName = ref('');
const userLastName = ref('');

const fetchUserData = async () => {
  try {
    const response = await me.getMe(); // Fetch data from API
    const userData = response.data;
    // Update reactive variables with fetched data
    userFirstName.value = userData.first_name;
    userLastName.value = userData.last_name;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

onMounted(() => {
  fetchUserData(); // Fetch data when the component mounts
});

</script>

<template>
  <div class="pa-4">
    <h4 class="mb-n1">Welcome, <span class="font-weight-regular">{{ userFirstName }} {{ userLastName }}</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">Project admin</span>
    <v-divider></v-divider>
    <v-list class="mt-3">
      <v-list-item @click="handleLogout" color="secondary" rounded="md">
        <template v-slot:prepend>
          <LogoutIcon size="20" class="mr-2" />
        </template>
        <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<template>
  <v-container class="grey lighten-5" fluid>
    <!-- Search Bar -->
    <v-row>
      <v-col cols="5">
        <SearchBarPanel :closesearch="handleCloseSearch" v-model="search" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
      <v-toolbar class="rounded mb-5 mt-5 elevation-2" style="background-color: white;">
        <v-toolbar-title class="text-h3 font-weight-bold text-primary">User Management</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" color="primary" class="mr-5" @click="showCreateUserDrawer = true">Create</v-btn>
      </v-toolbar>
    </v-col>
    </v-row>

    <!-- User Table -->
    <v-row justify="start" align="center" class="fill-height">
      <v-col cols="12">
        <v-card class="elevation-2">


          <v-data-table
            :items="filteredUsers"
            :headers="tableHeaders"
            class="elevation-1"
          >
            <!-- Slot for displaying Username -->
            <template v-slot:item.username="{ item }">
              {{ item.first_name }} {{ item.last_name }}
            </template>

            <!-- Slot for displaying Ban status and switch -->
            <template v-slot:item.ban="{ item }">
              <v-switch
                v-model="item.statusBoolean"
                :label="item.statusBoolean ? 'Active' : 'Inactive'"
                @change="() => toggleStatusPrompt(item)"
                color="success"
                class="mt-5"
              ></v-switch>
            </template>

            <!-- Slot for displaying actions -->
            
          </v-data-table>

          <!-- Ban Confirm Dialog -->
          <v-dialog v-model="showToggleDialog" persistent width="300">
            <v-card>
              <v-card-title class="headline">Confirmation</v-card-title>
              <v-card-text>Are you sure you want to change the user status?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="closeToggleDialog">Cancel</v-btn>
                <v-btn color="primary" text @click="confirmToggle">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Navigation Drawer for User Creation -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-navigation-drawer
            v-model="showCreateUserDrawer"
            temporary
            location="right"
            fixed
            app
            width="500"
          >
            <CreateUserForm @user-created="fetchUsers" @close-drawer="showCreateUserDrawer = false"/>
          </v-navigation-drawer>
</template>

<script>
import SearchBarPanel from '@/layouts/full/vertical-header/SearchBarPanel.vue';
import CreateUserForm from './forms/create_user.vue';
import { userService } from '@/api/userService';
import { toast } from 'vue3-toastify';

export default {
  components: {
    SearchBarPanel,
    CreateUserForm,
  },
  data() {
    return {
      search: '',
      showToggleDialog: false,
      userToToggle: null,
      showCreateUserDrawer: false,
      users: [],
      tableHeaders: [
        { title: "Username", key: "username", sortable: false},
        { title: "Email", key: "email", sortable: false},
        { title: "Ban", key: "ban", sortable: false},
      ],
    };
  },
  computed: {
    filteredUsers() {
      if (!this.search) {
        return this.users;
      }
      const searchTerm = this.search.toLowerCase();
      return this.users.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }
  },
  async created() {
    try {
      const response = await userService.getAllUsers();
      this.users = response.data.map(user => ({
        ...user,
        statusBoolean: user.status === 'ACTIVE'  // Converts the status string to a boolean
      })) || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      this.users = [];
    }
  },
  methods: {
    toggleStatusPrompt(item) {
      this.userToToggle = { ...item };  // Clone item to preserve original status until confirmed
      this.showToggleDialog = true;  // Show confirmation dialog
    },
    async confirmToggle() {
      // Use the current value of statusBoolean to determine the new status
      const newStatus = this.userToToggle.statusBoolean? 'ACTIVE' : 'INACTIVE';
      try {
        console.log('Updating status:', this.userToToggle.id, newStatus);
        const response = await userService.updateUserStatus(this.userToToggle.id, newStatus);
        console.log('Status updated successfully:', response);
        toast.success('Updated successfully', { autoClose: 3000 });
        // Update the status in the original users array
        const userIndex = this.users.findIndex(u => u.id === this.userToToggle.id);
        if (userIndex!== -1) {
          this.users[userIndex].status = newStatus;
          // Removed the line that incorrectly toggles the statusBoolean
        }
      } catch (error) {
        console.error('Failed to update status:', error);
        // Optionally revert the toggle on error or handle error
      }
      this.showToggleDialog = false;
    },
    async fetchUsers() {
        try {
        const response = await userService.getAllUsers();
        this.users = response.data.map(user => ({
          ...user,
          statusBoolean: user.status === 'ACTIVE'  // Converts the status string to a boolean
        })) || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        this.users = [];
      }
    },
    closeToggleDialog() {
      const userIndex = this.users.findIndex(user => user.id === this.userToToggle.id);
      if (userIndex !== -1) {
        // Revert the status boolean change if the user cancels the operation
        this.users[userIndex].statusBoolean = !this.users[userIndex].statusBoolean;
      }
      this.showToggleDialog = false;
    },
  },
};
</script>

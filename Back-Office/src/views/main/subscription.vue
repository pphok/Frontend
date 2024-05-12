<template>
  <v-container class="grey lighten-5" fluid>
    <!-- Similar structure to User Management -->
    <v-row>
      <v-col cols="5">
        <SearchBarPanel :closesearch="handleCloseSearch" />
      </v-col>
    </v-row>
    
    <!-- Subscription Table -->
    <v-row justify="start" align="center" class="fill-height">
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-toolbar class="rounded">
            <v-toolbar-title class="text-h3 font-weight-bold text-primary">Subscription Management</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" color="primary" class="mr-5" @click="showCreateSubscriptionDrawer = true">Create</v-btn>
          </v-toolbar>

        <v-data-table 
        :items="subscriptions"
        class="elevation-1 my-custom-table"
       >
        <template v-slot:[`item.action`]="{ item }">
          <!-- Modify the icons and methods as per your action handlers -->
          <v-icon small class="mr-3 cursor-pointer" style="color: grey;">mdi-pencil</v-icon>
          <v-icon small @click="confirmDelete(item)" class="cursor-pointer" style="color: red;">mdi-delete</v-icon>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-switch
            v-model="item.status"
            :label="item.status ? 'Active' : 'Inactive'"
            @change="toggleStatus(item)"
            color="success"
            class="mt-5"
          ></v-switch>
        </template>
      </v-data-table>
          <v-dialog v-model="showDialog" persistent width="300">
            <v-card>
              <v-card-title class="headline">Confirmation</v-card-title>
              <v-card-text>Are you sure you want to delete this?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="primary" text @click="deleteSubscription">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-model="showCreateSubscriptionDrawer"
      temporary
      location="right"
      fixed
      app
      width="500"
    >
      <!-- Your form for creating a user -->
      <!-- This could be a separate component or directly here -->
      <create-subscription-form @close-drawer="showCreateSubscriptionDrawer = false" />
    </v-navigation-drawer>
  </v-container>
</template>

<script>
// Import your components, make sure the path is correct
import SearchBarPanel from '@/layouts/full/vertical-header/SearchBarPanel.vue';
import CreateSubscriptionForm from './forms/create_subscription.vue';

export default {
  components: {
    SearchBarPanel,
    CreateSubscriptionForm
  },
  data() {
    return {
      showCreateSubscriptionDrawer: false,
      showDialog: false,
      subscriptionToDelete: null,
      // Define your headers and data here
      subscriptionTableHeaders: [
        { text: 'Username', align: 'start', value: 'username' },
        { text: 'Type', value: 'type' },
        { text: 'Receive', value: 'receive' },
        { text: 'Community', value: 'community' },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Started date', value: 'startedDate' },
        { text: 'Expired date', value: 'expiredDate' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      subscriptions: [
        {
        username: 'User 1',
        type: 'Community',
        receive: 20,
        community: 'YES',
        status: true,
        startedDate: '01/01/2000',
        expiredDate: '01/01/2001',
        action: 'actions' // You'll replace this with actual action components in your template
      },
      {
        username: 'User 2',
        type: 'Free Trial',
        receive: 0,
        community: 'NO',
        status: false,
        startedDate: '02/11/2000',
        expiredDate: '01/01/2001', // Or however you wish to represent this
        action: 'actions' // You'll replace this with actual action components in your template
      },
      ]
    };
  },
  methods: {
    handleCloseSearch() {
      // Handle search logic
    },
    confirmDelete(subscription) {
      this.subscriptionToDelete = subscription;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.subscriptionToDelete = null;
    },
    deleteSubscription() {
    if (this.subscriptionToDelete) {
      // Perform the deletion logic, such as making an API call
      // For now, just remove from the subscriptions array for demonstration
      this.subscriptions = this.subscriptions.filter(subscription => subscription !== this.subscriptionToDelete);
      this.closeDialog();
    }
  },
  }
};
</script>

<!-- Add your scoped style here -->
<style scoped>
/* Similar styles to user.vue if needed */
</style>

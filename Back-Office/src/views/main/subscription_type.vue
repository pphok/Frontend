<template>
  <v-container class="grey lighten-5" fluid>
    <!-- Search Bar -->
    <v-row>
      <v-col cols="5">
        <SearchBarPanel :closesearch="handleCloseSearch" />
      </v-col>
    </v-row>
    
    <!-- Subscription Type Table -->
    <v-row justify="start" align="center" class="fill-height">
      <v-col cols="12">
        <v-card class="elevation-2">
          <v-toolbar class="rounded">
            <v-toolbar-title class="text-h3 font-weight-bold text-primary">Subscription Type</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" color="primary" class="mr-5" @click="showCreateSubscriptionDrawer = true" >Create</v-btn>
          </v-toolbar>

          <v-data-table 
          
          :items="subscriptionType"
          class="elevation-1 my-custom-table"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-icon small class="mr-3 cursor-pointer" style="color: grey;">mdi-pencil</v-icon>
            <v-icon small @click="confirmDeleteType(item)" class="mr-3 cursor-pointer" style="color: red;">mdi-delete</v-icon>
            <v-icon small @click="confirmDeleteType(item)" class="cursor-pointer" color="primary">mdi-eye</v-icon>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-select
              v-model="item.status"
              :items="statusOptions"
              @change="toggleStatus(item)"
              solo
              small
              style="width: 200px; height: 50px;"
            ></v-select>
          </template>
        </v-data-table>
          <!-- ... rest of your code ... -->
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" persistent width="300">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>Are you sure you want to delete this?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" text @click="deleteType">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-navigation-drawer
      v-model="showCreateSubscriptionDrawer"
      temporary
      location="right"
      fixed
      app
      width="500"
    >
      <!-- Your form for creating a subscription type -->
      <CreateSubscriptionForm @close-drawer="showCreateSubscriptionDrawer = false" />
    </v-navigation-drawer>
  </v-container>
</template>

<script>
// Replace './SearchBarPanel' and other imports withs the actual relative path to your components
import SearchBarPanel from '@/layouts/full/vertical-header/SearchBarPanel.vue'; // Import the SubscriptionTypeTable component
import CreateSubscriptionForm from './forms/create_subscription_type.vue';// Import the form for creating a subscription type

export default {
  components: {
    SearchBarPanel,
    CreateSubscriptionForm
  },
  // ... rest of your methods and data ...
  data() {
    return {
      showCreateSubscriptionDrawer: false,
      showDialog: false,
      typeToDelete: null,
      statusOptions: ['Active', 'Inactive', 'Partnership'],
      headers: [
        { text: 'Type Name', value: 'typeName' },
        { text: 'Price', value: 'price' },
        { text: 'Description', value: 'description' },
        { text: 'Community Access', value: 'community' },
        { text: 'Status', value: 'status' },
        { text: 'Limit User', value: 'limitUser' },
        { text: 'Duration (Days)', value: 'duration' },
        { text: 'Actions'}
      ],
      subscriptionType: [
        {
          typeName: 'Paragon',
          price: 0,
          description: 'N/A',
          community: 'YES',
          status: 'Partnership',
          limitUser: 'Unlimited',
          duration: 36525,
          action: 'actions'
        },
        {
          typeName: 'Free 14 days',
          price: 0,
          description: 'Free testing ...',
          community: 'NO',
          status: 'Inactive',
          limitUser: 1,
          duration: 14,
          action: 'actions'
        },
        {
          typeName: 'Monthly',
          price: '$7',
          description: 'Free use for i...',
          community: 'NO',
          status: 'Active',
          limitUser: 1,
          duration: 30,
          action: 'actions'
        },
        // Add more subscription type objects as needed
      ]
    }
  },

  methods: {
    handleCloseSearch() {
      // Implementation of search closing
    },
    confirmDeleteType(item) {
      this.typeToDelete = item;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.typeToDelete = null;
    },
    deleteType() {
      if (this.typeToDelete) {
        this.subscriptionType = this.subscriptionType.filter(type => type !== this.typeToDelete);
        this.closeDialog();
      }
    },
  }
};



</script>

<style scoped>
.my-custom-table {
  max-height: 600px; 
  overflow-y: auto; 
  font-size: 0.875rem;
}

</style>
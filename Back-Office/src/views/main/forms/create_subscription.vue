<template>
    <v-card-title>
      Create subscription for user
    </v-card-title>
  
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                label="Select user"
                :items="users"
                v-model="subscription.userId"
                :rules="[rules.required]"
                required
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Select subscription type"
                :items="subscriptionTypes"
                v-model="subscription.type"
                :rules="[rules.required]"
                required
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Cost receive"
                v-model="subscription.cost"
                :rules="[rules.required, rules.numeric]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Limit user"
                v-model="subscription.limit"
                :rules="[rules.numeric]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="subscription.community" row>
                <v-radio label="Individual" value="individual" color="primary"></v-radio>
                <v-radio label="Community" value="community" color="primary"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-row justify="end">
      <v-card-actions>
        <v-btn large color="secondary" :disabled="!valid" @click="submitForm" class="mr-12" variant="tonal">Save</v-btn>
      </v-card-actions>
    </v-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: true,
        subscription: {
          userId: null,
          type: null,
          cost: '',
          limit: '',
          community: 'individual',
        },
        users: [
          // Populate with user data
        ],
        subscriptionTypes: [
          // Populate with subscription type data
        ],
        rules: {
          required: value => !!value || 'Required.',
          numeric: value => !isNaN(parseFloat(value)) && isFinite(value) || 'Must be numeric',
        }
      };
    },
    methods: {
      submitForm() {
        if (this.$refs.form.validate()) {
          // Handle form submission
          console.log('Form data:', this.subscription);
          this.resetForm();
        }
      },
      resetForm() {
        this.$refs.form.reset();
        this.subscription = {
          userId: null,
          type: null,
          cost: '',
          limit: '',
          community: 'individual',
        };
      }
    }
  };
  </script>
  
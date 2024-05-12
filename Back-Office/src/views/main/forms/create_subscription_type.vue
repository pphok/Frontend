<template>
    <v-card-title>
      Create subscription type
    </v-card-title>
  
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Subscription Name"
                v-model="subscription.name"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Price"
                v-model="subscription.price"
                :rules="[rules.required, rules.numeric]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="User Limit"
                v-model="subscription.userLimit"
                :rules="[rules.numeric]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Duration"
                v-model="subscription.duration"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-select
                    label="Status"
                    :items="statusOptions"
                    v-model="subscription.status"
                    item-text="text"
                    item-value="value"
                    :rules="[rules.required]"
                    required
                ></v-select>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="subscription.community" row>
                <v-radio label="Individual" value="individual" color="primary"></v-radio>
                <v-radio label="Community" value="community" color="primary"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Description"
                v-model="subscription.description"
                :rules="[rules.required]"
                required
              ></v-textarea>
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
          name: '',
          price: '',
          userLimit: '',
          duration: '',
          status: null,
          community: 'individual',
          description: '',
        },
        statusOptions: [
          { text: 'Active', value: 'active' },
          { text: 'Inactive', value: 'inactive' },
          { text: 'Partnership', value: 'partnership' }
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
          console.log('Form data:', this.subscription);
          this.resetForm();
        }
      },
      resetForm() {
        this.$refs.form.reset();
        this.subscription = {
          name: '',
          price: '',
          userLimit: '',
          duration: '',
          status: null,
          community: 'individual',
          description: '',
        };
      }
    }
  };
  </script>
  
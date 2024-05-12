

<template>
    <v-card-title>
      Create New User
    </v-card-title>
    
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="First Name"
                v-model="user.firstName"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Last Name"
                v-model="user.lastName"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="E-mail"
                v-model="user.email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                type="password"
                v-model="user.password"
                :rules="[rules.required, rules.min]"
                required
                counter
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Confirm Password"
                type="password"
                v-model="user.confirmPassword"
                :rules="[rules.required, rules.passwordMatch(user.password)]"
                required
                counter
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="user.gender" row>
                <v-radio label="Male" value="male" color="primary"></v-radio>
                <v-radio label="Female" value="female" color="primary"></v-radio>
                <v-radio label="Other" value="other" color="primary"></v-radio>
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

import { userService } from '@/api/userService'; // Adjust the path as necessary
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      valid: true,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: null,
      },
      rules: {
        required: value => !!value || 'Required.',
        min: value => (value && value.length >= 8) || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid email.';
        },
        passwordMatch: password => {
          return value => value === password || 'Password does not match';
        }
      }
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          const response = await userService.createUser({
            first_name: this.user.firstName,
            last_name: this.user.lastName,
            email: this.user.email,
            password: this.user.password,
            confirm_password: this.user.confirmPassword,
            gender: this.user.gender
          });
          console.log('User created:', response);
          
          this.resetForm();
          // Optionally, redirect the user or display a success message
        } catch (error) {
          console.error('Error creating user:', error);
          this.$emit('close-drawer');
          this.$emit('user-created');
          toast.success('User Created Successfully', { autoClose: 3000 });
          // Handle errors, e.g., show an error message
        }
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: null,
      };
    }
  }
};
  </script>
  

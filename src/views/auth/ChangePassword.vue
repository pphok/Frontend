<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const route = useRoute();

const error = ref(false);
const errorMessage = ref('');
const formData = ref({
    password: '',
    confirm_password: '',
    verified_code: ''
});

const errors = ref({
    password: undefined,
    confirm_password: undefined
});
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

const alertTextClasses = computed(() => {
    return {
        'text-green-800': alertType.value === 'success',
        'text-red-800': alertType.value === 'error'
    };
});

const alertClasses = computed(() => {
    return {
        'bg-green-100': alertType.value === 'success',
        'bg-red-100': alertType.value === 'error',
        'border-l-4': true,
        'border-green-500': alertType.value === 'success',
        'border-red-500': alertType.value === 'error',
        'text-green-700': alertType.value === 'success',
        'text-red-700': alertType.value === 'error',
        'p-4': true,
        rounded: true,
        'mt-4': true
    };
});

const submitForm = async () => {
    // Clear previous errors
    errors.value = {};

    if (!formData.value.password) {
        errors.value.password = 'Password is required';
    }

    if (!formData.value.confirm_password) {
        errors.value.confirm_password = 'Please confirm your password';
    } else if (formData.value.password !== formData.value.confirm_password) {
        errors.value.confirm_password = 'Passwords do not match';
    } else {
        error.value = false;
        errorMessage.value = '';
        // Here you can navigate to the next page
        let payload = ref({
            password: formData.value.password,
            verified_code: formData.value.verified_code
        });
        const store = useAuthStore();
        await store.ChangePassword(payload.value);
        if (store.error) {
            showAlertMessage(store.error, 'error');
            return;
        }
        // Successful login
        showAlertMessage('Change Password successful', 'success');
        router.push('/');
    }
};

const showAlertMessage = (message, type) => {
    showAlert.value = true;
    alertMessage.value = message;
    alertType.value = type;

    // Hide the alert after 3 seconds
    setTimeout(() => {
        hideAlertMessage();
    }, 3000);
};
const hideAlertMessage = () => {
    showAlert.value = false;
    alertMessage.value = '';
    alertType.value = '';
};

onMounted(() => {
    const queryParamValue = route.query.verified_code;
    if (queryParamValue) {
        formData.value.verified_code = queryParamValue;
    }
});
</script>

<template>
    <section class="py-10 bg-white sm:py-16 lg:py-24 h-screen mt-16">
        <div class="h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-content-center align-center" style="flex-direction: column">
            <img src="/layout/images/krukit-white.png" alt="Logo" class="w-1 h-auto mt-4 ml-8 fixed top-0 left-0" />
            <div class="max-w-2xl mx-auto text-center">
                <p class="text-1xl font-bold leading-tight text-black sm:text-2xl md:text-3xl mb-6">Forget Password</p>
            </div>
            <div class="relative max-w-md mx-auto mt-4 md:mt-2 w-4 sm:w-2 md:w-3 lg:w-4">
                <!-- Adjusted margin top -->
                <div class="overflow-hidden rounded-md shadow-none">
                    <form @submit.prevent="submitForm">
                        <div class="space-y-1">
                            <!-- Adjusted space between elements -->
                            <div>
                                <div class="relative text-gray-400 focus-within:text-gray-600 mb-4">
                                    <!-- Password  -->
                                    <div class="field p-fluid">
                                        <Password
                                            id="password"
                                            v-model="formData.password"
                                            placeholder="Password"
                                            :feedback="false"
                                            :toggleMask="true"
                                            class="input-text w-full mt-4"
                                            :inputStyle="{ padding: '1rem', background: 'rgb(218, 238, 239)' }"
                                        ></Password>
                                        <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
                                    </div>

                                    <!-- Confirm Password  -->
                                    <div class="field p-fluid">
                                        <Password
                                            id="confirm-password"
                                            v-model="formData.confirm_password"
                                            placeholder="Confirm Password"
                                            :feedback="false"
                                            :toggleMask="true"
                                            class="input-text w-full mt-4"
                                            :inputStyle="{ padding: '1rem', background: 'rgb(218, 238, 239)' }"
                                        ></Password>
                                        <small v-if="errors.confirm_password" class="p-error">{{ errors.confirm_password }}</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button type="submit" class="w-full border-0" style="background-color: rgb(30, 187, 215)" label="Next" />
                            </div>
                        </div>
                    </form>
                    <div v-if="showAlert" :class="[alertClasses]">
                        <p class="text-sm text-center" :class="[alertTextClasses]">{{ alertMessage }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

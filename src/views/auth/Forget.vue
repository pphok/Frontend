<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const route = useRoute();

const error = ref(false);
const errorMessage = ref('');
const formData = ref({
    email: ''
});
const errors = ref({
    email: undefined
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

    if (!formData.value.email) {
        errors.value.email = 'Email is required';
    } else {
        error.value = false;
        errorMessage.value = '';
        // Here you can navigate to the next page
        const store = useAuthStore();
        await store.ForgetPassword(formData.value);
        if (store.error) {
            showAlertMessage(store.error, 'error');
            return;
        }
        // Successful login
        showAlertMessage('Login successful', 'success');
        router.replace({
            path: route.query.to ? String(route.query.to) : '/verify-forget',
            query: {
                email: formData.value.email
            }
        });
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
                                    <InputText id="email" type="email" placeholder="Email address" class="input-text w-full" style="padding: 1rem" v-model="formData.email" aria-describedby="email-help" /> <br />
                                    <small v-if="errors.email" id="email-help" class="p-error">{{ errors.email }}</small>
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

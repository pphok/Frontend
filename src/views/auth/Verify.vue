<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const error = ref(false);
const errorMessage = ref('');
const router = useRouter();
const otp = ref('');
const formData = ref({
    email: '',
    verified_code: ''
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

const resend = async () => {
    const store = useAuthStore();
    let payload = ref({
        email: formData.value.email
    });
    await store.ResendVerifiedCode(payload.value);
};

const submitForm = async () => {
    error.value = false;
    errorMessage.value = '';
    if (!/^\d{6}$/.test(otp.value)) {
        error.value = true;
        errorMessage.value = 'Invalid code. Please enter a 6-digit number.';
    } else {
        // Reset error message if code is valid
        error.value = false;
        errorMessage.value = '';
        // Here you can navigate to the next page
        const store = useAuthStore();
        formData.value.verified_code = otp.value;
        await store.Verify(formData.value);
        if (store.error) {
            showAlertMessage(store.error, 'error');
            return;
        }
        // Successful login
        showAlertMessage('Login successful', 'success');
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
</script>

<template>
    <section class="py-10 bg-white sm:py-16 lg:py-24 h-screen mt-16">
        <div class="h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-content-center align-center" style="flex-direction: column">
            <img src="/layout/images/krukit-white.png" alt="Logo" class="w-1 h-auto mt-4 ml-8 fixed top-0 left-0" />
            <div class="max-w-2xl mx-auto text-center">
                <p class="text-1xl font-bold leading-tight text-black sm:text-2xl md:text-3xl mb-6">Verify 6-digit Code</p>
            </div>
            <div class="relative max-w-md mx-auto mt-4 md:mt-2">
                <!-- Adjusted margin top -->
                <div class="overflow-hidden rounded-md shadow-none">
                    <form @submit.prevent="submitForm">
                        <div class="space-y-3">
                            <!-- Adjusted space between elements -->
                            <div>
                                <div class="relative text-gray-400 focus-within:text-gray-600 mb-4">
                                    <InputOtp v-model="otp" integerOnly :length="6" />
                                    <p v-if="error" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
                                </div>
                            </div>
                            <div class="mb-4">
                                <p class="text-gray-500 text-sm">
                                    Doesn't receive the pass code?
                                    <a href="#" class="text-blue-600" @click="resend">Resend</a>
                                </p>
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

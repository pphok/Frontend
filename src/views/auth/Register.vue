<script setup>
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: 'male'
});

const errors = ref({});

const registrationSuccess = ref(false); // Flag to track registration success

const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

const submitForm = async () => {
    // Clear previous errors
    errors.value = {};

    // Validation
    if (!formData.value.first_name) {
        errors.value.first_name = 'First name is required';
    }
    if (!formData.value.last_name) {
        errors.value.last_name = 'Last name is required';
    }
    if (!formData.value.email) {
        errors.value.email = 'Email is required';
    } else if (!isValidEmail(formData.value.email)) {
        errors.value.email = 'Please enter a valid email address';
    }
    if (!formData.value.password) {
        errors.value.password = 'Password is required';
    } else if (formData.value.password.length < 8) {
        errors.value.password = 'Password must be at least 8 characters';
    }
    if (!formData.value.confirm_password) {
        errors.value.confirm_password = 'Please confirm your password';
    } else if (formData.value.password !== formData.value.confirm_password) {
        errors.value.confirm_password = 'Passwords do not match';
    }
    if (!formData.value.gender) {
        errors.value.gender = 'Please select your gender';
    }

    // If there are errors, set registrationSuccess to false
    if (Object.keys(errors.value).length > 0) {
        registrationSuccess.value = false;
    }

    // If there are no errors, submit the form
    if (Object.keys(errors.value).length === 0) {
        console.log('Checking...');
        // Submit logic here
        const store = useAuthStore();
        await store.Register(formData.value);
        if (store.error) {
            showAlertMessage(store.error, 'error');
            return;
        }
        console.log('Form submitted successfully');
        router.push('/verify');
        registrationSuccess.value = true;
    }
};

function isValidEmail(email) {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlertMessage(message, type) {
    showAlert.value = true;
    alertMessage.value = message;
    alertType.value = type;

    // Hide the alert after 3 seconds
    setTimeout(() => {
        hideAlertMessage();
    }, 3000);
}

function hideAlertMessage() {
    showAlert.value = false;
    alertMessage.value = '';
    alertType.value = '';
}

// Watch for changes in formData
// watch(
//     formData,
//     (newValue, oldValue) => {
//         // Reset registrationSuccess flag when form data changes
//         if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
//             registrationSuccess.value = false;
//         }
//     },
//     { deep: true }
// );
</script>

<template>
    <section>
        <div class="grid h-screen p-0 m-0">
            <div class="col-12 md:col-6 h-full">
                <img src="/layout/images/krukit-white.png" alt="Logo" class="w-2 h-auto mt-4 ml-8" />
                <div class="title">
                    <h2 class="text-2xl font-bold text-gray-900 justify-content-center flex">Register an Account</h2>
                    <form @submit.prevent="submitForm" class="login-form mt-5">
                        <div class="form-content p-fluid" style="width: 60%">
                            <!-- First name  -->
                            <InputText id="first-name" type="text" placeholder="First name" class="input-text w-full mt-4" style="padding: 1rem" v-model="formData.first_name" aria-describedby="first-name-help" /> <br />
                            <small v-if="errors.first_name" id="first-name-help" class="p-error">{{ errors.first_name }}</small
                            ><br />

                            <!-- Last name  -->
                            <InputText id="last-name" type="text" placeholder="Last name" class="input-text w-full mt-2" style="padding: 1rem" v-model="formData.last_name" aria-describedby="last-name-help" /> <br />
                            <small v-if="errors.last_name" id="last-name-help" class="p-error">{{ errors.last_name }}</small
                            ><br />

                            <!-- Email  -->
                            <InputText id="email" type="email" placeholder="Email address" class="input-text w-full mt-2" style="padding: 1rem" v-model="formData.email" aria-describedby="email-help" /> <br />
                            <small v-if="errors.email" id="email-help" class="p-error">{{ errors.email }}</small>

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

                            <!-- Gender  -->
                            <label for="gender" class="label font-bold">Gender</label>
                            <div class="flex mt-2">
                                <div class="flex items-center">
                                    <input type="radio" class="form-radio mr-1" v-model="formData.gender" value="male" />
                                    <label class="mr-2">Male</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="radio" class="form-radio mr-1" v-model="formData.gender" value="female" />
                                    <label class="mr-2">Female</label>
                                </div>
                                <div class="flex items-center">
                                    <input type="radio" class="form-radio mr-1" v-model="formData.gender" value="other" />
                                    <label>Other</label>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" label="Register" class="main-button pt-3 pb-3 mr-2 mb-4 mt-5"></Button>
                    </form>
                    <div v-if="showAlert" :class="[alertClasses]">
                        <p class="text-sm text-center" :class="[alertTextClasses]">{{ alertMessage }}</p>
                    </div>

                    <Divider layout="horizontal" style="width: 60%; margin-left: auto; margin-right: auto">
                        <b>OR</b>
                    </Divider>
                    <div class="login-form">
                        <Button class="google-button pt-3 pb-3 mr-2 mb-2 mt-5">
                            <div class="w-full google flex justify-content-center align-item-center">
                                <img src="/layout/images/google.svg" alt="Google" class="mr-2" width="20" />
                                Google
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6" style="background-color: #1ebbd7">
                <div class="flex flex-direction-vertical align-items-center justify-content-center" style="flex-direction: column; height: 100%">
                    <h1 class="register-text">Already have an account?</h1>
                    <Button class="register-btn" @click="$router.push('/login')"> Login </Button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.title {
    margin-top: 100px;
}
.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.main-button {
    font-size: 18px;
    width: 60%;
}
.google-button {
    background: white;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.205);
    border: none;
    color: grey;
    width: 60%;
}
.register-btn {
    background: white;
    width: 200px;
    padding-top: 15px;
    padding-bottom: 15px;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.205);
    border: none;
    color: black;
    font-weight: 700;
}
.register-text {
    color: white;
    text-align: center;
    margin-bottom: 30px;
}
h1.register-text {
    font-weight: 700;
    margin-bottom: 30px;
}
.input-text {
    background: rgb(218, 238, 239);
}
</style>

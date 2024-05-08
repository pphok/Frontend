<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { useAuthStore } from '@/store/auth';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    email: '',
    password: ''
});
const errors = ref({});
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

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

// const logoUrl = computed(() => {
//   return `/layout/images/${layoutConfig.darkTheme.value ? 'krukit-white' : 'krukit-dark'}.png`;
// });

const alertTextClasses = computed(() => {
    return {
        'text-green-800': alertType.value === 'success',
        'text-red-800': alertType.value === 'error'
    };
});

const submitForm = async () => {
    // Clear previous errors
    errors.value = {};

    // Validation
    if (!formData.value.email) {
        errors.value.email = 'Email is required';
    }
    if (!formData.value.password) {
        errors.value.password = 'Password is required';
    }

    // If there are no errors, simulate login
    if (Object.keys(errors.value).length === 0) {
        // Simulate login
        if (formData.value.email && formData.value.password) {
            const store = useAuthStore();
            await store.Login(formData.value);
            if (store.error) {
                showAlertMessage(store.error, 'error');
                return;
            }
            // Successful login
            showAlertMessage('Login successful', 'success');
            // Redirect to another page
            router.push('/');
        } else {
            // Failed login
            showAlertMessage('Invalid email or password', 'error');
        }
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
    <section>
        <div class="grid h-screen p-0 m-0">
            <div class="col-12 md:col-6 h-full">
                <img src="/layout/images/krukit-white.png" alt="Logo" class="w-2 h-auto mt-4 ml-8" />
                <div class="title">
                    <h2 class="text-2xl font-bold text-gray-900 justify-content-center flex">Login to Your Account</h2>
                    <form @submit.prevent="submitForm" class="login-form mt-5">
                        <div class="form-content p-fluid" style="width: 60%">
                            <!-- Email  -->
                            <InputText id="email" type="email" placeholder="Email address" class="input-text w-full mt-4" style="padding: 1rem" v-model="formData.email" aria-describedby="email-help" /> <br />
                            <small v-if="errors.email" id="email-help" class="p-error">{{ errors.email }}</small>

                            <!-- Password  -->
                            <div class="field p-fluid">
                                <Password
                                    id="password"
                                    v-model="formData.password"
                                    placeholder="Password"
                                    :feedback="false"
                                    :toggleMask="true"
                                    class="w-full input-text mt-4"
                                    :inputStyle="{ padding: '1rem', background: 'rgb(218, 238, 239)' }"
                                ></Password>
                                <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
                            </div>

                            <!-- Forget password  -->
                            <a href="/forget">
                                <small id="forget-password">Forget password?</small>
                            </a>
                            <br />
                        </div>
                        <Button type="submit" label="Login" class="main-button pt-3 pb-3 mr-2 mb-4 mt-5" style="width: 60%"></Button>
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
                    <h1 class="register-text">New Here?</h1>
                    <p class="register-text">Register and discover a great tools <br />that can assist your teaching!</p>
                    <Button class="register-btn" @click="$router.push('/register')"> Register </Button>
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
    font-size: 16px;
}
.google-button {
    width: 60%;
    background: white;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.205);
    border: none;
    color: grey;
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

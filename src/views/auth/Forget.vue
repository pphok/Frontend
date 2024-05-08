<!-- eslint-disable vue/multi-word-component-names -->

<script>
export default {
    data() {
        return {
            email: '',
            error: false
        };
    },
    methods: {
        submitForm() {
            if (this.validateEmail(this.email)) {
                // Navigate to another page or perform other actions
                console.log('Email is valid');
                // Example of navigating to another page

                this.$router.push('/digit');
            } else {
                this.error = true;
            }
        },
        validateEmail(email) {
            // Regular expression for email validation
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
};
</script>

<template>
    <section class="py-10 bg-white sm:py-16 lg:py-24 h-screen mt-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
                <p class="text-1xl font-bold leading-tight text-black sm:text-2xl md:text-3xl mb-4">Forget Password</p>
            </div>
            <div class="relative max-w-md mx-auto mt-8 md:mt-4">
                <div class="overflow-hidden rounded-md shadow-none">
                    <form @submit.prevent="submitForm">
                        <div class="space-y-5">
                            <div>
                                <div class="mt-4">
                                    <div class="relative text-gray-400 focus-within:text-gray-600">
                                        <input
                                            v-model="email"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            class="block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            style="background-color: rgb(218, 238, 239)"
                                        />
                                    </div>
                                    <p v-if="error" class="text-red-500 text-sm mt-1">Invalid email. Please try again.</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    class="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg focus:outline-none hover:bg-blue-700 focus:bg-blue-700 mt-4"
                                    style="background-color: rgb(30, 187, 215)"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        }
    }
};
</script>

<template>
    <header>
        <nav class="bg-white p-2">
            <div class="flex justify-between flex-wrap px-10">
                <div class="flex items-center flex-shrink-0 text-white mr-8">
                    <!--logo -->
                    <img src="../assets/logo.jpg" alt="Logo" class="h-10 justify-content-center" />
                </div>
                <!--button show mobile menu -->
                <div class="block lg:hidden">
                    <button @click="toggleMenu" class="flex items-center px-3 py-2 border rounded text-black border-gray-400 hover:text-black hover:border-black">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <!-- menu-->
                <div :class="{ hidden: !isOpen }" class="w-full block flex-grow lg:flex lg:w-auto">
                    <div class="text-md lg:flex-grow py-3">
                        <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-12">Home</router-link>
                        <router-link to="/price" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-12">Pricing</router-link>
                        <router-link to="/about" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-12">About Us</router-link>
                        <router-link to="/contact" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-12">Contact Us</router-link>
                    </div>
                    <!--button login and register -->
                    <div class="space-x-10">
                        <button class="text-gray-800 font-semibold rounded" @click="$router.push('/login')">Login</button>
                        <button class="@apply bg-blue-500 hover:bg-sky-700 text-white font-bold py-1 px-4 border border-blue-700 rounded" @click="$router.push('/register')">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
/* Component-specific styles here */
</style>

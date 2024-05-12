import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import $api from './me'




export const useAuthStore = defineStore('auth', {
    state: () => ({
        data: {},
        error: null,
        loading: false
    }),
    actions: {
        async login(data) {
            this.loading = true;
            try {
                const res = await $api.post('/auth/login', data);
                this.data = res.data;
                if(res.data?.data?.user_id !== 'ab755693-639a-4340-983c-419e2c951e03')
                {
                    throw new Error('Invalid user');
                }
                this.loading = false;
                const exp = new Date();
                Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error.response.data.message || error.message;
                this.loading = false;
                throw error;
            }
        },
        logout() {
          // Remove the token from the cookie
          Cookies.remove('token');
          // Reset the user data in the store
          this.data = {};
        },
        async register(data) {
            this.loading = true;
            try {
                const res = await $api.post('/auth/register', data);
                this.data = res.data;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async verify(data) {
            this.loading = true;
            try {
                const res = await $api.post('/auth/verify', data);
                this.data = res.data;
                this.loading = false;
                const exp = new Date();
                Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        }
    }
});


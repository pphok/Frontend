import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import $api from '..';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        data: {},
        error: null,
        loading: false
    }),
    actions: {
        async Login(data) {
            this.loading = true;
            try {
                const res = await $api.post('/auth/login', data);
                this.data = res.data;
                this.loading = false;
                const exp = new Date();
                Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async Register(data) {
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
        async Verify(data) {
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
        },
        async Logout() {
            Cookies.remove('token');
        }
    }
});

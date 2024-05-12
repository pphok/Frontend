import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import $api from '..';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        data: null,
        error: null,
        loading: false
    }),
    actions: {
        async Login(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                const res = await $api.post('/auth/login', payload);
                this.data = res.data?.data?.user;
                this.loading = false;
                const exp = new Date();
                let userStr = JSON.stringify(res.data?.data?.user);
                Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
                Cookies.set('user', userStr, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async LoginWithGoogle() {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                // const res = await $api.get('/auth/google/login');
                window.location.href = 'http://localhost:3000/api/v1/auth/google/login';
                // this.data = res.data?.data?.user;
                // this.loading = false;
                // const exp = new Date();
                // let userStr = JSON.stringify(res.data?.data?.user);
                // Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
                // Cookies.set('user', userStr, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async Register(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                const res = await $api.post('/auth/register', payload);
                this.data = res.data?.data;
                const exp = new Date();
                let userStr = JSON.stringify(res.data?.data?.user);
                Cookies.set('user', userStr, { expires: exp.setDate(exp.getDay + 180) });
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async Verify(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                let user = Cookies.get('user');
                let u = JSON.parse(user);
                payload.email = u.email;
                const res = await $api.post('/auth/verify', payload);
                this.data = res.data;
                this.loading = false;
                const exp = new Date();
                Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async VerifyForget(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                const res = await $api.post('/auth/verify', payload);
                this.data = res.data;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async ForgetPassword(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                this.error = '';
                const res = await $api.post('/auth/forget-password', payload);
                this.data = res.data;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async ResendVerifiedCode(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                const res = await $api.post('/auth/resend-verified-code', payload);
                this.data = res.data;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async ChangePassword(payload) {
            this.loading = true;
            try {
                this.error = null;
                this.data = null;
                const res = await $api.post('/auth/change-forget-password', payload);
                this.data = res.data;
                this.loading = false;
                const exp = new Date();
                let userStr = JSON.stringify(res.data?.data?.user);
                Cookies.set('token', res.data?.data?.token, { expires: exp.setDate(exp.getDay + 180) });
                Cookies.set('user', userStr, { expires: exp.setDate(exp.getDay + 180) });
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async Logout() {
            this.error = null;
            this.data = null;
            Cookies.remove('token');
            Cookies.remove('user');
        }
    }
});

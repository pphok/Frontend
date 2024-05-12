import $api from '..';
import { defineStore } from 'pinia';

export const useMeStore = defineStore('me', {
    state: () => ({
        data: {},
        error: null,
        loading: false
    }),
    actions: {
        async Me() {
            this.loading = true;
            try {
                const res = await $api.get('api/me');
                this.data = res.data;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        }
    }
});

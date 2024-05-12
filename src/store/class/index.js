import $api from '..';
import { defineStore } from 'pinia';

export const useClassRecordStore = defineStore('classRecord', {
    state: () => ({
        data: {},
        meta: {},
        error: null,
        loading: false
    }),
    actions: {
        async GetAll(page, pageSize) {
            this.loading = true;
            try {
                this.error = null;
                const res = await $api.get('/class-record', {
                    params: {
                        page: page ?? 1,
                        limit: pageSize ?? 10
                    }
                });
                this.data = res.data?.data;
                this.meta = res.data?.meta;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async GetById(id) {
            this.loading = true;
            try {
                const res = await $api.get(`/class-record/${id}`);
                this.data = res.data;
                this.loading = false;
            } catch (error) {
                this.error = error;
                this.loading = false;
            }
        },
        async CreateOrUpdate(record) {
            this.loading = true;
            try {
                const res = await $api.post('/class-record', record);
                this.$state.data = res.data?.data;
                this.$state.loading = false;
            } catch (error) {
                this.$state.error = error;
                this.$state.loading = false;
            }
        }
    }
});

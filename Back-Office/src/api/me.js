import adminApi from './adminApi';

export const me = {
  async getMe() {
    try {
      const response = await adminApi.get('/me');
      console.log("ME:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add more user-related functions like getUserById, createUser, etc.
};
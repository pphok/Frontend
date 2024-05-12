import adminApi from './adminApi';

export const userService = {
  async getAllUsers() {
    try {
      const response = await adminApi.get('/user?limit=100&page=');
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async createUser(userData) {
    try {
      const response = await adminApi.post('/user', userData);
      console.log("Create User Response:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async updateUserStatus(userId, status) {
    try {
      const response = await adminApi.post(`/user`, { id: userId, status });
      console.log("Sending data:", { id: userId, status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add more user-related functions like getUserById, createUser, etc.
};
import axios from 'axios';

// יצירת מופע חדש של axios עם כתובת ה-API כ-default
const api = axios.create({
  baseURL: "mysql://u2hn8nwm2a2rsuop:0XUBSEu6tuNTjSCSnmbq@bzi5sn6ayqf3x9ikieor-mysql.services.clever-cloud.com:3306/bzi5sn6ayqf3x9ikieor"
});

// הוספת interceptor לשגיאות
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await api.get(`/todos`);    
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const response = await api.post(`/todos`, { name, isComplete: false });
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete, name) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const response = await api.put(`/todos/${id}`, {
        Name: name,
        IsComplete: isComplete
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
import { api } from "../services/httpService.js";

const getUser = async (email) => {
  try {
    //TODO 
    const response = await api.get(`/users/profile/${email}`);
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/* const saveUser = async (user) => {
  try {
    //TODO 
    const response = await api.post(`/users`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}; */

const getUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const userService = {
  getUser,
  getUsers,
};

export default userService;

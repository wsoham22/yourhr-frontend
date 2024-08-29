import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signupUser = async (data) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    const response = await axios.post(`${API_URL}/auth/signup`, formData);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
};

export const getUserProfile = async () => {
    const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const updateUserProfile = async (data) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    const response = await axios.patch(`${API_URL}/user/profile`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

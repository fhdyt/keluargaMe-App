import axios from 'axios';
import { AsyncStorage } from 'react-native';

let url;
if (__DEV__) {
  // url = 'http://d1ba58240a7d.ngrok.io';
  url = 'https://api-huawei.zte.my.id';
} else {
  url = '';
}

const instance = axios.create({
  baseURL: url,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;

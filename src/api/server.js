import axios from 'axios';
import { AsyncStorage } from 'react-native';

let url;
if (__DEV__) {
  url = 'http://745ea6e401cb.ngrok.io';
  // url = 'https://limitless-temple-57596.herokuapp.com';
} else {
  url = '';
}

const instance = axios.create({
  baseURL: url,
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

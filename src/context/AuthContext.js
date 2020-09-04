import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login_error':
      return { ...state, loginError: action.payload, loading:false, };
    case 'signin':
      return { loginError: false, token: action.payload };
    case 'loading':
      return { loading: action.payload, loginError:false };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await serverApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });

    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ phone, password }) => {
  try {
    const response = await serverApi.post('/signin', { phone, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
    navigate('Home');
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'login_error',
      payload: true
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

const loading = dispatch => async () => {
  dispatch({ type: 'loading', payload:true });
};


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, tryLocalSignin, loading },
  { token: null, loginError:false, loading:false }
);

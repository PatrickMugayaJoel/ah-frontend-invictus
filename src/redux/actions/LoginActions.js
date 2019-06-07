import { toast } from 'react-toastify';
import axios from 'axios';
import { loginTypes } from './types';
import { loginUrls } from './loginUrl';


export const loginAction = (userData, props) => dispatch => {
  return axios.post(loginUrls.LOGIN_URL, userData)
    .then(response => {
      toast.success('Logged In Successfully', 'success', 4000);
      localStorage.setItem("user_token", response.data.user.token);
      dispatch({
        type: loginTypes.LOGIN_SUCCESS,
        payload: response.data.user
      });
      props.history.push('/');
    })
    .catch(error => {
      toast.error('No user with that email or password', 'error', 4000);
      dispatch({
        type: loginTypes.LOGIN_FAILURE,
        payload: error
      });
    });
};

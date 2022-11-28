import axios from 'axios';
import { API_URL } from '../Common/Common';




const Login = (id, password) => {
  return axios.post(API_URL + "/user/signin", {
   id,
   password,
  })
  .then((response) => {
    if (response.data.message === "successful") {
      localStorage.setItem( 'token', response.data.token);
      alert("로그인 되었습니다.")
    }
    return response.data;
  });
};


const signup = (id, password, name) => {
  return axios.post(API_URL + "/POST/user", {
    id,
    password,
    name,
  })
  .then((response) => {
    if (response.data.message === "successful") 
    return response.data;
  });
};

const logout = () => {
  //Object.isFrozen(UserObject);
  localStorage.removeItem('token');
}

const getCurrentUser = () => {
  return localStorage.getItem("token");
};

const AuthService = {
  Login,
  signup,
  logout,
  getCurrentUser
};

export default AuthService;
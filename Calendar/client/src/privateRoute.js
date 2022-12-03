import React from 'react';
import {Navigate} from 'react-router-dom';
import AuthService from './service/auth';
import axios from 'axios';

function PrivateRoute({component:Component, status:Status}){
    let result;
    let check = false;
    let access = AuthService.getCurrentUser();

    if(access){
        console.log("fff");
        check = true; 
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    };

    console.log("PrivateRoute"+ check)

    if(check){ //토큰값이 있을때
        result = Component; // 상태값을 담아줌. 
    }else{
        result = !Status ? result = <Navigate to='/'/> : result = Status; //onepage에 가기위한. 
    }
    return result;
}
export default PrivateRoute;
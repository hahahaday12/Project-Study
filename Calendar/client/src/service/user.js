import {React} from 'react';
import { useRecoilState} from 'recoil';
import UserName from '../Layout/user'
import axios from 'axios';
import { userState } from '../recoil/user';
import AuthService from './auth';


const Usertitle = () => {
  const [users, setUsers] = useRecoilState(userState);
    axios.get("http://kai.dahyeon.us:10200/user")
      .then(response => {
      console.log(response.data)
      setUsers(response.data.data.user.name);
      },(error) => {
        AuthService.logout();
        });
        return(
          <>
          <UserName users={users}/>
          </>       
        )
};
export default Usertitle;
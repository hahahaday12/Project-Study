import { useState} from 'react'
import styled from 'styled-components'
import { useNavigate} from 'react-router-dom'
import AuthService from '../../service/auth'




const LoginInput = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
  
      const navigator = useNavigate();
      const useHandleLogin = async (e) => {
      
        e.preventDefault();
          try {
          await AuthService.Login(email, password)
          .then(
            (response) => {
              //navigator("/");
              window.location.reload();
            },
            (error) => {
              console.log('error', error.response);
              alert(" 아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.");
            }
          );
        } catch (error) {
          console.log(error)
        };
    };

    return(
      <>
        <LoginForm>
          <div>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              autoComplete="on"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)}}
              />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              autoComplete="on"
              value={password}
              onChange={(e) => {
              setPassword(e.target.value)}}
              />
          </div>
        </LoginForm>
            <InerButton
            onClick={useHandleLogin}
              >로그인
            </InerButton>
      </>    
    );
};

export default LoginInput;

const LoginForm = styled.div`
  max-width: 56rem;
  max-height: 18.75rem;
  width: 600px;
  height: 220px;
  text-align: center;
  right: 100px;
  position: relative;
  margin-top: 100px;

   & input {
    box-sizing: border-box;
    width: 410px;
    margin-bottom: 30px ;
    border: none;
    border-bottom: 4px solid #afafaf;
    font-size: 0.875rem;
    top:200px;
    height: 65px;
    background-color: white;
    border-radius: 20px;
  }

    & input::placeholder {
    font-size: 25px;
    color: #ccc;
  }

  & input:focus {
    outline: none;
    border: 1px solid #7784cc;
    box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
  }
`


const InerButton = styled.button`
    width: 410px;
    height: 70px;
    border-radius: 15px;
    //background-color: #545454;
    background: rgb(247,150,192);
background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;

   
    color: white;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    margin: 0 auto;
`
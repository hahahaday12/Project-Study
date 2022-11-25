import styled from 'styled-components';
import {useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  PwCheck, emailCheck} from '../../Common/Common.js'

const Joininput = () => {
 
const navigate = useNavigate();
  // 이름 , 비밀번호, 이메일 , 비밀번호 확인 
const [email, onChangeUserEmail] = useState("");
const [name, onChangeUserName] = useState("");
const [password, onChangeUserPasswrod] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  //비밀번호 유효성 검사 
const [passwordCheck, setPasswordCheck] = useState(false);

  const onChangeConfirmPassword = useCallback((e) => {
  setConfirmPassword(e.target.value);
  setPasswordCheck(e.target.value !== password);
},[password]);


  const onSignHandler = useCallback((e) => {
  const statusCheck = false;

  if (!emailCheck(email)) {
    if (!alert('이메일 형식이 일치하지 않습니다')) {
      //onChangeUserEmail('');
      return statusCheck;     
    }
  }

  if (name == null || name === "") {
    alert("이름을 입력해주세요.");
    return statusCheck;
  }

  if (!PwCheck(password)) {
    if (!alert('비밀번호 형식이 일치하지 않습니다.(대문자, 소문자, 특수문자 포함)')) {
      //setPasswordCheck('');
      return statusCheck;
    }
  }
  return true;
});

    return(
        <>
        <JoinFrom>
          <div>
            <input
              type="text"
              placeholder="이메일을 입력하세요"
              autoComplete="off"
              value={email}
              onChange={onChangeUserEmail}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              autoComplete="off"
              value={name}
              onChange={onChangeUserName}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="비밀번호를 입력하세요"
              autoComplete="off"
              value={password}
              onChange={onChangeUserPasswrod}
            />
          </div>
          <div>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            autoComplete="off"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          </div>
           {confirmPassword && passwordCheck && (
            <CheckMessage>비밀번호가 일치하지 않습니다.</CheckMessage> )} 

          <button
          
          ><It>가입하기</It></button>

          <Linkbox>
          <Link to="/"><Pt>돌아가기</Pt></Link>
          </Linkbox>

        </JoinFrom>
        </>
      );
};
export default Joininput;

const JoinFrom = styled.div`
  box-sizing: border-box;
  max-width: 56rem;
  max-height: 18.75rem;
  width: 600px;
  height: 300px;
  margin: 30px;
  text-align: center;

  & input {
    box-sizing: border-box;
    border-radius: 15px;
    width: 410px;
    margin-bottom: 30px ;
    border: none;
    border-bottom: 4px solid #afafaf;
    font-size: 0.875rem;
   
    top:200px;
    height: 65px;
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

  & button {
    box-sizing: border-box;
    width: 410px;
    height: 70px;
    margin: 0.2rem;
    padding: 0.3rem 0;
    border: none;
    font-size: 0.875rem;
    color: white;
    background: #8D72E1;
    border-radius: 15px;
    cursor: pointer;
  }
  & button:hover {
    background: #6C4AB6;
  }
  & a {
    display: block;
    font-size: 0.775rem;
    color: #666;
  }
`;

const CheckMessage = styled.p`
  width: 50%;
  margin: 0 auto;
  font-size: 0.875rem;
  color: red;
  text-align: left;
`;

const Linkbox = styled.div`
  margin-left: 150px;
  width: 150px;
  height: 100px;
  background-color: #8D9EFF;
  text-decoration: none;
  display: flex;
  position: absolute;
  margin-top: 20px;
`
const It = styled.div`
  font-size: 30px;
  margin-bottom: 2px;
`
const Pt = styled.div`
  font-size: 30px;
  text-decoration: none;
  color: white;
`




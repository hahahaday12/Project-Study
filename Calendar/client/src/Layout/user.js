 import styled from 'styled-components';
 import React from 'react';

const UserName = ({ users }) => {
    console.log(users)
    return (
      <Userbox>
      <P>💕{users}님 환영합니다.</P>
      </Userbox>
    );
};
export default UserName;

const Userbox = styled.div`
  width: 450px;
  height: 50px;
  border-radius: 30px;
  background-color: white;
  font-size: 40px;
  display: flex;
  position: relative;
  text-align: center;
  /* left: 100px; */
`
const P = styled.div`
  width: 600px;
  text-align: center;
  font-size: 30px;
  font-family: "Gaegu", serif;
`
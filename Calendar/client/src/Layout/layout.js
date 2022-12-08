import React from 'react'
import styled from 'styled-components';
import "../font/font.css"
import { Link } from 'react-router-dom';
import AuthService from '../service/auth';
import Usertitle from '../service/user';
import Sidebar from './sideBar';

const Layout = ({ children }) => {
    const logOut = () => {
    AuthService.logout();
  }

    return(
    <> 
        <ALL>
            <LeftContainer>
                <Link to="/">
                    <img src= './img/Life Calander_logo.png' alt="logoimg"/>
                    <p>Life</p>
                    <p>Calendar</p>
                </Link>
            <NavWrap>
                <Sidebar/>
            </NavWrap>
            </LeftContainer>
            <HeaderBox>
                <Usertitle/>
                    <LogoutBox>
                        <p><a href='/'onClick={logOut}>Logout</a></p>
                    </LogoutBox>
            </HeaderBox>
            <RightContainer>
                <div className="content"> {children} </div>
            </RightContainer>
        </ALL>
    </>
    )
};
export default Layout;

// 전체적으로 들어가야할  공통 레이아웃 
const ALL = styled.div`
    width: 1920px;
    height: 1080px;
    display: flex;
    border: 1px solid aqua;
    /* background-color: aliceblue; */
    
background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

`
const HeaderBox = styled.div`
    width: 600px;
    position: relative;
    display: flex;
    //background-color: yellow;
    height: 60px;
    left: 540px;
    top: 60px;
`
const LogoutBox = styled.div`
  width: 100px;
  height: 50px;
  font-size: 18px;
  color: darkgray;
  background-color: white;
  border-radius: 25px;
  display: flex;
  position: relative;
  margin-left: 60px;

    & a{
        text-decoration: none;
        margin-left: 20px;

    }

`
const LeftContainer = styled.div`
    width: 300px;
    height: 1080px;
    border: 1px solid aqua;
    font-family: 'SB 어그로 L';
    color: #545454; 
    background-color: #8D9EFF;
    position: relative;
    //left: 50px;
    

    & a {
        text-decoration: none;
        /* color: #545454; */
    }
    & img {
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 auto;
        margin-top: 140px;
    }
    & p {
        text-align: center;
        line-height: 2px;
    }
`

const NavWrap = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
`


const RightContainer = styled.div`
    width: 900px;
    height: 900px;
    justify-content: center;
    //background-color: #F4F4F4;
    position: relative;
    right: 200px;
    top: 150px;

`
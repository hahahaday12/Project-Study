import React from 'react'
import LoginInput from './loginInput'
import LogoIner from './logoimg'
import Join from './joinbutton'
import styled from 'styled-components'

const Onepage = () => {
    return(
        <>
            <Allwrap>
                <Centerwrap>
                    <LogoIner/>
                    <LoginInput/>
                    <Join/>
                </Centerwrap>
            </Allwrap>
        </>
    )
};
export default Onepage;

const Allwrap = styled.div`
    width: 1920px;
    height: 1080px;
    margin: 0 auto;
    border: 1px solid aqua;
    background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
`

const Centerwrap = styled.div`
    width: 410px;
    height: 1080px;
    margin: 0 auto;
`

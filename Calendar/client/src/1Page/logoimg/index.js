import styled from 'styled-components';


const LogoIner = () => {
    return(
        <>
            <Img alt='logoimg' src='./img/Life Calander_logo.png'/>
            <P>Life Clendar</P>
        </>
    )
}
export default LogoIner;

const Img = styled.img`
    width: 280px;
    height: 280px;
    display: block;
    margin: 0 auto;
    margin-top: 150px;
`

const P = styled.p`
    font-size: 28px;
    color: #545454;
    text-align: center;
`




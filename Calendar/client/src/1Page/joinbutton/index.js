import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Join = () => {
    return(
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/twopage">
            <LoginText>회원가입</LoginText> 
        </Link>
    )
}

export default Join;


const LoginText = styled.div`
    font-size: 24px;
    text-align: right;
    color: #afafaf;
    margin-top: 10px;
`
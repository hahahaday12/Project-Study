
import styled from 'styled-components';
import Title from './header/title';
import Joininput from './join/input';
import ImgLayout from '../2Page/layout';

const TwoPage = () => {
    return(
        <>
        <TLayout>
            <Tbox>
                <ImgLayout/>
                <Joincontainer>
                    <Title/>
                    <Joinbox> 
                        <Joininput/>
                    </Joinbox>
                </Joincontainer>
            </Tbox>
        </TLayout>
        </>
    )
};
export default TwoPage;

const TLayout = styled.div`
    width: 1920px;
    height: 1080px;
    display: flex;
    border: 1px solid aqua;
    margin: 0 auto;
    background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
`
const Tbox = styled.div`
    width: 300px;
    height: 1080px;
    border: 1px solid aqua;
    font-family: 'SB 어그로 L';
    /* background-color: yellow; */
     background-color: #8D9EFF;
    color: #545454;

    & a {
        text-decoration: none;
        color: #545454;
    }

    & img {
        width: 80px;
        height: 80px;
        display: block;
        margin: 0 auto;
        margin-top: 150px;
        margin-bottom: 40px;
    }

    & p {
        text-align: center;
        line-height: 2px;
    }
`



const Joincontainer = styled.div`
    width: 600px;
    height: 1070px;
    position: absolute;
    display: flex;
    background-color: #8D9EFF;
    top: 10px;
    left: 900px;
`
const Joinbox = styled.div`
    width: 400px;
    height: 500px;
    display: flex;
    background-color: #8D9EFF;
    z-index: 30;
    left: 70px;
    top: 300px;
    position:absolute;
`
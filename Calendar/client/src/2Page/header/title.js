import styled from 'styled-components';

const Title = () => {
    return(
        <>
  
        <Titlebox>
            <Inertext>Join</Inertext>
        </Titlebox>
      
        </>
    )
}
export default Title;

const  Titlebox = styled.div`
    width: 200px;
    height: 100px;
    background-color: #8D9EFF;
    display: flex;
    position: absolute;
    margin: 0 auto;
    z-index: 20;
    top: 70px;
    left: 200px;
`

const Inertext = styled.div`
    font-size: 80px;
    margin-left: 50px;
    color: white;
`


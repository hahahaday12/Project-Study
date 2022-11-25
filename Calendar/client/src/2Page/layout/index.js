import styled from 'styled-components';

const ImgLayout = () => {
  return(
    <>
      <Imgbox>
        <img alt='logoimg' src= './img/Life Calander_logo.png'/>
        <p>Life</p>
        <p>Calendar</p>
      </Imgbox>
    </>
  )
};
export default ImgLayout;

const Imgbox = styled.div`
  width: 150px;
  height: 200px;
  margin-left: 80px;
  & p{
    color: white;
  }
`
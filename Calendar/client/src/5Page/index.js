import styled from 'styled-components';
import Layout from "../Layout/layout"
import ColorForm from "./components/colorForm";


const Fivepage = () => {
  return (
    <>
      <Layout>
        <DiaryContainer>
          <ColorForm/>
        
        </DiaryContainer>
      </Layout>
    </>
  )
};
export default Fivepage;

const DiaryContainer = styled.div`
  width: 800px;
  height: 920px;
  //background-color: yellowgreen;
  position: relative;
  left: 50px;
`
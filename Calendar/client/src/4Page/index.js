import Layout from "../Layout/layout"
import BuketList from "./buketlist/buket"
import styled from "styled-components";


const Fourpage = () => {
  return (
    <>
      <Layout>
        <ListWrap>
          <BuketList/>
        </ListWrap>
      </Layout>
    </>
  )
};
export default Fourpage;


const ListWrap = styled.div`
  width: 1300px;
  height: 700px;
  display: flex;
  //background-color: blue;
  position: relative;
  justify-content: space-between;
  right: 250px;
`
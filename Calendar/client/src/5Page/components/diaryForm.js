import {useState, forwardRef} from 'react';
import styled from 'styled-components';
import DatePicker from"react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './diary.css'


const DiaryForm = () => {

  const [ViewData, setViewData] = useState({
     id:""
    ,title:""
    ,content:""
    ,date:""
    ,color:""
  })

  const {title, content, date, color } = ViewData;

  const DatePick = forwardRef(({ value, onClick }, ref) => (
    <Datebutton className='custom-btn'
      onClick={onClick} ref={ref}>
        {value}
    </Datebutton> ));

  return(
    <>
    <AllDiaryBox>
      <PostTitle>
        <Datebox>
        <DatePicker
          value={date}
          dateFormat="yyyy-MM-dd"
          selected={ViewData.date}
          onChange={(date) => setViewData({
          ...ViewData,
          'date': date
          })}
          customInput={<DatePick/>}
          />
          </Datebox>
      </PostTitle>
    </AllDiaryBox>
    </>
  )

}
export default DiaryForm;

const AllDiaryBox = styled.div`
  width: 800px;
  position: relative;
  height: 800px;
  z-index: 10;
`
const PostTitle = styled.div`
  width: 670px;
  height: 50px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: end;
  margin-bottom: 10px;
  left: 10px;
`
const Datebox = styled.div`
  width: 140px;
  height: 40px;
  //background-color: yellow;
  position: relative;
  display: flex;
  right: 70px;
`

const Datebutton = styled.div`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: #8D72E1;
  color: white;
  :hover{
    background-color: #8D9EFF;
  }

`
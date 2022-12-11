import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faXmark  } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef, useEffect} from 'react';
import { API_URL } from '../../Common/Common';
import styled from "styled-components";
import DatePicker from "react-datepicker";
import axios from 'axios';


const BuketList = () => {
const [Viewcontent, setViewcontent] = useState([]);
 const [ViewData, setViewData] = useState({
    content:""
    ,date:""
  });

  const search = () => {
    axios.get(API_URL+ '/bucketlist')
    .then((response) => {
    setViewcontent(response.data.data);
    });
  };

const {title, content, date } = ViewData;

const DatePick = forwardRef(({ value, onClick }, ref) => (
    <Datebutton className='custom-btn'
      onClick={onClick} ref={ref}>
        {value}
    </Datebutton> ));
 useEffect(()=> {
    setViewData({
       date:new Date()
    })
    search();
  },[]);

  const RemoveBuketList = (idx) => {
    window.confirm("삭제하시겠습니까?");
    axios.delete(API_URL +'/bucketlist/' + idx,{
  }).then((response) => { 
    console.log(response);
    if(response.data.message === "successful"){
      alert('삭제완료');
      search();
    } else {
      alert('다시 선택해 주세요');
    }
  });
  };

   const getChangeBuket = (e) => {
    const{name, value} = e.target;
    console.log(name,value);
    setViewData({
      ...ViewData,
      [name]: value
    });
  };

  const submitBuket = () => {
    axios.post(API_URL+'/bucketlist', {
           title: "test"
          ,content: ViewData.content
          ,date: ViewData.date
        }).then((response) => {
          alert('완료');
          setViewData({
          title: "test"
          ,content:""
          ,date:new Date()
        })
        search();
    });
};

  return(
    <>
      <BurketWhiteBox>
        <div className="buketWrap">
          <div className="dateBox">
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
          </div>
          <p className="burketText">Burket List</p>
          
          <BukerInputWrap>
            <input
              type="text"
              placeholder="버킷리스트를 추가해 주세요"
              onChange={getChangeBuket}
              name='content'
              value={content}
            />
            <FontAwesomeIcon 
            className="faPlus" 
            icon={faPlus}
            onClick={submitBuket}
            />
          </BukerInputWrap>
        </div>
            {Viewcontent.map((item) => (
            <Buket>
              <div className='buketinner'>
                {item.content}
              </div>
              <div className="iconBox">
                <FontAwesomeIcon className="penIcon" icon={faPen}/>
                <FontAwesomeIcon className="XIcon" 
                icon={faXmark}
                onClick={(e) => RemoveBuketList(item._id, e)}
              />
              </div>  
            </Buket>
          ))};
      </BurketWhiteBox>
    </>
  );
};
export default BuketList;

const BurketWhiteBox = styled.div`
  width: 400px;
  height: 630px;
  padding: 35px;
  margin-left: 40px;
  background-color: white;
  & .buketWrap {
    margin: 0 auto;
    margin-bottom: 20px;
  }
  & .dateBox {
    width: 177px;
    height: 42px;
    margin: 0 auto;
    display: flex;
    position: relative;
    left: 30px;
  }
  & .burketText {
    text-align: center;
    font-size: 18px;
    font-family: 'SB 어그로 M';
    color: #FFCCCC;
  }
`
const Datebutton = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: pink;
  color: white;
  :hover{
    background-color: #8D9EFF;
  }
`

const BukerInputWrap = styled.div`
  width: 256px;
  height: 22px;
  display: flex;
  margin: 30px auto 50px auto;
  & p {
    font-size: 18px;
    color: #FFCCCC;
    font-family: 'SB 어그로 M';
    margin: 0;
  }
  & input {
    width: 220px;
    border: none;
    font-family: 'SB 어그로 L';
    border-bottom: 1px solid #474747;
    margin-right: 15px;
    padding-left: 10px;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #AFAFAF;
    }
  }
  & .faPlus {
    color: white;
    background-color: #FFCCCC;
    border-radius: 20px;
    width: 18px;
    height: 18px;
    padding: 3px;
  }
`

const Buket = styled.div`
  width: 310px;
  background-color: #FFCCCC;
  height: 60px;
  margin-top: 13px;
  display: flex;
  position: relative;
  left: 45px;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;

    & .buketinner{
    width: 150px;
    height: 60px;
    //background-color: yellow;
    display: flex;
    align-items: center;
    position: relative;
    left: 60px;
    color: white;
    font-size: 18px;
  }; 

    &.iconBox {
      width: 60px;
      height: 30px;
      display: flex;
      align-items: center;
      //background-color: blue;
      color: white;
      gap: 15px;

      .penIcon {
        width: 15px;
        height: 15px;
      };
      .XIcon {
        width: 17px;
        height: 17px;
      };
    };
`
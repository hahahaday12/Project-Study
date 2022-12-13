import { useState, forwardRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark, faPlus} from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { API_URL } from '../../Common/Common';
import axios from 'axios';

const TodoListForm = () => {
const [ ,setBtnStatus] = useState(false);
const [ViewTodo, setViewTodo] = useState([]);
const [Todolist, setTodoList] = useState({
  content:""
  ,date:""
  ,status: "todo"
});
const { content } = Todolist;

//get
//todo?year=2022&month=12

const [taskStatus, ] = useState({
  todo: {
    name: "Todo",
    items: []
  },
  done: {
    name: "Done",
    items: []
  }
});

const [columns, setColumns] = useState(taskStatus);

useEffect(()=> {
  console.log(JSON.stringify(ViewTodo));
  setColumns({
    ...columns,
    'todo': {
      items: ViewTodo
    }
  });
  
},[ViewTodo]);

const DatePick = forwardRef(({ value, onClick }, ref) => (
  <Datebuttonn className='custom-btn' onClick={onClick} ref={ref}> {value} </Datebuttonn> ));
  
  useEffect(()=> {
    setTodoList({
    date:new Date()
    });
    Todo();
  },[]);

const getChangeTodo = (e) => {
  const{name, value} = e.target;
  console.log(name,value);
  setTodoList({
    ...Todolist,
    [name]: value
  })
};

const Todo = () => {
  axios.get(API_URL+ '/todo')
  .then((response) => {
    setViewTodo(response.data.data);
    setColumns({
    ...columns,
    'todo': {
      items: ViewTodo
    }
  });
  console.log(JSON.stringify(taskStatus))
  })
};

const RemovetodoList = (idx) => {
  if(window.confirm("삭제하시겠습니까?")){
  axios.delete(API_URL +'/todo/' + idx,{
    }).then((response) => { 
      console.log(response);
    if(response.data.message === "successful"){
      alert('삭제완료');
      Todo();
      setBtnStatus(false);
    } else {
      console.error(response.data.message);
    }
  });
} else{
        alert("취소 되었습니다.")
      }
};


const onClickTodo = () => {
  axios.post(API_URL+'/todo', {
    title: "test"
    ,content: Todolist.content
    ,date: Todolist.date
    ,status:"todo"
  }).then((response) => {
    alert('완료');
    setTodoList({
      title: "test"
      ,content:""
      ,date:new Date()
      ,status:"todo"
    })
    Todo()
  });
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
      });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};
  
  return (
    <>
      <TodoAllContainer>
        <div className="dateWrap">
          <div className="dateBox">
            <DatePicker
              value={Todolist}
              dateFormat="yyyy-MM-dd"
              selected={Todolist.date} 
              onChange={(date) => setTodoList({
              ...date,
              'date': date
              })}
              customInput={<DatePick/>}
            />
          </div>
        </div>
        <TodoInputWrap>
        <p>Todo List</p>
          <input
            type="text"
            placeholder="할 일을 추가해주세요"
            onChange={getChangeTodo}
            name='content'
            value={content}
          />
          <FontAwesomeIcon 
          className="faPlus" 
          icon={faPlus}
          onClick={onClickTodo}
          />
        </TodoInputWrap>
        <TodoListAllWrap>
          <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
          <TodoWrap key={columnId}> 
            <H2>{columnId}</H2>
            {/* <h2>{column.name}</h2> */}
            <div style={{ margin: 8}}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                  <TodoListBox
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                        background: snapshot.isDraggingOver
                        ? "#B1AFFF"
                        : "#7A90E2",
                    }}>
                        {column.items.map((item, index) => {
                      return(
                      <Draggable
                        key={item._id}
                      // 여기 아래 {item.id} 값을 수정 
                        draggableId={item._id}
                        index={index}
                      >
                      {(provided, snapshot) => {
                        return (
                        <TodooContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            backgroundColor: snapshot.isDragging
                            ? "#EDEDED"
                            : "white",
                            color: "#7A90E2",
                            ...provided.draggableProps.style
                          }}
                          >
                          <TodoInner>
                            {item.content}
                            <IconBoxx>
                            <FontAwesomeIcon className="penIcon" icon={faPen}/>
                            <FontAwesomeIcon className="XIcon" icon={faXmark}
                            onClick={(e) => RemovetodoList(item._id, e)}/>
                            </IconBoxx>
                          </TodoInner>
                        </TodooContainer>
                        );
                      }}
                      </Draggable>
                      );
                    })}
                      {provided.placeholder}
                  </TodoListBox>
                  );
                }}
              </Droppable>
            </div>
          </TodoWrap>
        );
        })}
          </DragDropContext>
        </TodoListAllWrap>  
      </TodoAllContainer>
    </>
  )
};
export default TodoListForm;

const TodoAllContainer = styled.div`
  width: 650px;
  height: auto;
  padding: 35px;
  background-color: white;
  & .dateWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  & .prevBtn {
    width: 15px;
    height: 15px;
    margin-right: 30px;
    color: #545454;
  }
  & .nextBtn {
    width: 15px;
    height: 15px;
    margin-left: 30px;
    color: #545454;
  }
  & .dateBox {
    width: 110px;
    height: 42px;
    //background-color: red;
    display: flex;
    justify-content: center;
    line-height: 11px;
    color: white;
    font-size: 18px;
  }
`
const TodoListAllWrap = styled.div`
  width: 600px;
  height: auto;
  display: flex;
  margin: 0;
  gap: 20px;
  //background-color: blue;
  margin-left: 30px;
`

const TodoInputWrap = styled.div`
  width: 403px;
  height: 22px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 30px;
  & p {
    font-size: 18px;
    color: #7A90E2;
    font-family: 'SB 어그로 M';
    margin: 0;
    padding-top: 3px;
  }
  & input {
    width: 220px;
    border: none;
    font-family: 'SB 어그로 L';
    border-bottom: 1px solid #474747;
    margin-left: 15px;
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
    background-color: #7A90E2;
    border-radius: 20px;
    width: 18px;
    height: 18px;
    padding: 3px;
  }
`
const TodoWrap = styled.div`
   display: flex;
  flex-Direction: column;
  align-items: center;
  background-color:#7A90E2;
  border-radius: 20px;
`
const TodoListBox = styled.div`
  padding: 4px;
  width: 250px;
  min-Height: 430px;
`
  const H2 = styled.p`
    font-size: 25px;
    font-weight: 600;
    color: white;
  `
  const TodooContainer = styled.div`
    user-Select: none;
    padding: 16;
    margin: 0 0 8px 0;
    min-Height: 60px;
    display: flex;
    text-align: center;
    align-items: center;
    border-radius: 10px;
  `

const TodoInner = styled.div`
  width: 200px;
  height: 22px;              
  //background-color: aliceblue;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  text-align: center;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;
  
`

 const IconBoxx = styled.div`
    width: 60px;
    height: 50px;
    display: flex;
    position: relative;
    text-align: center;
    align-items: center;
    left: 30px;
    //background-color: brown;
    gap: 10px;
    
    .penIcon {
      width: 50px;
      height: 18px;
    }
    .XIcon {
      width: 50px;
      height: 19px;
    }
`
const Datebuttonn = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: #7A90E2;
  color: white;
  :hover{
    background-color: #8D9EFF;
  }
`

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Color } from "../../resource/color.js"
import { useRecoilState } from "recoil";
import {recoilColorState} from "../../recoil/colorState"

const ColorForm = () => {

  const [recoilColor, setRecoilColor] = useRecoilState(recoilColorState);
  const defaultColor = { ...recoilColor }; //가져온 recoilColor 불변성
  
  const colorArray = Object.values(Color);  //values값 배열화 [색상코드들]
  const colorNameArray = Object.keys(Color);  //keys값 배열화 [색이름들]

  const [colorState, setColorState] = useState(defaultColor.color);
  // 복사한 recoilColor 객체의 color값 useState의 기본값으로 지정
  
  const onColorChangeHandler = (color) => {
    setColorState(color);
    console.log(color);
  };

  useEffect(() => {
    const changedColor = {
      color: colorState
    };
    setRecoilColor(changedColor);
  }, [colorState]);

  return (
    <>
      <WhiteContainer>
       <p className="titleText">오늘의 기분은 어떤 색인가요?</p>
          <ColorPallete>
            {colorArray.map((color, index) => (
              <ColorCircle key={color} background={color}>
                <label for={color}></label>
                <input
                  type="radio"
                  id={color}
                  checked={colorState === color}
                  onChange={() => onColorChangeHandler(color, index)}
                />
                <p>{colorNameArray[index]}</p>
              </ColorCircle>
            ))}
          </ColorPallete>
      </WhiteContainer>
    </>
  )
}

export default ColorForm;

const WhiteContainer = styled.div`
  width: 676px;
  height: 106px;
  background-color: #CED0E9;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  left: 50px;
  font-family: 'SB 어그로 L';
  & .titleText {
    text-align: center;
    margin-top: 25px;
    color: white;
    font-size: 17px;
  }
`

const ColorPallete = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 30px;
`;

const ColorCircle = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 10px;

  & > label {
    display: inline-block;
    background-color: ${(props) => props.background};
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.25s;
  }

  & > label:hover {
    transform: scale(1.15);
  }

  & > input {
    display: none;
  }
`;
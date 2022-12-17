import { atom } from "recoil";

const initialState = {
  color: "#5800FF"
};

export const recoilColorState = atom({
  key: "recoilColorState",
  default: initialState
});
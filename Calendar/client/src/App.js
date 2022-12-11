import './App.css';
import {  Route , Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil';
import PrivateRoute from "./privateRoute";
//import LoinButton from './1Page/loginButton/index.js';
import Onepage from './1Page';
import TwoPage from './2Page';
import ThirdPage from './3Page';
import Fourpage from './4Page';



function App() {
  return (
    <div className="App">
    <>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={
          <PrivateRoute component={<ThirdPage/>} status={<Onepage/>}/>
        }/>
        <Route path="/twopage" element={<TwoPage/>} />

        <Route path="/thirdpage" element={
            <PrivateRoute component={<ThirdPage/>}/>
        }/>
        
        <Route path="/fourpage" element={
            <PrivateRoute component={<Fourpage/>}/>
          }/>
      </Routes>
    </RecoilRoot>
    </>
    </div>
  );
}
export default App;

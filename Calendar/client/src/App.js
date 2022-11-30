import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import PrivateRoute from "./privateRoute";
//import LoinButton from './1Page/loginButton/index.js';
import Onepage from './1Page';
import TwoPage from './2Page';
import ThirdPage from './3Page';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute component={<ThirdPage/>} status={<Onepage/>}/>
        }/>
        <Route path="/twopage" element={<TwoPage/>} />
        <Route path="/thirdpage" element={
        <PrivateRoute component={<ThirdPage/>}/>
        }/>
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;

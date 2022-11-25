import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom'
//import LoinButton from './1Page/loginButton/index.js';
import Onepage from './1Page';
import TwoPage from './2Page';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Onepage/>} />
      <Route path="/twopage" element={<TwoPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

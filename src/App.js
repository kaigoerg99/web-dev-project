import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from "react-router";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;

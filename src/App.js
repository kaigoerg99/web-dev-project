import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from "react-router";
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';

function App() {
  // A6: https://docs.google.com/document/d/1wo6HHIQiSqf93vGwBxqHz0Cc_lpohzGEVvt6a4e2xpo/edit
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

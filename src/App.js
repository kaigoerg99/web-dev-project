import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from "react-router";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import NoResult from './components/Search/NoResult';
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/search/:searchTerm' element={<Search/>}/>
          <Route path='/search' element={<NoResult/>}/>
          <Route path='/details/:id' element={<Details/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;

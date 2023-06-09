import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from "react-router";
import { Provider } from "react-redux";

import CurrentUserContext from "./redux/current-user-context";
import store from "./redux/store";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import NoResult from './components/Search/NoResult';
import Details from './components/Details/Details';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Review from './components/Review/Review';
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="container-fluid">
      <Provider store={store}>
        <CurrentUserContext>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path='/search/:searchTerm' element={<Search/>}/>
              <Route path='/search' element={<NoResult/>}/>
              <Route path='/details/:id' element={<Details/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/profile/:userId' element={<Profile/>}/>
              <Route path='/review/:id/:title' element={<Review/>}/>
            </Routes>
          </BrowserRouter>
        </CurrentUserContext>
      </Provider>
    </div>
  );
}

export default App;

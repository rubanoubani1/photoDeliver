import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';

import LogIn from './components/LogIn';

import SavePage from './components/SavePage';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import Logout from './components/Logout';




function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/saved" element={<SavePage/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/posts" element={<MyPosts/>} />
        <Route path="/Logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default App;

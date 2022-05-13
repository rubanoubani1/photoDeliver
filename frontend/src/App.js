import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';

import LogIn from './components/LogIn';

import SavePage from './components/SavePage';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import Logout from './components/Logout';

//import {useState} from 'react';
import { useRequests } from './util/useRequests';


function App() {

  const [state, funcs] = useRequests();

  return (
    <div className="App">
       <Routes>
        <Route exact path="/" element={<Home user_id={state.user.id} list={state.list} funcs={funcs}/>} />
        <Route path="/saved" element={<SavePage user_id={state.user.id} list={state.list} funcs={funcs}/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/posts" element={<MyPosts user_id={state.user.id} list={state.list} funcs={funcs}/>} />
        <Route path="/Logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default App;

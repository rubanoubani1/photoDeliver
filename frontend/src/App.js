import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';

import LogIn from './components/LogIn';

import SavePage from './components/SavePage';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';
import Logout from './components/Logout';

import {useState} from 'react';


function App() {

  const [state, setState] = useState({
    token:"aaabbb",
    user: {
      firstname: "Jane",
      lastname: "Doe",
      id: 205,
      urlsafe: "janedoe",
      email: "jane.doe@gmail.com",
      profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
    }
  });

  return (
    <div className="App">
       <Routes>
        <Route exact path="/" element={<Home user_id={state.user.id}/>} />
        <Route path="/saved" element={<SavePage user_id={state.user.id}/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/posts" element={<MyPosts/>} />
        <Route path="/Logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default App;

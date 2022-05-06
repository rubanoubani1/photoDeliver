import './App.css';
import {Routes,Route,Link} from 'react-router-dom';
import Home from './components/Home';
import SavePage from './components/SavePage';
import Settings from './components/Settings';
import MyPosts from './components/MyPosts';



function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/saved" element={<SavePage/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/posts" element={<MyPosts/>} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {Routes,Route,Link} from 'react-router-dom';
import Home from './components/Home';
import LogIn from './components/LogIn';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;

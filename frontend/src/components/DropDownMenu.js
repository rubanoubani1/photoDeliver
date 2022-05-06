import './DropDownMenu.css';
import {Link} from 'react-router-dom';

const DropDownMenu = () => {

    return(
    <div className="dropdown">
        <button>User@user.com</button>
        <div className='dropdown-menu'>
            <Link to="/settings">Settings</Link>
            <Link to="/">Home</Link>
            <Link to="/posts">My posts</Link>
            <Link to="/saved">Saved pictures</Link>
            <Link to="">Logout</Link>
        </div>
    </div>
    )
}

export default DropDownMenu;
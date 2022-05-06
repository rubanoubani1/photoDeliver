import './DropDownMenu.css';
import {Link} from 'react-router-dom';

const DropDownMenu = () => {

    return(
    <div className="dropdown">
        <button>User@user.com</button>
        <div className='dropdown-menu'>
            <Link to="">Settings</Link>
            <Link to="">Home</Link>
            <Link to="">My posts</Link>
            <Link to="">Saved pictures</Link>
            <Link to="">Logout</Link>
        </div>
    </div>
    )
}

export default DropDownMenu;
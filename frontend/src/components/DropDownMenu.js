import './DropDownMenu.css';
import {Link} from 'react-router-dom';

const DropDownMenu = () => {

    return(
    <div className="pd-dropdown">
        <button className="btn btn-primary dropdown-toggle">User@user.com</button>
        <div className='pd-dropdown-menu'>
            <Link to="/settings">Settings</Link>
            <Link className="dropdown-item" to="/">Home</Link>
            <Link to="/posts">My posts</Link>
            <Link to="/saved">Saved pictures</Link>
            <hr/>
            <Link to="">Logout</Link>
        </div>
    </div>
    )
}

export default DropDownMenu;
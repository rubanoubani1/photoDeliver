import './DropDownMenu.css';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/loginActions';

const DropDownMenu = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token);

    return(
    <div className="pd-dropdown">
        <button className="btn btn-primary dropdown-toggle" style= {{backgroundColor:"#3A808A"}}>User@user.com</button>
        <div className='pd-dropdown-menu'>
            <Link to="/settings">Settings</Link>
            <Link className="dropdown-item" to="/">Home</Link>
            <Link to="/posts">My posts</Link>
            <Link to="/saved">Saved pictures</Link>
            <hr/>
            <Link to="" onClick={()=>dispatch(logout(token))}>Logout</Link>
        </div>
    </div>
    )
}

export default DropDownMenu;
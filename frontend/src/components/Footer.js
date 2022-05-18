import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer style={{
            backgroundColor: "#DBBAA0",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: 0,
            width: "100%"
        }}>
            <Link to="add" style={{ margin: "10px" }} className="btn btn-primary">Add new photo</Link>
        </footer>
    )
}

export default Footer;
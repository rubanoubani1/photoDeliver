const Footer = () => {

    return (
        <footer style={{
            backgroundColor: "lightblue",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: 0,
            width: "100%"
        }}>
            <button style={{ margin: "10px" }}>Add new photo</button>
        </footer>
    )
}

export default Footer;
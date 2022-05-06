const Image = (props) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={props.url} alt={props.alt} style={{ margin: "10px", width: "480px", height: "400px" }} />
        </div>
    );
}

export default Image;
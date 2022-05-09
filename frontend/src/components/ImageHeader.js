
const ImageHeader = (props) => {
    return (
        <div>
            <h3 style={{ margin: "5px" }}>{props.username}</h3>
            <br />
            <span style={{ fontWeight: "normal" }}>{props.date}</span>
        </div>
        
    );
}

export default ImageHeader;
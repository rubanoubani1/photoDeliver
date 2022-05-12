import ImageHeader from "./ImageHeader";
import Image from "./Image";
import ImageTextContent from "./ImageTextContent";

const ImageContainer = (props) => {

    
    return (
        <div style={{ width: "500px", margin: "20px" }}>
            <ImageHeader user={props.picture.owner} date={props.picture.date} />
            <Image url={props.picture.url} alt={props.picture.alt} />
            <ImageTextContent title={props.picture.title} comments={props.picture.comments} />
        </div>
    )

}

export default ImageContainer;
import ImageHeader from "./ImageHeader";
import Image from "./Image";
import ImageTextContent from "./ImageTextContent";

const ImageContainer = (props) => {

    
    return (
        <div style={{ width: "500px", margin: "20px" }}>
            <ImageHeader user={props.picture.owner} date={props.picture.date} />
            <Image url={props.picture.url} alt={props.picture.alt} />
            <ImageTextContent title={props.picture.title} comments={props.picture.comments} user_id={props.user_id} owner_id={props.picture.owner.id} />
        </div>
    )

}

export default ImageContainer;
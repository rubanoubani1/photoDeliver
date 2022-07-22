import ImageHeader from "./ImageHeader";
import Image from "./Image";
import ImageTextContent from "./ImageTextContent";

const ImageContainer = (props) => {

    return (
        <div 
            className="primary image-card"
            style={{ width: "420px", margin: "20px" }}
        >
            <ImageHeader 
                user={props.picture.owner} 
                date={props.picture.date} 
            />
            <Image 
                url={props.picture.url} 
                alt={props.picture.alt} 
                id={props.picture.id}
            />
            <ImageTextContent 
                title={props.picture.title} 
                comments={props.picture.comments} 
                owner_id={props.picture.owner.id} 
                image_id={props.picture.id}
                bookmarked={props.picture.bookmarked}
            />
        </div>
    )

}

export default ImageContainer;
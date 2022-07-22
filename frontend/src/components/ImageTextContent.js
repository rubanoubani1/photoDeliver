import ExpandableCommentList from "./ExpandableCommentList";
import ImageControlButtons from "./ImageControlButtons";

const ImageTextContent = (props) => {
    return (
        <div className="primary-light primary-blur-inside">
            <div 
                style={{margin:"10px",display:"flex",justifyContent:"space-between"}}
            >
                <div style={{fontWeight:"bold"}}>{props.title}</div>
                <ImageControlButtons 
                    image_id={props.image_id} 
                    owner_id={props.owner_id}
                    bookmarked={props.bookmarked}
                    />
            </div>
            <ExpandableCommentList 
                comments={props.comments} 
                owner_id={props.owner_id} 
                image_id={props.image_id}/>
        </div>
    );
}
export default ImageTextContent;
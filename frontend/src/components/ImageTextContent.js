import ExpandableCommentList from "./ExpandableCommentList";
import ImageControlButtons from "./ImageControlButtons";

const ImageTextContent = (props) => {
    return (
        <div>
            <div style={{margin:"10px",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold"}}>{props.title}</div>
                <ImageControlButtons />
            </div>
            <ExpandableCommentList comments={props.comments}/>
        </div>
    );
}
export default ImageTextContent;
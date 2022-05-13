import ExpandableCommentList from "./ExpandableCommentList";
import ImageControlButtons from "./ImageControlButtons";

const ImageTextContent = (props) => {
    return (
        <div>
            <div style={{margin:"10px",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold"}}>{props.title}</div>
                <ImageControlButtons user_id={props.user_id} owner_id={props.owner_id}/>
            </div>
            <ExpandableCommentList comments={props.comments} user_id={props.user_id} owner_id={props.owner_id}/>
        </div>
    );
}
export default ImageTextContent;
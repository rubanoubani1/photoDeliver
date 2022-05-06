import ExpandableCommentList from "./ExpandableCommentList";
import ImageControlButtons from "./ImageControlButtons";

const ImageTextContent = (props) => {
    // the view all comments can be styled to look like a link but it should be a button
    return (
        <div>
            <div style={{margin:"10px",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold"}}>{props.title}</div>
                <ImageControlButtons />
            </div>
            <ExpandableCommentList />
        </div>
    );
}
export default ImageTextContent;
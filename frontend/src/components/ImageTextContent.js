import ExpandableCommentList from "./ExpandableCommentList";
import ImageControlButtons from "./ImageControlButtons";

const ImageTextContent = (props) => {
    return (
        <div>
            <div style={{margin:"10px",display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold"}}>{props.title}</div>
                <ImageControlButtons 
                    user_id={props.user_id} 
                    owner_id={props.owner_id}
                    bookmarked={props.bookmarked}
                    deletePicture={() => props.funcs.deletePicture(props.image_id) }
                    removeBookmark={() => props.funcs.removeBookmark(props.image_id) }
                    addBookmark={() => props.funcs.addBookmark(props.image_id)}
                    />
            </div>
            { props.comments ?
            <ExpandableCommentList 
                comments={props.comments} 
                user_id={props.user_id} 
                owner_id={props.owner_id} 
                image_id={props.image_id}
                addComment={props.funcs.addComment} 
                deleteComment={props.funcs.deleteComment}/>
                : <></>
            }
        </div>
    );
}
export default ImageTextContent;
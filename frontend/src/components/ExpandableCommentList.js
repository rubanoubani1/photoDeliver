import Comment from "./Comment";
import { useState } from "react";

const ExpandableCommentList = (props) => {
    // can be closed, showing only one comment and number of comments and a button to view all comments if more than one
    // can be open, showing all comments, and possibly a button to close it?
    // can have no comments or one comment, in which case the view all comments button is unnecessary

    // if user has logged in, should probably have a form for sending a comment

    // the view all comments can be styled to look like a link but it propbably should be a button

    const [state, setState] = useState({
        displayedCommentsCount: 1
    });

    let commentComponents = props.comments.map((item)=>{
        return <Comment key={item.id} user={item.user} comment={item} />
    })

    let viewAllButton = <button>View all comments...</button>
    if (commentComponents.length <= 1){
        viewAllButton = <span></span> //remove the button if no more comments to show
    } else if (commentComponents.length <= state.displayedCommentsCount){
        viewAllButton = <button>Show less comments</button>
    }


    return(
        <div style={{ margin: "10px" }}>
            <button>add comment</button>
            {commentComponents.slice(0, state.displayedCommentsCount)}
            {viewAllButton}
        </div>
    );
}
export default ExpandableCommentList;
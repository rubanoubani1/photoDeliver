import Comment from "./Comment";
import { useState } from "react";
import CommentForm from "./CommentForm";

const ExpandableCommentList = (props) => {
    // can be closed, showing only one comment and number of comments and a button to view all comments if more than one
    // can be open, showing all comments, and possibly a button to close it?
    // can have no comments or one comment, in which case the view all comments button is unnecessary

    // if user has logged in, should probably have a form for sending a comment

    // the view all comments can be styled to look like a link but it propbably should be a button

    const [state, setState] = useState({
        displayedCommentsCount: 1
    });

    const setDisplayCount = (num) => {
        setState({
            displayedCommentsCount: num
        });
    };

    let commentComponents = props.comments.map((item)=>{
        return <Comment 
            key={item.id} 
            user={item.user} 
            comment={item} 
            user_id={props.user_id} 
            owner_id={props.owner_id}
            deleteComment={() => props.deleteComment(item.id)}/>
    })

    let viewAllButton = <button onClick={() => setDisplayCount(commentComponents.length)}>View all comments...</button>
    if (commentComponents.length <= 1){
        viewAllButton = <span></span> //remove the button if no more comments to show
    } else if (commentComponents.length <= state.displayedCommentsCount){
        viewAllButton = <button onClick={()=>setDisplayCount(1)}>Show less comments</button>
    }

    let commentForm = [];
    if(props.user_id >0){
        commentForm.push(<CommentForm key="commentForm" addComment={props.addComment} image_id={props.image_id} />);
    }


    return(
        <div style={{ margin: "10px" }}>
            {commentForm}
            {commentComponents.slice(0, state.displayedCommentsCount)}
            {viewAllButton}
        </div>
    );
}
export default ExpandableCommentList;
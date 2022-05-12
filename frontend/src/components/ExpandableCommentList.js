import Comment from "./Comment";

const ExpandableCommentList = (props) => {
    // can be closed, showing only one comment and number of comments and a button to view all comments if more than one
    // can be open, showing all comments, and possibly a button to close it?
    // can have no comments or one comment, in which case the view all comments button is unnecessary

    // if user has logged in, should probably have a form for sending a comment

    // the view all comments can be styled to look like a link but it propbably should be a button

    let commentComponents = props.comments.map((item)=>{
        return <Comment key={item.id} user={item.user} comment={item} />
    })
    

    return(
        <div style={{ margin: "10px" }}>
            <button>add comment</button>
            {commentComponents}
            <button>View all comments...</button>
        </div>
    );
}
export default ExpandableCommentList;
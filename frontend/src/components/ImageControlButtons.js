const ImageControlButtons = (props) => {

    let buttons = []
    if (props.user_id === props.owner_id) {
        buttons.push(<button 
            key="delete" 
            className="btn btn-primary"
            onClick={props.deletePicture}>Delete picture</button>)
    }
    else if(props.user_id > 0) {
        if (!props.bookmarked){
            buttons.push(<button 
                key="save" 
                className="btn btn-primary"
                onClick={props.addBookmark}>Save picture</button>);
        } else {
            buttons.push(<button 
                key="unsave" 
                className="btn btn-primary"
                onClick={props.removeBookmark}>Unsave picture</button>);
        }
        
    }

    return (
        <div>
            {buttons}
        </div>
    );
}
export default ImageControlButtons;
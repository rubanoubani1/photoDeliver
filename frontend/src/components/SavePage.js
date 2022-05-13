import NavigationBar from "./NavigationBar";
import ImageList from "./ImageList";
const SavePage = (props) => {
    return(
    <div>
        <NavigationBar/>
        <h1>Saved photos</h1>
            <ImageList user_id={props.user_id}/>
    </div>)
}

export default SavePage;
import NavigationBar from "./NavigationBar";
import ImageList from "./ImageList";
import {useEffect} from 'react';
import FilterableImageList from "./FilterableImageList";

const SavePage = (props) => {

    /*useEffect(() => {
        props.funcs.getPictures(undefined,"saved", props.user_id)
    }, []);*/

    return(
    <div>
        <NavigationBar/>
        <h1>Saved photos</h1>
        <FilterableImageList />
    </div>)
}

export default SavePage;
import {useEffect} from 'react';
import NavigationBar from "./NavigationBar";
import FilterableImageList from './FilterableImageList';
import Footer from "./Footer";

const MyPosts = (props) => {

    /*useEffect(() => {
        props.funcs.getPictures(undefined, "posts", props.user_id)
    }, []);*/

    return (
        <div style={{ backgroundColor: "#ffe6d4" }}>
            <NavigationBar />
            <FilterableImageList  />
            <Footer />
        </div>
    )
}

export default MyPosts;
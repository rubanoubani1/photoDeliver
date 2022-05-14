import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import FilterableImageList from "./FilterableImageList";
import { useEffect } from 'react';

const Home = (props) =>{

    useEffect(() => {
        props.funcs.getPictures(undefined, "home", props.user_id)
    }, []);

    return(
        <div style={{ backgroundColor: "#ffe6d4"}}>
            <NavigationBar />
            <FilterableImageList user_id={props.user_id} list={props.list} funcs={props.funcs} />
            <Footer/>
        </div>
    )
}

export default Home;
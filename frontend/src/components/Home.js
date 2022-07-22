import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import FilterableImageList from "./FilterableImageList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getList, HOME } from "../actions/pictureActions";

const Home = (props) =>{

    const dispatch = useDispatch();
    const state = useSelector(state => state.login);

    useEffect(() => {
        if (state.isLogged) {
            dispatch(getList(state.token, HOME));
        }
    }, []);

    return(
        <div className="base">
            <NavigationBar />
            <FilterableImageList />
            <Footer/>
        </div>
    )
}

export default Home;
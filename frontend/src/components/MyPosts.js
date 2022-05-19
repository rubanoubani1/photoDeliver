import {useEffect} from 'react';
import NavigationBar from "./NavigationBar";
import FilterableImageList from './FilterableImageList';
import Footer from "./Footer";
import { getList, USER } from '../actions/pictureActions';
import { useDispatch, useSelector } from "react-redux";

const MyPosts = (props) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.login);

    useEffect(() => {
        if (state.isLogged) {
            dispatch(getList(state.token, USER, state.user.id));
        }
    }, []);

    return (
        <div style={{ backgroundColor: "#ffe6d4" }}>
            <NavigationBar />
            <FilterableImageList  />
            <Footer />
        </div>
    )
}

export default MyPosts;
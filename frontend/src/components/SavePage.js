import NavigationBar from "./NavigationBar";
import {useEffect} from 'react';
import FilterableImageList from "./FilterableImageList";
import { getList, BOOKMARKS } from '../actions/pictureActions';
import { useDispatch, useSelector } from "react-redux";

const SavePage = (props) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.login);

    useEffect(() => {
        if (state.isLogged) {
            dispatch(getList(state.token, BOOKMARKS));
        }
    }, []);

    return(
    <div>
        <NavigationBar/>
        <h1>Saved photos</h1>
        <FilterableImageList />
    </div>)
}

export default SavePage;
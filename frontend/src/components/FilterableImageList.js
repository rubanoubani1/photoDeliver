import ImageList from "./ImageList";
import SearchBar from "./SearchBar";
import {useState} from 'react';

const FilterableImageList = (props) => {

    const [state, setState] = useState({
        filter:"",
        datefrom: new Date(0).toJSON().slice(0, 10),
        dateto: new Date().toJSON().slice(0, 10),
        filteredList:props.list
    })

    const setFilter = (queryParts) => {
        //could do some filtering here on client side
        //or call props.funcs.getPictures with the query stuff
        setState({
            filter: queryParts.query,
            datefrom: queryParts.datefrom,
            dateto: queryParts.dateto,
            filteredList: props.list 
        })
        
    }

    return (
        <div>
            <SearchBar setFilter={setFilter} query={state.filter} datefrom={state.datefrom} dateto={state.dateto}/>
            <ImageList list={state.filteredList} user_id={props.user_id} funcs={props.funcs}/>
        </div>
    );
}

export default FilterableImageList;
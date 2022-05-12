import ImageList from "./ImageList";
import SearchBar from "./SearchBar";

const FilterableImageList = (props) => {

    const [state, setState] = useState({
        filteredList:[]
    })

    return (
        <div>
            <SearchBar />
            <ImageList list={state.filteredList} />
        </div>
    );
}

export default FilterableImageList;
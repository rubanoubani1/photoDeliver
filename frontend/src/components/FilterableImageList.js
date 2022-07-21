import ImageList from "./ImageList";
import SearchBar from "./SearchBar";

const FilterableImageList = (props) => {

    return (
        <div>
            <SearchBar />
            <ImageList />
        </div>
    );
}

export default FilterableImageList;
import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import Picture from "./Picture";

const Home = () =>{
    return(
        <div style={{backgroundColor:"grey"}}>
            <NavigationBar />
            <SearchBar />
            <div style={{display:"flex",flexWrap:"wrap"}}>
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
            </div>
        </div>
    )
}

export default Home;
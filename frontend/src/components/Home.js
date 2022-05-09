import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import Footer from "./Footer";

const Home = () =>{
    return(
        <div style={{backgroundColor:"grey"}}>
            <NavigationBar />
            <SearchBar />
            <ImageList />
            <Footer/>
        </div>
    )
}

export default Home;
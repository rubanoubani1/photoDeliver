import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import Footer from "./Footer";

const Home = (props) =>{
    return(
        <div style={{backgroundColor:"grey"}}>
            <NavigationBar />
            <SearchBar />
            <ImageList user_id={props.user_id} />
            <Footer/>
        </div>
    )
}

export default Home;
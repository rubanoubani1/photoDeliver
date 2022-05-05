import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import Picture from "./Picture";
import Footer from "./Footer";

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
                <Picture />
            </div>
            <Footer/>
        </div>
    )
}

export default Home;
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import FilterableImageList from "./FilterableImageList";

const Home = (props) =>{

    return(
        <div style={{backgroundColor:"grey"}}>
            <NavigationBar />
            <FilterableImageList user_id={props.user_id} list={props.list} funcs={props.funcs} />
            <Footer/>
        </div>
    )
}

export default Home;
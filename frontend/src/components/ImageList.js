
import ImageContainer from "./ImageContainer";

const ImageList = (props) => {
    
    let imageContainerList = props.list.map((item)=>{
        return <ImageContainer key={item.id} picture={item} user_id={props.user_id} funcs={props.funcs}/>
    })

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {imageContainerList}
        </div>
    );
}

export default ImageList;
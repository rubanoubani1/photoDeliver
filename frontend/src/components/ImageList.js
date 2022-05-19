import { useSelector } from 'react-redux';
import ImageContainer from "./ImageContainer";

const ImageList = (props) => {

    const list = useSelector(state => state.images.list);
    
    let imageContainerList = list.map((item)=>{
        return <ImageContainer 
            key={item.id} 
            picture={item}
        />
    })

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {imageContainerList}
        </div>
    );
}

export default ImageList;
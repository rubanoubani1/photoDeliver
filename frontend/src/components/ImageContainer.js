import ImageHeader from "./ImageHeader";
import Image from "./Image";
import ImageTextContent from "./ImageTextContent";

const ImageContainer = (props) => {

    const picture = {
        username: "JohnDoe@gmail.com",
        url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
        //needs alternate text
        alt: "dog",
        title: "Random dog picture",
        date: "13 April 2022"
    }
    return (
        <div style={{ width: "500px", margin: "20px" }}>
            <ImageHeader username={picture.username} date={picture.date} />
            <Image url={picture.url} alt={picture.alt} />
            <ImageTextContent title={picture.title} />
        </div>
    )

}

export default ImageContainer;

import ImageContainer from "./ImageContainer";

const ImageList = (props) => {

    const list = [
        {
            owner: {
                firstname: "John",
                lastname: "Doe",
                id: 204,
                urlsafe: "johndoe",
                profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
            },
            url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
            id: 102,
            alt: "dog",
            title: "Random dog picture",
            date: "13 April 2022",
            comments: [
                {
                    user: {
                        firstname: "Jane",
                        lastname: "Doe",
                        id: 205,
                        urlsafe: "janedoe",
                        profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
                    },
                    id: 123,
                    text: "such a cute dog!",
                    date: "13 April 2022"
                }
            ],
            bookmarked: "true"
        },
        {
            owner: {
                firstname: "John",
                lastname: "Doe",
                id: 204,
                urlsafe: "johndoe",
                profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
            },
            url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
            id: 103,
            alt: "dog",
            title: "Random dog picture 2",
            date: "14 April 2022",
            comments: [],
            bookmarked: "false"
        },
        {
            owner: {
                firstname: "John",
                lastname: "Doe",
                id: 204,
                urlsafe: "johndoe",
                profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
            },
            url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
            id: 104,
            alt: "dog",
            title: "Random dog picture 3",
            date: "15 April 2022",
            comments: [
                {
                    user: {
                        firstname: "Jane",
                        lastname: "Doe",
                        id: 205,
                        urlsafe: "janedoe",
                        profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
                    },
                    id: 124,
                    text: "that's the third time you've posted that picture",
                    date: "15 April 2022"
                },
                {
                    user: {
                        firstname: "John",
                        lastname: "Doe",
                        id: 204,
                        urlsafe: "johndoe",
                        profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
                    },
                    id: 125,
                    text: "It's the only one I have...",
                    date: "15 April 2022"
                },
                {
                    user: {
                        firstname: "Jane",
                        lastname: "Doe",
                        id: 205,
                        urlsafe: "janedoe",
                        profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
                    },
                    id: 126,
                    text: "can't you take new photos?",
                    date: "15 April 2022"
                },
                {
                    user: {
                        firstname: "John",
                        lastname: "Doe",
                        id: 204,
                        urlsafe: "johndoe",
                        profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
                    },
                    id: 127,
                    text: "My house burned and everything I own was destroyed so the only picture I have left is this one I had as my profile picture. Oh, poor Doge the third... If only I hadn't left the candles burning again while going to work.",
                    date: "15 April 2022"
                },
                {
                    user: {
                        firstname: "Jane",
                        lastname: "Doe",
                        id: 205,
                        urlsafe: "janedoe",
                        profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
                    },
                    id: 128,
                    text: "wow that got dark fast",
                    date: "15 April 2022"
                }
            ],
            bookmarked: "false"
        }
    ];
    
    let imageContainerList = list.map((item)=>{
        return <ImageContainer key={item.id} picture={item} />
    })

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {imageContainerList}
        </div>
    );
}

export default ImageList;
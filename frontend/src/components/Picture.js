const Picture = () => {
   
    const picture = {
        username: "JohnDoe@gmail.com",
        url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
        //needs alternate text
        alt: "dog",
        title: "Random dog picture",
        date: "13 April 2022"
    }
    return(
        <div style={{width:"500px", margin:"20px"}}>
            <h3  style={{margin:"5px"}}>{picture.username}<br/>
            <span style={{fontStyle:"normal"}}>{picture.date}</span></h3>
            <div style={{display:"flex",justifyContent:"center"}}>
                <img src={picture.url} alt={picture.alt} style={{margin:"10px",width:"480px",height:"400px"}}/>
            </div>
            <div style={{margin:"10px",display:"flex",justifyContent:"space-between"}}>
                <div>{picture.title}</div>
                <div>
                    <button>Delete picture</button>
                    <button>Save picture</button>
                </div>
            </div>
            <a style={{margin:"10px"}}href="/">View all comments...</a>
        </div>
    )

}

export default Picture;
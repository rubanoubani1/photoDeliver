const SearchBar = () => {
    return(
        <div style={{backgroundColor:"lightblue", height:"60px"}}>
            <label>From: </label><input/><label>To: </label><input /><br/><input placeholder="Search by tags"/>
        </div>
    )
}

export default SearchBar
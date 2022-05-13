const SearchBar = (props) => {

    const onChange = (event) => {
        props.setFilter({
            query:props.query,
            datefrom:props.datefrom,
            dateto:props.dateto,
            [event.target.name]:event.target.value
        });
    }
    //<label htmlFor="datefrom" className="form-label">From: </label>
    //<label htmlFor="dateto" className="form-label">To: </label>

    return(
        <form className="mb-3" style={{ backgroundColor: "lightblue", height: "60px", width: "600px"}}>
            <div style={{display:"flex"}}>
                <input
                    type="date"
                    name="datefrom"
                    id="datefrom"
                    className="form-control"
                    placeholder="From"
                    onChange={onChange}
                    value={props.from}
                />
                <input
                    type="date"
                    name="dateto"
                    id="dateto"
                    className="form-control"
                    placeholder="To"
                    onChange={onChange}
                    value={props.to}
                />
            </div>
            
            <input
                type="text"
                name="query"
                id="query"
                className="form-control"
                placeholder="Search by tags"
                onChange={onChange}
                value={props.query}
            />
        </form>
    )
}

export default SearchBar
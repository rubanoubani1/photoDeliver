
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../actions/pictureActions';

const SearchBar = (props) => {

    const dispatch = useDispatch();

    const[state, setState] = useState({
        query: "",
        datefrom: new Date(0).toJSON().slice(0, 10),
        dateto: new Date(Date.now() + (1000*60*60*24)).toJSON().slice(0, 10)
    })

    const onChange = (event) => {
        setState(state => {
            let tmpState = {
                ...state,
                [event.target.name]: event.target.value
            }
            dispatch(setFilter(tmpState));
            return tmpState;
        });
    }
    //<label htmlFor="datefrom" className="form-label">From: </label>
    //<label htmlFor="dateto" className="form-label">To: </label>

    return(
        <form className="mb-3" style={{ backgroundColor: "#8F715A", height: "60px", width: "600px"}}>
            <div style={{display:"flex"}}>
                <input
                    type="date"
                    name="datefrom"
                    id="datefrom"
                    className="form-control"
                    placeholder="From"
                    onChange={onChange}
                    value={state.datefrom}
                />
                <input
                    type="date"
                    name="dateto"
                    id="dateto"
                    className="form-control"
                    placeholder="To"
                    onChange={onChange}
                    value={state.dateto}
                />
            </div>
            
            <input
                type="text"
                name="query"
                id="query"
                className="form-control"
                placeholder="Search by tags"
                onChange={onChange}
                value={state.query}
            />
        </form>
    )
}

export default SearchBar
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from './ImageUploader';
import { addImage } from '../actions/pictureActions';

const PictureForm = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(state=>state.login.token);

    const [state, setState] = useState({
        title:"",
        public_id: "",
        description:"",
        image:null,
        file:null
    })

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(state)
        dispatch(addImage(token, state));
    }

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]: event.target.value
            }
        })
    }

    const setImage = (image) => {
        setState((state) => {
            console.log(state);
            return {
                ...state,
                image: image
            }
        })
    }
    const setFile = (file) => {
        setState((state) => {
            console.log(state);
            return {
                ...state,
                file: file
            }
        })
    }

    

    return (
        <form onSubmit={onSubmit} className="mb-3">
            
            <label htmlFor="title" className="form-label">Title</label>
            <input 
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="form-control"
                onChange={onChange}
                value={state.title}
            ></input>
            <input 
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                className="form-control"
                onChange={onChange}
                value={state.description}
            ></input>
            
            <ImageUploader image={state.image} setImage={setImage} setFile={setFile}/>

            <input 
                type="submit"
                className="btn btn-primary"
                value="Upload image"
            ></input>
        </form>
    );
}

export default PictureForm;



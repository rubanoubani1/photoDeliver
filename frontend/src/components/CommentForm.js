import {useState} from 'react';

const CommentForm = (props) => {

    const [state, setState] = useState({
        comment: ""
    })

    const onChange = (event) => {
        setState((state => {
            return {
                ...state,
                [event.target.name]: event.target.value
            };
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let item = {
            ...state
        }
        props.addComment(item);
        setState({
            comment: ""
        });
    }

    return (
        <form onSubmit={onSubmit} className="mb-3" style={{display:"flex"}}>
            <input
                type="text"
                name="comment"
                id="commentfield"
                className="form-control"
                onChange={onChange}
                placeholder="Write a comment here"
                value={state.comment} />
            <input
                type="submit"
                className='btn btn-primary'
                value="Add comment"/>
        </form>
    );
}

export default CommentForm;
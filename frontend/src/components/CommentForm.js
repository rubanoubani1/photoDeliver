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
        props.addComment(props.image_id, item);
        setState({
            comment: ""
        });
    }

    return (
        <form onSubmit={onSubmit} className="mb-3" style={{display:"flex"}} id={"commentform-"+props.image_id}>
            <textarea
                type="text"
                form={"commentform-" + props.image_id}
                name="comment"
                rows="1"
                id={"commentfield-" + props.image_id}
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

import { useRef } from 'react';

const ImageUploader = (props) => {

    const fileInput = useRef(null);
    const fileDropRef = useRef(null);

    const handleFile = (files) => {
        if (files && files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                props.setImage(e.target.result);
            };
            //reader.readAsDataURL(files[0]);
            //console.log(URL.createObjectURL(files[0]));
            props.setImage(URL.createObjectURL(files[0]));
            props.setFile(files[0]);
           
        }
    }

    const onDragEnter = () => fileDropRef.current.classList.add('dragover');

    const onDragLeave = () => fileDropRef.current.classList.remove('dragover');


    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    const onDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        fileInput.current.value = "";
        fileDropRef.current.classList.remove('dragover');
        handleFile(event.dataTransfer.files);
    }

    const onChange = (event) => {
        handleFile(event.target.files);
    }
    
    //TODO: add a file drop area as image placeholder
    return (
        <div ref={fileDropRef} className="file-uploader" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}>
            
            <input
                ref={fileInput}
                type="file"
                name="user_icon"
                className="form-control"
                onChange={onChange}
                accept="image/*"
                placeholder="hello.jpg"
                //value={props.image}
            />
            {props.image
                ?<img
                    src={props.image}
                    alt="preview"
                    style={{ width: "100%" }} />
                :<></>}
        </div>
    );
}

export default ImageUploader;
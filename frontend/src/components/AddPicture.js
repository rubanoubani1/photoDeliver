import NavigationBar from "./NavigationBar";
import PictureForm from "./PictureForm";


const AddPicture = (props) => {
    
    return (
        <div style={{ color: "E5E5E5", backgroundColor: "#FFE6D4" }}>
            <NavigationBar />
            <div className="row d-flex justify-content-center align-items-center h-100">


                <div className="col-12 col-md-8 col-lg-6 col-xl-5" >

                    <div className="card p-5 text-center" style={{ backgroundColor: "#8F715A", borderRadius: "4rem" }}>

                        <h3 style={{ color: "#2F57E7" }}>Add picture</h3>

                        <br />
                        <hr />
                        <PictureForm />


                    </div>

                </div>
            </div>
        </div>
    )
}
export default AddPicture;
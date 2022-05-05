import SignUpForm from "./SignUpForm";

const SignUp = () => {
    return (
        <div style={{padding:"5%", margin:"10%", backgroundColor:"aliceblue", borderRadius:"5%"}}>
            <h2 style={{color:"blue"}}>Sign Up</h2>
            <hr/>
            <SignUpForm />
        </div>
    );
}

export default SignUp;
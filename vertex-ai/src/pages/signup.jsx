import "./signin.css";
import Nav from "../components/nav";
import Footer from "../components/footer";
import SignUpForm from "../components/signupform";

export default function SignUp() {
        return (
                <div className="App">
                        <Nav />
                        <SignUpForm />
                        <Footer />
                </div>
        );
}

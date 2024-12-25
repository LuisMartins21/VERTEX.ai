import "./signorlog.css";
import Nav from "../components/nav.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signorlog() {
        const [username, setUsername] = useState(null);
        const [message, setMessage] = useState("");
        const navigate = useNavigate();
        useEffect(() => {
            axios
                .get("/auth/check", { withCredentials: true })
                .then((response) => {
                    setUsername(response.data.username);
                })
                .catch(() => {
                    setUsername(null);
                });
        }, []);

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    const response = await axios.post("/logout"); 
                    navigate("/home");
                } catch (error) {
                    if (error.response) {
                        setMessage(error.response.data.message);
                    } else {
                        setMessage("Alguma cena aconteceu malee :(");
                    }
                }
            };
    
        return (
            <div className="App">
                <Nav />
                <div className="Sign-Or-Log">
                    {!username ? (
                        <>
                            <div className="Sign-In">
                                <a className="SignIn-Button" href="/signin">
                                    Create an Account
                                </a>
                            </div>
                            <div className="Log-In">
                                <a className="LogIn-Button" href="/signup">
                                    Log-In
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                        <form onSubmit={handleSubmit}>
                            <div className="Log-In">
                            <button class="Submit-Button">
                                        Log Out
                                </button>
                            </div>
                            </form>
                        </>
                    )}
                </div>
                {message && <p>{message}</p>}
            </div>
            
        );
    }

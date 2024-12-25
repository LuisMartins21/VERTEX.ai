import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Nav() {
        const [username, setUsername] = useState(null);

        useEffect(() => {
            axios.get("/auth/check", { withCredentials: true })
                .then((response) => {
                    setUsername(response.data.username);
                })
                .catch(() => {
                    setUsername(null);
                });
        }, []);
        return (
                <nav className="App-nav">
                        <ul>
                                <div className="App-logo">
                                        <img
                                                className="logo"
                                                src="./img/Vertexailogo-removebg-preview.png"
                                                alt="Vertex.AI Logo"
                                        />
                                </div>

                                <li>
                                        <a className="App-item1" href="/home">
                                                Home
                                        </a>
                                </li>

                                <li>
                                        <a className="App-item3" href="/about">
                                                About
                                        </a>
                                </li>
                                <li>
                                        <a className="App-item4" href="/chat">
                                                Chat
                                        </a>
                                </li>

                                <li>
                                        <a
                                                className="Signin-button"
                                                href="/signorlog"
                                        >
                                                {username ? (
                                                        <li className="App-item3">Welcome, {username}!</li>
                                                ) : (
                                                <FontAwesomeIcon
                                                        icon={faUser}
                                                        bounce
                                                        href="/signin"
                                                        size="lg"
                                                        style={{
                                                                color: "#ffffff",
                                                        }}
                                                />
                                        )}
                                        </a>
                                </li>
                        </ul>
                </nav>
        );
}

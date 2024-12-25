import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Signin from "./pages/signin";
import Error404 from "./pages/error404";
import Signorlog from "./pages/signorlog";
import SignUp from "./pages/signup";

export default function App() {
        return (
                <div>
                        <BrowserRouter>
                                <Routes>
                                        <Route index element={<Home />} />

                                        <Route
                                                path="/home"
                                                element={<Home />}
                                        />
                                        <Route
                                                path="/chat"
                                                element={<Chat />}
                                        />

                                        <Route
                                                path="*"
                                                element={<Error404 />}
                                        />

                                        <Route
                                                path="/signin"
                                                element={<Signin />}
                                        />

                                        <Route
                                                path="/signorlog"
                                                element={<Signorlog />}
                                        />

                                        <Route
                                                path="/signup"
                                                element={<SignUp />}
                                        />
                                </Routes>
                        </BrowserRouter>
                </div>
        );
}

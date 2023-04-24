import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../services/users-thunks.js";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            dispatch(loginThunk({username, password}));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="container">
            <div className="w-50 ">
                <div className="form-group row mt-3">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row mt-2">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <button onClick={login} className="btn btn-primary mt-2">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;
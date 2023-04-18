import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../services/users-thunks";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: 'viewer',
    });

    const login = async () => {
        const res = await dispatch(loginThunk(user));
        console.log(res);
        navigate("/profile");
    };

    return (
        <div className="container">
            <form className="w-50 ">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Enter username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Enter password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                    </div>
                </div>
                <button onClick={login} className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;
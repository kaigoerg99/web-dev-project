import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/users-service";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: 'viewer',
    });

    const register = async () => {
        await userService.register(user);
        //navigate("/profile");
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
                <div className="form-group">
                    <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Role</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" value="viewer" checked={user.role === "viewer"} onChange={(e) => setUser({ ...user, role: e.target.value })}/>
                                <label className="form-check-label">
                                    Viewer
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" value="critic" checked={user.role === "critic"} onChange={(e) => setUser({ ...user, role: e.target.value })}/>
                                <label className="form-check-label">
                                    Critic
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={register} className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;
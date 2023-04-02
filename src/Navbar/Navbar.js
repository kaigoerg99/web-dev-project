import {Link} from "react-router-dom";
import NavbarLink from "./Navbar-link";

function Navbar() {
    // TODO: Make links into one reusable component
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light pv-2 px-4 d-flex flex-row justify-content-between">
        <Link to="/" className="navbar-brand" style={{'font-size': '50px'}}>
            <i class="bi bi-film me-2" ></i>
            <span class="navbar-text text-dark">MOVIES.COM</span>
        </Link>

        <div class="input-group w-50">
            <input type="search" class="form-control py-2" placeholder="Search for Movies"/>
            <button type="button" class="btn btn-outline-dark"><i class="bi bi-search"></i></button>
        </div>
        
        <div className="d-flex flex-row" >
            <NavbarLink to="/" name="Home" icon="bi bi-house-fill"/>
            <NavbarLink to="/favorites" name="Favorites" icon="bi bi-bookmark-plus-fill"/>
            <NavbarLink to="/profile" name="Profile" icon="bi bi-person-circle"/>
        </div>

    </nav>
)}

export default Navbar;
import {Link} from "react-router-dom";

function Navbar() {
    // TODO: Make links into one reusable component
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light pv-2 mx-4 d-flex flex-row">
        <Link to="/" className="navbar-brand" style={{'font-size': '50px'}}>
            <i class="bi bi-film me-2" ></i>
            <span class="navbar-text text-dark">MOVIES</span>
        </Link>
        
        <div className="ms-auto" >
            <Link to="/" className="ms-2 navbar-text" style={{'text-decoration': 'none'}}>
                Home
            </Link>
            <Link to="/favorites" className="ms-2 navbar-text" style={{'text-decoration': 'none'}}
                >Favorites
            </Link>
            <Link to="/profile" className="ms-2 navbar-text" style={{'text-decoration': 'none'}}>
                Profile
            </Link>
        </div>

    </nav>
)}

export default Navbar;
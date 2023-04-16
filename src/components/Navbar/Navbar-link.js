import {Link} from "react-router-dom";
import './Navbar.css'

const NavbarLink = ({name, to, icon}) => {
    return (
        <div className="d-flex flex-row">
            <Link to={to} className="link">
                <i className={icon}></i>
                <span className="ms-1">{name}</span>
            </Link>
        </div>
    );
}

export default NavbarLink;
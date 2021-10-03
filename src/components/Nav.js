import {useAuth} from "../contexts/UserContext";
import {Link, NavLink, useHistory} from "react-router-dom";
import Logo from "./svgs/Logo";

const Nav = () => {
    const history = useHistory()
    const {currentUser, profile, logout} = useAuth()
    const attemptLogout = async (e) => {
        e.preventDefault();
        try {
            await logout()
            history.push('login')
        } catch (e) {}
    }

    return <header className="p-3 mb-3 border-bottom">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <div style={{maxWidth : '60px'}}>
                        <Logo/>                        
                    </div>&nbsp;
                    <div className="text-primary">
                        <h2 className="mb-0 text-primary">IDControl</h2>
                        <small>Infectious Disease Control</small>
                    </div>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{flex : 1}}>
                    <li><NavLink to="/" exact={true} activeClassName="text-primary" className="nav-link px-2 link-dark">Home</NavLink></li>
                    <li><NavLink to="/health-resources" activeClassName="text-primary" className="nav-link px-2 link-dark">Health Resources</NavLink></li>
                    <li><NavLink to="/report-a-case" activeClassName="text-primary" className="nav-link px-2 link-dark">Report-a-Case</NavLink></li>
                    <li><NavLink to="/contact" activeClassName="text-primary" className="nav-link px-2 link-dark">Contact</NavLink></li>
                </ul>

                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                </form>

                {currentUser ? <div className="dropdown text-end">
                    <a href="/" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"
                             className="rounded-circle"/>
                    </a>
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" href="#">{profile && profile.first_name} {profile && profile.last_name}</Link></li>
                        <li><Link className="dropdown-item" href="#">Settings</Link></li>
                        <li><Link className="dropdown-item" href="#">Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="/" onClick={attemptLogout}>Sign out</a></li>
                    </ul>
                </div> : <ul className="nav mb-2 justify-content-center mb-md-0">
                    <li><Link to={'/login'} className="nav-link px-2 link-dark text-primary">Login</Link></li>
                </ul>}
            </div>
        </div>
        <div className="position-fixed" style={{
            right : 100, bottom : 15
        }}>
            <a href="#">Go to top</a>
        </div>
    </header>
}

export default Nav
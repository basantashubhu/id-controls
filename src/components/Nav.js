import {useAuth} from "../contexts/UserContext";
import {Link, useHistory} from "react-router-dom";

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
                        <svg className="w-100 h-auto" id="Capa_1" enableBackground="new 0 0 511.791 511.791" height="512" viewBox="0 0 511.791 511.791" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m218.883 89.536h-30v-59.35l25.064-29.563 22.883 19.4-17.947 21.169z" fill="#d0e95a"/></g><g><path d="m322.908 89.536h-30v-48.344l-17.947-21.169 22.883-19.4 25.064 29.563z" fill="#9ebc2c"/></g><g><g><path d="m178.412 127.413v37.041h77.483l10.355-55.997-10.354-58.527c-42.793 0-77.484 34.69-77.484 77.483z" fill="#5a781e"/><path d="m255.896 49.93v114.524h77.483v-37.041c0-42.793-34.691-77.483-77.483-77.483z" fill="#355e16"/></g><g><path d="m143.181 220.068h-76.199l-63.694-63.694 21.213-21.213 54.907 54.907h63.773z" fill="#5a781e"/></g><g><path d="m21.307 374.071-21.307-21.12 63.186-63.74h58.81v30h-46.307z" fill="#5a781e"/></g><g><path d="m67.397 511.168h-30v-65.762l78.405-69.527 19.904 22.445-68.309 60.575z" fill="#5a781e"/></g><g><path d="m444.809 220.068h-76.199v-30h63.773l54.907-54.907 21.213 21.213z" fill="#355e16"/></g><g><path d="m490.484 374.071-54.382-54.86h-46.307v-30h58.81l63.186 63.74z" fill="#355e16"/></g><g><path d="m474.394 511.168h-30v-52.269l-68.309-60.575 19.904-22.445 78.405 69.527z" fill="#355e16"/></g></g><path d="m255.895 132.799c-78.224 0-141.637 63.413-141.637 141.637l141.637 68.47 19.065-105.053z" fill="#d0e95a"/><path d="m255.896 132.799v210.107l141.637-68.47c-.001-78.224-63.414-141.637-141.637-141.637z" fill="#9ebc2c"/><path d="m114.259 369.531v-95.095c0-2.609.076-5.199.215-7.773h65.179c42.108 0 76.243 34.135 76.243 76.243l22.67 87.772-22.67 80.49c-78.224 0-141.637-63.413-141.637-141.637z" fill="#9ebc2c"/><path d="m397.532 369.531v-95.095c0-2.609-.076-5.199-.215-7.773h-65.179c-42.108 0-76.243 34.135-76.243 76.243v168.262c78.224 0 141.637-63.413 141.637-141.637z" fill="#5a781e"/></g></svg>
                    </div>&nbsp;
                    <div className="text-primary">
                        <h2 className="mb-0 text-primary">IDControl</h2>
                        <small>Infectious Disease Control</small>
                    </div>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{flex : 1}}>
                    <li><a href="#" className="nav-link px-2 link-secondary">Overview</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Inventory</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Customers</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Products</a></li>
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
                        <li><a className="dropdown-item" href="#">{profile && profile.first_name} {profile && profile.last_name}</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
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
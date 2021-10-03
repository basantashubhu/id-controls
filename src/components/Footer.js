import { Link } from "react-router-dom";
import Facebook from "./svgs/Facebook";
import Instagram from "./svgs/Instagram";
import Twitter from "./svgs/Twitter";

const Footer = () => {
    return <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <svg className="bi" width="30" height="24">
                    </svg>
                </a>
                <span className="text-muted">© {new Date().getFullYear()} Infectious Disease Control</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><Link className="text-muted" to="/contact">
                    <Facebook />
                </Link></li>
                <li className="ms-3"><Link className="text-muted" to="/contact">
                    <Twitter />
                </Link></li>
                <li className="ms-3"><Link className="text-muted" to="/contact">
                    <Instagram />
                </Link></li>
            </ul>
        </footer>
    </div>
}
export default Footer
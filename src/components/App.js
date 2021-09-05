import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./Nav";
import {AuthProvider} from "../contexts/UserContext";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Login from "../pages/Login";
// import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword";
import Disease from "../pages/Disease";
import Footer from "./Footer";

function App() {
    return (
        <div id={'bootstrap-root'}>
            <Router>
                <AuthProvider>
                    <Nav/>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route path={'/disease/:id'} component={Disease} />
                        <Route path={'/sign-up'} component={SignUp} />
                        <Route path={'/login'} component={Login} />
                        <Route path={'/forgot-password'} component={ForgotPassword} />
                    </Switch>
                    <Footer/>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;

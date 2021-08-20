import {useState} from "react";
import {useAuth} from "../contexts/UserContext";
import {Link, Redirect, useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory()
    const {login, currentUser} = useAuth()
    const [credential, setCredential] = useState({email: '', password: ''})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(credential.email, credential.password);
            history.push('/')
        } catch (e) {
            setError('Failed to log in : ' + e.message);
        } finally {
            setLoading(false)
        }
    }
    return <>
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="w-100" style={{maxWidth: '400px'}}>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Log in</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control" value={credential.email}
                                           onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control"
                                           value={credential.password} onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Login</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <Link to={'forgot-password'}>Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mt-3">Need an account? <Link to={'/sign-up'}>Sign Up</Link></p>
                </div>
            </div>
        </div>
    </>
}

export default Login
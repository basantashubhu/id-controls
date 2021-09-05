import {useState} from "react";
import {useAuth} from "../contexts/UserContext";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    const {resetPassword} = useAuth()
    const [credential, setCredential] = useState({email: ''})
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await resetPassword(credential.email, credential.password);
            setMessage('Check your inbox for further information')
            setCredential({email : ''})
        } catch (e) {
            setError('Failed to reset your password');
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
                            <h2 className="text-center mb-4">Forgot Password</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {message && <div className="alert alert-success">{message}</div>}
                            <form onSubmit={handleForgotPassword}>
                                <div className="form-group">
                                    <label>Enter your email</label>
                                    <input type="email" name="email" className="form-control" value={credential.email}
                                           onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <p className="text-center mt-3"><Link to={'/login'}>Login</Link></p>
                </div>
            </div>
        </div>
    </>
}

export default ForgotPassword
import {useState} from "react";
import {useAuth} from "../contexts/UserContext";
import {Link, useHistory} from "react-router-dom";

const SignUp = () => {
    const history = useHistory()
    const {signUp} = useAuth()
    const [credential, setCredential] = useState({email: '', password: '', cpassword: ''})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (credential.password !== credential.cpassword) {
            return setError('Password do not match');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(credential.email, credential.password);
            history.push('/')
        } catch (e) {
            setError('Failed to create an account');
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
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSignUp}>
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
                                    <label>Password Confirmation</label>
                                    <input type="password" name="cpassword" className="form-control"
                                           value={credential.cpassword} onChange={handleChange} required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <p className="text-center mt-3">Already have an account? <Link to={'/login'}>Login</Link></p>
                </div>
            </div>
        </div>
    </>
}

export default SignUp
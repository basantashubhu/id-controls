import firebase from "../firebase";
import {useState} from "react";

const Contact = () => {
    const [formData, setFormData] = useState({name : '', subject : '', phone : '', message : ''})
    const [validPhone, setValidPhone] = useState(false)
    const [message, setMessage] = useState({type : 'danger', message : ''})
    const [loading, setLoading] = useState(false)
    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
        if (e.target.name === 'phone') {
            setValidPhone(e.target.checkValidity())
        }
    };
    const handleFormSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true)
            setMessage({})
            await firebase.firestore().collection('enquiries').add(formData)
            setLoading(false)
            setFormData({name : '', subject : '', phone : '', message : ''})
            setMessage({type : 'success', message : 'Your query is submitted successfully. Thank you for reaching us.'})
        } catch (e) {
            setLoading(false)
            setMessage({type : 'danger', message : e.message})
        }
    };
    return <main>
        <section className="container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Contact Us</h1>
                    <form className="mt-5" onSubmit={handleFormSubmit}>
                        <div className={`alert alert-${message.type}`} hidden={!message.message}>{message.message}</div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control"
                                   required={true} onChange={handleInputChange} value={formData.name}/>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <div className="position-relative">
                                <span className={`valid-phone ${validPhone ? 'valid' : 'invalid'}`}/>
                            </div>
                            <input type="tel" name="phone" className="form-control" pattern={`[0-9]{3}-[0-9]{3}-[0-9]{4}`}
                                   required={true} onChange={handleInputChange} value={formData.phone} maxLength={13} placeholder="988-988-9888"/>
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" name="subject" className="form-control"
                                   required={true} onChange={handleInputChange} value={formData.subject}/>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea name="message" className="form-control" placeholder="Your query here"
                                   required={true} onChange={handleInputChange} value={formData.message}/>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>
}

export default Contact
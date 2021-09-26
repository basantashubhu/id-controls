import firebase from '../firebase'
import {useEffect, useState} from "react";

const Report = ({location}) => {
    const [diseases, setDiseases] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState({name : '', address : '', disease : ''})
    const [message, setMessage] = useState({type : 'danger', message : ''})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        return firebase.firestore().collection('diseases').onSnapshot(snap => {
            setDiseases([...new Set(snap.docs.map(d => d.data()))]);
        });
    }, [diseases.length])
    useEffect(() => {
        return firebase.firestore().collection('cases').onSnapshot(snap => {
            setAddresses([...new Set(snap.docs.map(c => c.data().address))]);
        });
    },[addresses.length])
    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };
    const handleFormSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true)
            setMessage({})
            await firebase.firestore().collection('cases').add(formData)
            setLoading(false)
            setFormData({name : '', address : '', disease : ''})
            setMessage({type : 'success', message : 'Your case is submitted successfully.'})
        } catch (e) {
            setLoading(false)
            setMessage({type : 'danger', message : e.message})
        }
    };
    const search = new URLSearchParams(location.search),
        id = search.get('disease') || '';
    useEffect(() => {
        setFormData({...formData, disease : id})
    }, [id, formData])
    return <main>
        <section className="container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Report a case</h1>
                    <form className="mt-5" onSubmit={handleFormSubmit}>
                        <div className={`alert alert-${message.type}`} hidden={!message.message}>{message.message}</div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control"
                                   required={true} onChange={handleInputChange} value={formData.name}/>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" className="form-control" list="case-addresses"
                                   required={true} onChange={handleInputChange} value={formData.address}/>
                            <datalist id="case-addresses">
                                {addresses.map((addr,index) => <option value={addr} key={index}/>)}
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label>Disease</label>
                            <select name="disease" className="form-control"
                                    required={true} onChange={handleInputChange} value={formData.disease}>
                                <option value="">Choose</option>
                                {diseases.map((d, index) => {
                                    return <option value={d.id} key={index}>{d.disease}</option>
                                })}
                            </select>
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

export default Report
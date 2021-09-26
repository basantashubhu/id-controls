import {Link} from "react-router-dom";
import imgIDPrevent from '../assets/images/id-prevent.jpg'
import imgIDChamp from '../assets/images/id-champ.jpg'
import {useEffect, useState} from "react";
import firebase from "../firebase";

const Home = () => {
    const [diseases, setDiseases] = useState([]);
    useEffect(() => {
        return firebase.firestore().collection('diseases').onSnapshot(snap => {
            setDiseases(snap.docs.map(doc => doc.data()))
        });
    }, [diseases.length]);
    useEffect(() => {
        if (diseases.length > 0) {
            localStorage.setItem('diseases', JSON.stringify(diseases.map(d => ({...d, desc : ''}))));
        } else {
            const items = localStorage.getItem('diseases') || '[]';
            setDiseases(JSON.parse(items))
        }
    }, [diseases.length])

    return <main>
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">What are infectious diseases?</h1>
                    <p className="lead text-muted">Infectious diseases are disorders caused by organisms — such as bacteria, viruses, fungi or parasites. Many organisms live in and on our bodies. They're normally harmless or even helpful. But under certain conditions, some organisms may cause disease.</p>
                    <p className="lead text-muted">Some infectious diseases can be passed from person to person. Some are transmitted by insects or other animals. And you may get others by consuming contaminated food or water or being exposed to organisms in the environment.</p>
                    <p>
                        <a href="https://www.edcd.gov.np/resources/download/infectious-disease-control-guideline" target="_blank"
                           className="btn btn-primary my-2" rel="noreferrer">Know More</a> &nbsp;
                        <Link to="/report-a-case" className="btn btn-warning my-2">Report a case</Link>
                    </p>
                </div>
            </div>
        </section>
        <div className="album py-5 bg-light">
            <div className="container">
                <h3 className="text-center">Infectious Disease Outbreaks in Nepal</h3>
                <hr className="my-5"/>
            </div>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {diseases?.map(({disease, outbreak_start, disease_code, images, desc : {agent_text}}, index) => (
                        <div className="col" key={index}>
                            <div className="card shadow-sm">
                                {images?.filter((img, i) => i === 0).map(({url, alt_text}, i) => (
                                    <img key={i} src={url} alt={alt_text}/>
                                ))}
                                <div className="card-body">
                                    <h4>{disease}</h4>
                                    <p className="card-text" dangerouslySetInnerHTML={{__html: agent_text}}/>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/disease/' + disease_code} className="btn btn-sm btn-secondary">Read more</Link>
                                        </div>
                                        <small className="text-muted">{outbreak_start}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="container section">
            <div className="row">
                <div className="col-md-6">
                    <h4>
                        Protect yourself and others from COVID-19
                    </h4>
                    <p>
                        If COVID-19 is spreading in your community, stay safe by taking some simple precautions, such as physical distancing,
                        wearing a mask, keeping rooms well ventilated, avoiding crowds, cleaning your hands, and coughing into a bent elbow or tissue.
                        Check local advice where you live and work. <strong>Do it all!</strong>
                    </p>
                    <p>
                        If COVID-19 is spreading in your community, stay safe by taking some simple precautions, such as physical distancing,
                        wearing a mask, keeping rooms well ventilated, avoiding crowds, cleaning your hands, and coughing into a bent elbow or tissue.
                        Check local advice where you live and work. <strong>Do it all!</strong>
                    </p>
                </div>
                <div className="col-md-6">
                    <img src={imgIDPrevent} alt="Protect yourself and others from COVID-19"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={imgIDChamp} alt="Protect yourself and others from COVID-19"/>
                </div>
                <div className="col-md-6">
                    <h4>
                        Protect yourself and others from COVID-19
                    </h4>
                    <p>
                        If COVID-19 is spreading in your community, stay safe by taking some simple precautions, such as physical distancing,
                        wearing a mask, keeping rooms well ventilated, avoiding crowds, cleaning your hands, and coughing into a bent elbow or tissue.
                        Check local advice where you live and work. <strong>Do it all!</strong>
                    </p>
                </div>
            </div>
        </div>
    </main>
}

export default Home
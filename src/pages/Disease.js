import {useEffect, useState} from "react";
import firebase from "../firebase";
import {Link} from "react-router-dom";

const Disease = ({match: {params: {id}}}) => {
    const [disease, setDisease] = useState({})

    useEffect(() => {
        return firebase.firestore().collection('diseases').where('id', '==', Number(id)).onSnapshot(snapshot => {
            snapshot.docs.map(d => setDisease(d.data()));
        });
    }, [id])

    return <section>
        <div className="px-4 py-5 my-5">
            <div className="text-center">
                {disease?.images?.filter((img, i) => i === 0).map(({url, alt_text, title, description}, i) => (
                    <img key={i} src={url} alt={alt_text} className="img-fluid"/>
                ))}
            </div>
            <div className="col-lg-8 mx-auto">
                <h1 className="display-5 fw-bold">{disease?.disease}</h1>
                <p className="lead mb-4">{disease?.desc?.adult_therapy}</p>
                <p className="lead mb-4" dangerouslySetInnerHTML={{__html: disease?.desc?.clinical_note?.split('\n').join('<br/>')}}/>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to={`/report-a-case?disease=${disease.id}`} className="btn btn-warning btn-lg px-4 gap-3">Report a case</Link>
                </div>
            </div>
        </div>
        <div className="container my-5">
            <h4>Synonyms : </h4>
            {disease?.desc?.synonyms?.map((syno, i) => (
                <span key={i}>{syno}, </span>
            ))}
            <hr/>
        </div>
        <div className="container my-5">
            <h4>Clinical Hint : </h4>
            <p dangerouslySetInnerHTML={{__html: disease?.desc?.clinical_hints?.split('\n').join('<br/>')}}/>
            <hr/>
        </div>
        <div className="container">
            {disease?.images?.filter((img, i) => i !== 0).map(({url, alt_text, title, description, source}, i) => (
                <div key={i}>
                    <div className="row align-items-center">
                        <div className={`col-md-7 order-1 order-md-${ i % 2 === 0 ? 0 : 1 }`}>
                            <h2 className="featurette-heading mt-2" dangerouslySetInnerHTML={{__html: title}}/>
                            <p className="lead" dangerouslySetInnerHTML={{__html: description}}/>
                            <p className="mt-5 fst-italic">Source : {source}</p>
                        </div>
                        <div className={`col-md-5 order-0 order-md-${ i % 2 === 0 ? 1 : 0 }`}>
                            <img src={url} alt={alt_text} className={'img-fluid'}/>
                        </div>
                    </div>
                    <hr className="featurette-divider my-5"/>
                </div>
            ))}
        </div>
    </section>
}

export default Disease
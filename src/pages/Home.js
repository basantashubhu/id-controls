import diseases from '../data/diseases.json'
import {Link} from "react-router-dom";

const Home = () => {
    console.log(diseases)
    return <main>
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">What are infectious diseases?</h1>
                    <p className="lead text-muted">Something short and leading about the collection below—its contents,
                        the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it
                        entirely.</p>
                    <p>
                        <a href="#" className="btn btn-primary my-2">Know More</a> &nbsp;
                        <a href="#" className="btn btn-warning my-2">Report a case</a>
                    </p>
                </div>
            </div>
        </section>
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {diseases?.data?.map(({disease, outbreak_start, disease_code, images, desc : {agent_text}}) => (
                        <div className="col" key={disease_code}>
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
    </main>
}

export default Home
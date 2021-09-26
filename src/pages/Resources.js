import {useEffect, useState} from "react";
import axios from "axios";

const Resources = () => {
    const [cache, setCache] = useState([])
    const [data, setData] = useState([])
    const [resources, setResources] = useState([])
    const [pagination, setPagination] = useState({
        total : 0,
        currentPage : 1,
        perPage : 50,
        lastPage() {
            return Math.ceil(this.total/this.perPage)
        }
    })
    useEffect(() => {
        axios.get('https://data.askbhunte.com/api/v1/resources/health').then(response => {
            setData(response.data);
            setCache(response.data);
        }).catch(err => console.error(err))
    }, [])
    useEffect(() => {
        setPagination({
            ...pagination,
            total : data.length
        })
        setResources(data.slice(0, pagination.perPage))
    }, [data.length])
    useEffect(() => {
        const offset = (pagination.currentPage - 1) * pagination.perPage;
        setResources(data.slice(offset, offset + pagination.perPage))
    }, [pagination.currentPage])
    const goToPage = currentPage => {
        setPagination({...pagination, currentPage})
    }
    const pageVisibility = page => {
        return page >= pagination.currentPage - 4 && page <= pagination.currentPage + 4;
    }
    const leftPages = () => {
        return (pagination.currentPage - 5) < 1;
    }
    const rightPages = () => {
        return (pagination.currentPage + 5) > pagination.lastPage();
    }
    const handleSearch = e => {
        setData(cache.filter(d => d.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    return <main>
        <section className="container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Health Resources in Nepal</h1>
                </div>
                <div className="col-lg-8 mx-auto">
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Search here" onChange={handleSearch}/>
                        </div>
                    </div>
                    <br/>
                    <table className="table table-striped">
                        <tr>
                            <th>S.N.</th>
                            <th>Name</th>
                            <th>Coordinates</th>
                        </tr>
                        <tbody>
                        {!resources.length ? <tr>
                            <td colSpan={3} className="text-center">No Data</td>
                        </tr>
                            : resources.map((resource, index) => {
                            const [lng, lat] = resource.point.coordinates;
                            const query = resource.title.indexOf(',') !== -1 ? resource.title : lat + ',' + lng;
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{resource.title}</td>
                                <td>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${query}&z=5`} rel="noreferrer"
                                       target="_blank">{lat} : {lng}</a>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                                <button type="button" className="page-link" onClick={() => goToPage(1)}>&lt;&lt;</button>
                            </li>
                            <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                                <button type="button" className="page-link" onClick={() => goToPage(pagination.currentPage - 1)}>Previous</button>
                            </li>
                            <li className={`page-item disabled`} hidden={leftPages()}>
                                <button type="button" className="page-link">...</button>
                            </li>
                            {[...new Array(Math.ceil(pagination.total/pagination.perPage))].map((v,index) => {
                                return <li key={index} hidden={!pageVisibility(index + 1)} className={`page-item ${(index + 1) === pagination.currentPage ? 'active' : ''}`}>
                                    <button type="button" className="page-link" onClick={() => goToPage(index + 1)}>{index + 1}</button>
                                </li>
                            })}
                            <li className={`page-item disabled`} hidden={rightPages()}>
                                <button type="button" className="page-link">...</button>
                            </li>
                            <li className={`page-item ${Math.ceil(pagination.total/pagination.perPage) === pagination.currentPage ? 'disabled' : ''}`}>
                                <button type="button" className="page-link" onClick={() => goToPage(pagination.currentPage + 1)}>Next</button>
                            </li>
                            <li className={`page-item ${Math.ceil(pagination.total/pagination.perPage) === pagination.currentPage ? 'disabled' : ''}`}>
                                <button type="button" className="page-link" onClick={() => goToPage(Math.ceil(pagination.total/pagination.perPage))}>&gt;&gt;</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </main>
}

export default Resources
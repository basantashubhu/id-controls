import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const Resources = () => {
    const [cache, setCache] = useState([])
    const [data, setData] = useState([])
    const [resources, setResources] = useState([])
    const [pagination, setPagination] = useState({
        total : 0,
        currentPage : 1,
        perPage : 50
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
                    <Pagination pagination={pagination} handlePageChange={goToPage} />
                </div>
            </div>
        </section>
    </main>
}

export default Resources
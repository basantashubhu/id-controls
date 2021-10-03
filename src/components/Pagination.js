const Pagination = ({pagination : { currentPage, perPage, total }, handlePageChange}) => {
    const lastPage = () => {
        return Math.ceil(total / perPage)
    }
    const pageVisibility = page => {
        return page >= currentPage - 4 && page <= currentPage + 4;
    }
    const leftPages = () => {
        return (currentPage - 5) < 1;
    }
    const rightPages = () => {
        return (currentPage + 5) > lastPage();
    }
    return <nav aria-label="...">
        <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={() => handlePageChange(1)}>&lt;&lt;</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            <li className={`page-item disabled`} hidden={leftPages()}>
                <button type="button" className="page-link">...</button>
            </li>
            {[...new Array(Math.ceil(total / perPage))].map((v, index) => {
                return <li key={index} hidden={!pageVisibility(index + 1)} className={`page-item ${(index + 1) === currentPage ? 'active' : ''}`}>
                    <button type="button" className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                </li>
            })}
            <li className={`page-item disabled`} hidden={rightPages()}>
                <button type="button" className="page-link">...</button>
            </li>
            <li className={`page-item ${Math.ceil(total / perPage) === currentPage ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
            <li className={`page-item ${Math.ceil(total / perPage) === currentPage ? 'disabled' : ''}`}>
                <button type="button" className="page-link" onClick={() => handlePageChange(Math.ceil(total / perPage))}>&gt;&gt;</button>
            </li>
        </ul>
    </nav>
}

export default Pagination
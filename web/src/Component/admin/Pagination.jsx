import React from 'react'
import './Pagination.css'

const Pagination = ({productsPerPage, totalProducts, pagination, currentPage}) => {
    const pageNumbers =[]
     
    for(let i =1;i <= Math.ceil(totalProducts / productsPerPage);i++){
             pageNumbers.push(i)
    }

    return (
    <>
    <nav>
        <ul className='pagination'>
               
               {
                pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button className='page-link btn btn-success' onClick={() => pagination(number)}>{number}</button>
                    </li>
                ))
               }
             
        </ul>
    </nav>
    </>
  )
}

export default Pagination
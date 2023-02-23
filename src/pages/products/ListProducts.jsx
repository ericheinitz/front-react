import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import LoadingTable from '../../components/loadings/LoadingTable'
import Breadcrumbs from '../../components/Breadcrumbs'

const ListProducts = () => {
    const links = [{ label: 'Home', path: '/' }, { label: 'Products', path: null },];
    const [products, setProducts] = useState([])
    const [loading, setLoadingTable] = useState(false)

    const [searchName, setSearchName] = useState('')
    const [searchDescription, setSearchDescription] = useState('')
    const [searchPrice, setSearchPrice] = useState('')

    const [sortField, setSortField] = useState('')
    const [sortDirection, setSortDirection] = useState('desc')
    const [sortColumn, setSortColumn] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(5);

    const getAllProducts = async () => {
        setLoadingTable(true)
        const response = await axios.get('api/products')
        const sortedProducts = response.data.slice().sort((a, b) => b.id - a.id);
        setProducts(sortedProducts);
        setLoadingTable(false)
    }

    const deleteProduct = async (id) => {
        await axios.delete(`api/product/${id}`)
        getAllProducts()
    }

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
        setSortColumn(field)
    }

    const renderArrow = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? <span> A</span> : <span> D</span>
        }
    }

    const sort = (products) => {
        if (sortField) {
            const factor = sortDirection === 'asc' ? 1 : -1
            products = products.slice().sort((a, b) => {
                if (a[sortField] < b[sortField]) return -1 * factor
                if (a[sortField] > b[sortField]) return 1 * factor
                return 0
            })
        }
        return products
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchName.toLowerCase()) &&
            product.description.toLowerCase().includes(searchDescription.toLowerCase()) &&
            product.price.toString().toLowerCase().includes(searchPrice.toLowerCase())
    })

    const sortedProducts = sort(filteredProducts)
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);



    return (

        <div className='mx-80'>
            {loading ? <LoadingTable /> : (
                <>
                    <Breadcrumbs links={links} />
                    <div className="card bg-base-300 shadow-2xl">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h1></h1>
                                <Link to='/product' className='btn btn-sm btn-outline btn-success btn-wide shadow-md shadow-cyan-500/50 opacity-75'>Create</Link>
                            </div>
                            <div className="divider">List Products</div>
                            <div className="flex items-center justify-between">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Search name:</span>
                                    </label>
                                    <input type="text" placeholder="Search..." className="input input-bordered input-sm input-accent w-full max-w-xs mx-1" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Search description</span>
                                    </label>
                                    <input type="text" placeholder="Search..." className="input input-bordered input-sm input-accent w-full max-w-xs mx-1" value={searchDescription} onChange={(e) => setSearchDescription(e.target.value)} />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Search price</span>
                                    </label>
                                    <input type="text" placeholder="Search..." className="input input-bordered input-sm input-accent w-full max-w-xs mx-1" value={searchPrice} onChange={(e) => setSearchPrice(e.target.value)} />
                                </div>
                            </div>
                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th className='text-center' onClick={() => handleSort('id')}>ID {renderArrow('id')}</th>
                                        <th onClick={() => handleSort('name')}>Name {renderArrow('name')}</th>
                                        <th onClick={() => handleSort('description')}>Description {renderArrow('description')}</th>
                                        <th onClick={() => handleSort('price')}>Price {renderArrow('price')}</th>
                                        <th className='text-center'>Stock</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className='text-center'>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td className='text-center'>{product.stock}</td>
                                            <td className='text-center'>
                                                <Link to={`/product/${product.id}`} className='btn btn-sm btn-outline btn-info opacity-75'>Show</Link>
                                                <Link to={`/product/${product.id}/edit`} className='btn btn-sm btn-outline btn-warning opacity-75 mx-2'>Edit</Link>
                                                <button onClick={() => deleteProduct(product.id)} className='btn btn-sm btn-outline btn-error opacity-75'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-between">
                                <div className="mb-2 md:mb-0">
                                    <label htmlFor="products-per-page" className="mr-2">Products per page:</label>
                                    <select
                                        id="products-per-page"
                                        value={productsPerPage}
                                        onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
                                        className='input input-bordered input-sm'>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                                <div className="btn-group">
                                    <button className="btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                        Previous page
                                    </button>
                                    {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }).map((_, index) => {
                                        if (index + 1 === currentPage) {
                                            return (
                                                <button key={index} className="btn btn-disabled active" onClick={() => handlePageChange(index + 1)} disabled>
                                                    {index + 1}
                                                </button>
                                            );
                                        } else if (index === 0 || index === Math.ceil(sortedProducts.length / productsPerPage) - 1 || (index >= currentPage - 2 && index <= currentPage)) {
                                            return (
                                                <button key={index} className="btn" onClick={() => handlePageChange(index + 1)}>
                                                    {index + 1}
                                                </button>
                                            );
                                        } else if (index === 1 || index === Math.ceil(sortedProducts.length / productsPerPage) - 2 || (index >= currentPage - 3 && index <= currentPage + 1)) {
                                            return <button key={index} className="btn btn-disabled">...</button>;
                                        } else {
                                            return null;
                                        }
                                    })}
                                    <button className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ListProducts
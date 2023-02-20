import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import LoadingTable from '../../components/loadings/LoadingTable'
import Breadcrumbs from '../../components/Breadcrumbs'

const ListProducts = () => {
    const links = [
        { label: 'Home', path: '/' },
        { label: 'Products', path: null },
    ];
    const [products, setProducts] = useState([])
    const [loading, setLoadingTable] = useState(false)
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

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className='mx-80'>
            {loading ? (
                <>
                    <Breadcrumbs links={links} />
                    <LoadingTable />
                </>
            ) : (
                <>
                    <Breadcrumbs links={links} />
                    <div className="card bg-base-300 shadow-2xl shadow-emerald-900">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title">Products</h2>
                                <Link to='/product' className='btn btn-success'>Create</Link>
                            </div>

                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Link to={`/product/${product.id}`} className='btn btn-sm btn-info mx-2'>Show</Link>
                                                <Link to={`/product/${product.id}/edit`} className='btn btn-sm btn-warning mx-2'>Edit</Link>
                                                <button onClick={() => deleteProduct(product.id)} className='btn btn-sm btn-error'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default ListProducts
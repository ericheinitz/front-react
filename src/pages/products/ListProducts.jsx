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
                    <div className="card bg-base-300 shadow-2xl">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title">Products</h2>
                                <Link to='/product' className='btn btn-sm btn-outline btn-success btn-wide shadow-md shadow-cyan-500/50 opacity-75'>Create</Link>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Search here" className="input input-bordered input-sm input-accent w-full max-w-xs mx-1" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input type="text" placeholder="Search here" className="input input-bordered input-sm input-accent w-full max-w-xs mx-1" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input type="text" placeholder="Search here" className="input input-bordered input-sm input-accent w-full max-w-xs mx-1" />
                                </div>
                            </div>

                            <table className="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th className='text-center'>Id</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th className='text-center'>Stock</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
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
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default ListProducts
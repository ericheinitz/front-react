import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import Breadcrumbs from '../../components/Breadcrumbs'
import LoadingTable from '../../components/loadings/LoadingTable'

const CreateEditProduct = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const [product, setProduct] = useState(null);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/Products' },
    { label: isEditing ? 'Edit Product' : 'Create Product', path: null },
  ];

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`api/product/${id}`);
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
      } catch (error) {
        console.error(error);
      }
    };
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  const createProduct = async () => {
    await axios.post('api/product', {
      name,
      description,
      price,
      stock,
    })
  }

  const updateProduct = async () => {
    await axios.put(`api/product/${id}`, {
      name,
      description,
      price,
      stock,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct();
    } else {
      await createProduct();
    }
  }


  return (
    <>
      {isEditing && !product ? (
        <>
          <Breadcrumbs links={links} />
          <LoadingTable />
        </>
      ) : (
        <>
          <Breadcrumbs links={links} />
          <div className='mx-20'>
            <form onSubmit={onSubmit}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  placeholder='Name'
                  className='input input-bordered'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <input
                  type='text'
                  placeholder='Description'
                  className='input input-bordered'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Price</span>
                </label>
                <input
                  type='number'
                  placeholder='Price'
                  className='input input-bordered'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Stock</span>
                </label>
                <input
                  type='number'
                  placeholder='Stock'
                  className='input input-bordered'
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <button className='btn btn-primary'>
                  {isEditing ? 'Update' : 'Create'}
                </button>
                <Link to='/products' className='btn'>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default CreateEditProduct

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import Breadcrumbs from '../../components/Breadcrumbs'
import LoadingShow from '../../components/loadings/LoadingShow'
import ListProducts from './ListProducts'

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoadingShow] = useState(false)
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Show Product', path: null },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingShow(true)
      try {
        const { data } = await axios.get(`api/product/${id}`);
        setProduct(data);
        setLoadingShow(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className='mx-80'>
      {loading ? (
        <>
          <Breadcrumbs links={links} />
          <LoadingShow />
        </>
      ) : (
        <>
          <Breadcrumbs links={links} />
          {product && (
            <div className='card bg-base-300 shadow-2xl'>
              <div className='card-body'>
                <div className="flex items-center justify-between">
                  <h2 className='card-title'>{product.name}</h2>
                  <Link to={`/product/${product.id}/edit`} className='btn btn-sm btn-outline btn-warning'>
                    Edit
                  </Link>
                </div>
                <p className='card-text'>{product.description}</p>
                <p className='card-text'>Price: {product.price}</p>
                <p className='card-text'>Stock: {product.stock}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ShowProduct
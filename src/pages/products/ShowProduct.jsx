import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import Breadcrumbs from '../../components/Breadcrumbs'

const ShowProduct = () => {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/Products' },
    { label: 'Show Product', path: null },
  ];

  return (
    <>
      <Breadcrumbs links={links} />
      <div className='mx-20'>ShowProduct</div>
    </>
  )
}

export default ShowProduct
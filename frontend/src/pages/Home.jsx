import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {keyword ? (
        <Link to='/' className='btn btn-light mb-4'>
          Reset Search
        </Link>
      ) : (
        <ProductCarousel />
      )}
      <h1>{keyword ? `Search results for '${keyword}'` : 'Latest Products'}</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          variant='danger'
          children={<div>{error?.data?.message || error.error}</div>}
        />
      ) : (
        <>
          <Row>
            {data.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center mt-4'>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';

const ProductListPage = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (
      window.confirm(
        'You are creating new sample product. Are you sure you want to proceed?'
      )
    ) {
      try {
        await createProduct();
        refetch();
        toast.success('Created new sample product');
      } catch (error) {
        toast.error('Something went wrong: ' + error);
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (error) {
        toast.error('Something went wrong: ' + error);
        console.error(error);
      }
    }
  };

  return (
    <>
      <Meta title='Admin - Products' />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button
            variant='dark'
            className='btn-sm m-3 d-flex align-items-center gap-2'
            onClick={handleAddProduct}
            disabled={loadingCreate}
          >
            {loadingCreate ? (
              <Loader size='20px' />
            ) : (
              <>
                <FaPlus /> Add Product
              </>
            )}
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    {product.category?.name
                      ? product.category?.name
                      : 'Uncategorized'}
                  </td>
                  <td>
                    {product.brand?.name ? product.brand?.name : 'Unbranded'}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => handleDelete(product._id)}
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? <Loader size='20px' /> : <FaTrash />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='d-flex justify-content-center mt-4'>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductListPage;

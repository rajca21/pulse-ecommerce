import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { useGetCategoriesQuery } from '../../slices/categoriesApiSlice';
import { useGetBrandsQuery } from '../../slices/brandsApiSlice';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';

const ProductEditPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);

  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: loadingCategories,
    error: categoryError,
  } = useGetCategoriesQuery();
  const {
    data: brands,
    isLoading: loadingBrands,
    error: brandError,
  } = useGetBrandsQuery();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error('Something went wrong: ' + result.error);
    } else {
      toast.success('Product updated successfully');
      navigate('/admin/productlist');
    }
  };

  const handleUploadFile = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error('Something went wrong: ' + error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand?._id || brands ? brands[0]?._id : null);
      setCategory(
        product.category?._id || categories ? categories[0]?._id : null
      );
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, brands, categories]);

  return (
    <>
      <Meta title='Admin - Edit Product' />
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {productLoading ? (
          <Loader />
        ) : productError ? (
          <Message variant='danger'>
            {productError?.data?.message || productError.error}
          </Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter products name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                min={0}
                type='number'
                placeholder='Enter products price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step='.01'
              ></Form.Control>
            </Form.Group>

            {loadingUpload ? (
              <Loader />
            ) : (
              <Form.Group controlId='image' className='my-2'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled
                ></Form.Control>
                <Form.Control
                  type='file'
                  label='Choose file'
                  onChange={handleUploadFile}
                ></Form.Control>
              </Form.Group>
            )}

            {loadingBrands ? (
              <Loader />
            ) : brandError ? (
              <Message variant='danger'>Could not fetch brands</Message>
            ) : (
              <Form.Group controlId='brand' className='my-2'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  as='select'
                  value={brand ? brand : 'Unbranded'}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                >
                  {brands?.map((brand, idx) => (
                    <option key={idx} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            {loadingCategories ? (
              <Loader />
            ) : categoryError ? (
              <Message variant='danger'>Could not fetch categories</Message>
            ) : (
              <Form.Group controlId='category' className='my-2'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as='select'
                  value={category ? category : 'Uncategorized'}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories?.map((category, idx) => (
                    <option key={idx} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                min={0}
                type='number'
                placeholder='Enter products count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter products description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='dark'
              className='my-2'
              disabled={loadingUpdate}
            >
              {loadingUpdate ? <Loader size='20px' /> : 'Update Product'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;

import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: productId } = useParams();
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate('/cart');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (error) {
      const errorMessage =
        error.status === 400 ? ': You already reviewed this product' : '';
      toast.error('Something went wrong' + errorMessage);
      console.error(error);
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          variant='danger'
          children={<div>{error?.data?.message || error.error}</div>}
        />
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product?.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} 
                ${product?.numReviews === 1 ? 'review' : 'reviews'}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className='text-center'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product?.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      variant='dark'
                      disabled={product?.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews?.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <strong>{review.name}</strong>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Add a Review</h4>
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId='rating' className='my-2'>
                        <FormLabel>Rating</FormLabel>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment' className='my-2'>
                        <FormLabel>Comment</FormLabel>
                        <Form.Control
                          as='textarea'
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder='Write something about this product'
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type='submit'
                        variant='dark'
                        disabled={loadingCreateReview}
                      >
                        {loadingCreateReview ? (
                          <Loader size='20px' />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please{' '}
                      <Link style={{ textDecoration: 'underline' }} to='/login'>
                        sign in
                      </Link>{' '}
                      to add a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;

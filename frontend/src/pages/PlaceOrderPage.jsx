import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  useCreateOrderMutation,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import Meta from '../components/Meta';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      if (
        cart.paymentMethod === 'Credit Card' ||
        cart.paymentMethod === 'PayPal'
      ) {
        await payOrder(res._id);
      }

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error('Something went wrong: ' + error);
    }
  };

  useEffect(() => {
    if (!cart?.shippingAddress?.address) {
      navigate('/shipping');
    } else if (!cart?.paymentMethod) {
      navigate('/payment');
    }
  }, [cart?.paymentMethod, cart?.shippingAddress?.address, navigate]);

  return (
    <>
      <Meta title='Place Order' />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city}{' '}
                {cart.shippingAddress?.zipCode}, {cart.shippingAddress?.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className='mt-3'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Items:</strong>
                  </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shipping:</strong>
                  </Col>
                  <Col>
                    {cart.shippingPrice && cart.shippingPrice > 0
                      ? `$${cart.shippingPrice}`
                      : 'Free'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Tax:</strong>
                  </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              {error && (
                <Message variant='danger'>
                  {error?.data?.message || error.error}
                </Message>
              )}
            </ListGroup.Item>
          </Card>
          <div className='mt-2 d-flex justify-content-end'>
            <Button
              type='button'
              disabled={cart.cartItems.length === 0 || isLoading || error}
              variant='dark'
              onClick={handlePlaceOrder}
            >
              {isLoading ? <Loader size='20px' /> : 'Place Order'}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;

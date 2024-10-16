import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleDeliver = async () => {
    try {
      await deliverOrder(orderId);

      if (order.paymentMethod === 'On delivery') {
        await payOrder(orderId);
      }

      refetch();
      toast.success('Order marked as Delivered');
    } catch (error) {
      toast.error('Something went wrong: ' + error);
      console.error(error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <Meta title={order ? 'Order ' + order._id : 'Order'} />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='py-2'>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} {order.shippingAddress.zipCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {new Date(order.deliveredAt).toLocaleString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='py-2'>Payment</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid at {new Date(order.paidAt).toLocaleString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='py-2'>Order Items</h2>
              <ListGroup variant='flush'>
                {order.orderItems.map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shipping:</strong>
                  </Col>
                  <Col>
                    {order.shippingPrice && order.shippingPrice > 0
                      ? `$${order.shippingPrice}`
                      : 'Free'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Tax:</strong>
                  </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {userInfo && userInfo.isAdmin && !order.isDelivered && (
            <div className='d-flex justify-content-end my-2'>
              <Button
                type='button'
                onClick={handleDeliver}
                variant='dark'
                disabled={loadingDeliver || loadingPay}
              >
                {loadingDeliver || loadingPay ? (
                  <Loader size='20px' />
                ) : (
                  'Mark as Delivered'
                )}
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;

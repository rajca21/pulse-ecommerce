import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FaPaypal, FaRegCreditCard } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

import { savePaymentMethod } from '../slices/cartSlice';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const handlePayment = (payment) => {
    dispatch(savePaymentMethod(payment));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  return (
    <>
      <Meta title='Payment' />
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1 style={{ marginBottom: '20px' }}>Payment Method</h1>
        <div className='d-grid gap-2'>
          <Button
            variant='primary'
            size='lg'
            className='d-flex align-items-center justify-content-center gap-2'
            type='button'
            onClick={() => handlePayment('PayPal')}
          >
            <FaPaypal />
            PayPal
          </Button>
          <Button
            variant='warning'
            size='lg'
            className='d-flex align-items-center justify-content-center gap-2'
            type='button'
            onClick={() => handlePayment('Credit Card')}
          >
            <FaRegCreditCard />
            Credit Card
          </Button>
          <Button
            variant='secondary'
            size='lg'
            className='d-flex align-items-center justify-content-center gap-2'
            type='button'
            onClick={() => handlePayment('On delivery')}
          >
            <MdLocalShipping />
            On Delivery
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

export default PaymentPage;

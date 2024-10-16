import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getAllCountries, getFlagEmoji } from '../utils/countriesApi';
import { saveShippingAddress } from '../slices/cartSlice';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [allCountries, setAllCountries] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address) {
      toast.error('Provide the Shipping Address!');
      return;
    }
    if (!city) {
      toast.error('Provide the City!');
      return;
    }
    if (!zipCode) {
      toast.error('Provide the Zip Code!');
      return;
    }
    if (!country) {
      toast.error('Provide the Country!');
      return;
    }

    dispatch(saveShippingAddress({ address, city, zipCode, country }));
    navigate('/payment');
  };

  useEffect(() => {
    const fetchAllCountries = async () => {
      const countries = await getAllCountries();
      setAllCountries(countries.data);
    };

    fetchAllCountries();
  }, []);

  return (
    <>
      <Meta title='Shipping' />
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='address' className='my-2'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city' className='my-2'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='zipCode' className='my-2'>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter zip code'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              as='select'
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {allCountries?.map((country, idx) => (
                <option key={idx} value={country.name}>
                  {getFlagEmoji(country.iso2)} {country.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='dark' className='my-4'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;

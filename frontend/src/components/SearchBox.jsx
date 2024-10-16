import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Cookies from 'js-cookie';

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [cookieKeywords, setCookieKeywords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      const updatedKeywords = [...cookieKeywords, keyword.trim()];
      Cookies.set('keywords', JSON.stringify(updatedKeywords));
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const savedKeywords = Cookies.get('keywords');
    if (savedKeywords) {
      setCookieKeywords(JSON.parse(savedKeywords));
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products'
        className='mr-sm-2 ml-sm-2'
      ></Form.Control>{' '}
      <Button type='submit' variant='outline-success' className='mx-2'>
        <FaSearch />
      </Button>
    </Form>
  );
};
export default SearchBox;

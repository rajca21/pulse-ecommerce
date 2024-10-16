import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Cookies from 'js-cookie';

import { getAmazonProduct } from '../utils/amazonApi';

const AdBanner = () => {
  const [amazonProduct, setAmazonProduct] = useState({});
  const [cookieKeywords, setCookieKeywords] = useState([]);

  useEffect(() => {
    const fetchAd = async () => {
      const savedKeywords = Cookies.get('keywords');
      if (savedKeywords) {
        setCookieKeywords(JSON.parse(savedKeywords));
      }

      if (savedKeywords.length > 0) {
        let randomIndex = 0;
        if (savedKeywords.length > 1) {
          randomIndex = Math.floor(Math.random() * savedKeywords.length);
        }

        const amazonProducts = await getAmazonProduct(
          savedKeywords[randomIndex]
        );

        let randomIndexAd = 0;
        if (amazonProducts?.length > 0) {
          randomIndexAd = Math.floor(Math.random() * amazonProducts?.length);
          setAmazonProduct(amazonProducts[randomIndexAd]);
          console.log(amazonProducts[randomIndexAd]);
        }
      }
    };

    fetchAd();
  }, []);

  return (
    <>
      {cookieKeywords.length > 0 ? (
        <Container style={{ backgroundColor: '#fafafa', borderRadius: '20px' }}>
          <div
            style={{
              position: 'relative',
              paddingTop: '5px',
            }}
          >
            <strong>Ad</strong>
          </div>
          <a
            target='_blank'
            rel='noreferrer'
            href={
              amazonProduct?.product_url ||
              'https://www.amazon.com/?&tag=googleglobalp-20&ref=pd_sl_7nnedyywlk_e&adgrpid=159651196451&hvpone=&hvptwo=&hvadid=675114638367&hvpos=&hvnetw=g&hvrand=8433556063658405936&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9077168&hvtargid=kwd-10573980&hydadcr=2246_13468515&gad_source=1'
            }
          >
            <Row className='my-3 p-3 rounded'>
              <Col className='d-flex align-items-center justify-content-center'>
                <Image
                  width={100}
                  src={
                    amazonProduct?.product_photo ||
                    'https://static.tnn.in/thumb/msid-112400656,thumbsize-12712,width-1280,height-720,resizemode-75/112400656.jpg?quality=100'
                  }
                />
              </Col>
              <Col className='d-flex flex-column'>
                {amazonProduct?.product_title || 'Amazon'}
                <strong>{amazonProduct?.product_price}</strong>
              </Col>
            </Row>
          </a>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdBanner;

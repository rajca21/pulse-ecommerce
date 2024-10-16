import React from 'react';
import { Badge, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { MdOutlineLocalShipping, MdOutlinePayments } from 'react-icons/md';
import { IoBagCheckOutline, IoCartOutline } from 'react-icons/io5';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='d-flex flex-row justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/cart'>
            <Nav.Link className='d-flex align-items-center'>
              <OverlayTrigger
                delay={{ hide: 150, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Cart</Tooltip>}
                placement='bottom'
              >
                <Badge className='px-4 py-2' pill bg='primary'>
                  <IoCartOutline size={20} />
                </Badge>
              </OverlayTrigger>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <OverlayTrigger
              delay={{ hide: 150, show: 300 }}
              overlay={(props) => <Tooltip {...props}>Cart</Tooltip>}
              placement='bottom'
            >
              <Badge className='px-4 py-2' pill bg='secondary'>
                <IoCartOutline size={20} />
              </Badge>
            </OverlayTrigger>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='d-flex align-items-center'>
              <OverlayTrigger
                delay={{ hide: 150, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Shipping</Tooltip>}
                placement='bottom'
              >
                <Badge className='px-4 py-2' pill bg='primary'>
                  <MdOutlineLocalShipping size={20} />
                </Badge>
              </OverlayTrigger>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <OverlayTrigger
              delay={{ hide: 150, show: 300 }}
              overlay={(props) => <Tooltip {...props}>Shipping</Tooltip>}
              placement='bottom'
            >
              <Badge className='px-4 py-2' pill bg='secondary'>
                <MdOutlineLocalShipping size={20} />
              </Badge>
            </OverlayTrigger>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='d-flex align-items-center'>
              <OverlayTrigger
                delay={{ hide: 150, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Payment</Tooltip>}
                placement='bottom'
              >
                <Badge className='px-4 py-2' pill bg='primary'>
                  <MdOutlinePayments size={20} />
                </Badge>
              </OverlayTrigger>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <OverlayTrigger
              delay={{ hide: 150, show: 300 }}
              overlay={(props) => <Tooltip {...props}>Payment</Tooltip>}
              placement='bottom'
            >
              <Badge className='px-4 py-2' pill bg='secondary'>
                <MdOutlinePayments size={20} />
              </Badge>
            </OverlayTrigger>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link className='d-flex align-items-center'>
              <OverlayTrigger
                delay={{ hide: 150, show: 300 }}
                overlay={(props) => <Tooltip {...props}>Place order</Tooltip>}
                placement='bottom'
              >
                <Badge className='px-4 py-2' pill bg='primary'>
                  <IoBagCheckOutline size={20} />
                </Badge>
              </OverlayTrigger>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <OverlayTrigger
              delay={{ hide: 150, show: 300 }}
              overlay={(props) => <Tooltip {...props}>Place order</Tooltip>}
              placement='bottom'
            >
              <Badge className='px-4 py-2' pill bg='secondary'>
                <IoBagCheckOutline size={20} />
              </Badge>
            </OverlayTrigger>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;

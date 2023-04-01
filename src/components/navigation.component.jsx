import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/wine.png";
import user from "../assets/user.png";
import cart from "../assets/cart.png";
import Footer from './footer.component';
import { Outlet, Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to={`/`} className=''>
            <img
              alt=""
              src={logo}
              width="50"
              height="60"
              className="d-inline-block align-top"
            />
            <div className='display-6'>Devine</div>
          </Link>

          <div className='d-flex justify-content-around'>
            {/* <Nav.Link href="#home"className='px-3'>Home</Nav.Link> */}
            <Nav.Link href="#link" className='px-3'>Our Story</Nav.Link>
            <Link to={`/wines`} className='px-3 '>Shop</Link>
            <Link to={`/add-wine`} className='px-3 '>Add Wines</Link>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
            <Link to={`/register`} className='m-2 '>
              <img alt=""
                    src={user} //user
                    width="30"
                    height="30"
                    className=""/>Register
            </Link>
            <Link to={`/sign-in`} className='m-2'>
              <img alt=""
                    src={user} //user
                    width="30"
                    height="30"
                    className=""/>Log In
            </Link>
            {/* <Nav.Link href="#link" className='m-2'>
              <img alt=""
                  src={user} //user
                  width="30"
                  height="30"
                  className=""/>Log In
            </Nav.Link> */}
            <Link to={`/cart`} className="m-2">
              <img alt=""
                  src={cart} //user
                  width="30"
                  height="30"
                  className=""
              />
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default NavigationBar;
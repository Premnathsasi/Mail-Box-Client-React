import Container from 'react-bootstrap/Container';
import {Button, Nav, Navbar} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/AuthSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.isAuthenticated)

    const logoutHandler = () => {
        dispatch(authActions.logOut())
        navigate('/')
    };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"> 
      <Container>
        <Navbar.Brand className='fs-3 fw-bold'>Mail-Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            {auth && <Nav.Link>
              <Button onClick={logoutHandler}>Logout</Button>
            </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
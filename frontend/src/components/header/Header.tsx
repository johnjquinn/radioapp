import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">Radio App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/albums">Albums</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
};

export default Header;
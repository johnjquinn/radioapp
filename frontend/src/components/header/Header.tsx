import { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../store/middleware/authService";
import { logout, setCredentials } from "../../store/slices/authSlice";

const Header = () => {
    const { userInfo } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 1800000, // 30mins
    })

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">Radio App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/albums">Albums</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    </Nav>
                    <div className='header-status'>
                        <span>
                            {isFetching
                                ? `Fetching your profile...`
                                : userInfo !== null
                                    ? <span style={{ color: "white" }}>{` Logged in as ${userInfo.username} `}</span>
                                    : <span style={{ color: "white" }}> You're not logged in </span>}
                            {userInfo ? (
                                <Button variant="outline-light" size="sm" onClick={() => dispatch(logout())}>
                                    Logout
                                </Button>
                            ) : (
                                <span>
                                    <Link to="/login">
                                        <Button variant="outline-light" size="sm" className='mr-5'>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="outline-light" size="sm">
                                            Register
                                        </Button>
                                    </Link>
                                </span>
                            )}
                        </span>

                    </div>
                </Container>
            </Navbar>
        </header>
    )
};

export default Header;
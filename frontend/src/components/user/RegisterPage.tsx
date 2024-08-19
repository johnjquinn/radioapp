import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from './Error';
import { registerUser } from '../../store/actions/authActions'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'
const RegisterPage = () => {
    const [customError, setCustomError] = useState("");

    const { loading, userInfo, error, success } = useSelector(
        (state: any) => state.auth
    );

    const [data, setData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        role: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo) navigate('/profile');
        if(success) navigate('/login');
    }, [navigate, userInfo, success]);

    const handleSubmit = (event: any) => {
        event.preventDefault()

        if (data.password !== data.confirmPassword) {
            setCustomError('Password mismatch')
            return
        }
        setCustomError("")
        data.email = data.email.toLowerCase()

        dispatch(registerUser(data))
    }


    return (
        <>
            <Container className="d-grid justify-content-lg-center">
            <h1>REGISTER USER</h1>
            <Form onSubmit={handleSubmit}>
                {error && <Error>{error}</Error>}
                {customError && <div className='text-danger'>{customError}</div>}
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required
                        onChange={(event) => setData({ ...data, name: event.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" required
                        onChange={(event) => setData({ ...data, email: event.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" required
                        onChange={(event) => setData({ ...data, username: event.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                        onChange={(event) => setData({ ...data, password: event.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required
                        onChange={(event) => setData({ ...data, confirmPassword: event.target.value })} />
                </Form.Group>

                <Form.Group className='mb-3' controlId='role'>
                    <Form.Label>Check if Admin</Form.Label>
                    <Form.Check 
                        onChange={(event) => setData({ ...data, role: event.target.checked ? "admin" : "user"})}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
};

export default RegisterPage;
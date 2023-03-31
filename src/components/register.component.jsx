import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { createUser,signInUser } from '../utils/firebase.utils';
import { Navigate, } from 'react-router-dom';
import { Container } from 'react-bootstrap';


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [isUserPresent, setUserPresent] = useState(false);
    const onHandleSubmit = async () => {
        console.log("eail",email)
        const userDetails = await createUser(email,password);
        console.log("userDEtails",userDetails)
        if (!userDetails) {
            console.log("no user detials");
            setUserPresent(true);
        }
        setUser(userDetails);
    }
    return(
        <>
        {user && <Navigate to="/" replace={true} />}
        {isUserPresent  && <div>user or email  already exists</div>}
        
        <div className='d-flex flex-column align-items-center border border-dark' style={{margin:'10rem'}}>
            <h1 className='py-3'>Register</h1>
            <div className='py-1'>
                <input type="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='py-1'>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Button  className='my-3' variant="primary" type="submit" onClick={onHandleSubmit}>
                            Submit
            </Button>
        </div>
            
            {/* <Form.Text className="text-muted"></Form.Text>
            <Card className=" m-5 d-flex align-items-center  justify-content-center" >
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <input type="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card> */}
        </>
    )
}

export default Register;
import React, { useState } from 'react'; 
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'; 

const Signup = (props) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault(); // we are preventing the page from refreshing when we submit the form 
        fetch('http://localhost:8000/user/signup', { 
            method: 'POST', 
            body: JSON.stringify({email: email, password: password}), 
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
        .then(data => props.updateToken(data.sessionToken))
    }

    return (
        <div>
            <h1> Signup </h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email"> Email </Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password"> Password </Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
                    <h5> {Input ? 'username is required' : 'nice username'} </h5>
                </FormGroup>
                <Button type="submit"> Signup </Button>
            </Form>
        </div>
    )
}

export default Signup; 
import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                {!this.props.isLogIn ?
                    <Form className="card" id="login" onSubmit={this.props.logIn}>
                        <h2 className="text-center">LOG IN</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Email
</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" id="currentEmail" placeholder="enter your email" value={this.props.currentEmail} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Password
</Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" id="currentPassword" placeholder="Password" valuse={this.props.currentPassword} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>
                        <Button type="submit" variant="primary">Log in</Button>
                    </Form> : ''
                }


            </React.Fragment>
        )
    }
}
export default Login
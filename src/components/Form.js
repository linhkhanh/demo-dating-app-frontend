import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
class SignUp extends React.Component {
    render() {
        return (
            <div className='form'>
                <Form onSubmit={this.props.handleSubmit}>
                    <h2 className="text-center">CREATE NEW ACCOUNT</h2>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Enter email" id="email" value={this.props.email} onChange={this.props.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>UserName</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="string" placeholder="Enter user name" id="userName" value={this.props.userName} onChange={this.props.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Age</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" id="age" value={this.props.age} onChange={this.props.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Location</Form.Label>
                        <Col sm={10}>
                            <input type="text" name="name" list="countries" value={this.props.location} placeholder="Enter your location" id="location" onChange={this.props.handleChange} />
                            <datalist id="countries">
                                {this.props.countries ?
                                    this.props.countries.map(country => {
                                        return (
                                            <option>{country.name}</option>
                                        )
                                    }) : ''}
                            </datalist>
                        </Col>
                    </Form.Group>

                    <Form.Check inline label="Female" id="female" checked={this.props.female} onChange={this.props.toggleGender} />
                    <Form.Check inline label="Male" id="male" checked={this.props.male} onChange={this.props.toggleGender} />

                    <Form.Group as={Row} encType="multipart/form-data">
                        <Form.Label column sm={2}>Avatar</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="file" onChange={this.props.handleChange} id="image"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" id="password" value={this.props.password} onChange={this.props.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                    </Button>
                    </Form.Group>

                </Form>
                <div className="title">
                    <h2>FIND YOUR LOVE</h2>
                </div>
            </div>

        )
    }
}

export default SignUp
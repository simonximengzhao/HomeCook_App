import React, { Component } from 'react';
import { Control, Form, Errors } from 'react-redux-form';
import { Label, Row, Col, Button } from 'reactstrap';
import Password from './Password';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class SignupForm extends Component {

    //Constructors
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.signup(values.username, values.password, values.confirmPassword, values.firstname,
            values.lastname, values.telnum, values.email, values.agree);
        this.props.resetSignupForm(); 
    }

    //Render Method
    render() {
        return(
            <div className="row row-content justify-content-center" id="signup-form">
                <div className="col-10 col-sm-8 col-lg-6">
                    <Form model="signup" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="username" md={3}>Username</Label>
                            <Col md={9}>
                            <Control.text model=".username" id="username" name="username"
                                    placeholder="Username"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{
                                        required: 'Required. ',
                                        maxLength: 'Must be 15 characters or less.'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='password' md={3}>Password</Label>
                            <Col md={9}>
                            <Password model='.password' placeholder='Password' />
                            </Col>
                        </Row>   
                        <Row className="form-group">
                            <Label htmlFor="confirmPassword" md={3}>Confirm Password</Label>
                            <Col md={9}>
                            <Password model='.confirmPassword' placeholder='Confirm Password' />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={3}>First Name</Label>
                            <Col md={9}>
                            <Control.text model=".firstname" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    className="form-control align-self-center"
                                    validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required: 'Required. ',
                                        minLength: 'Must be greater than 1 characters. ',
                                        maxLength: 'Must be 15 characters or less.'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="lastname" md={3}>Last Name</Label>
                            <Col md={9}>
                            <Control.text model=".lastname" id="lastname" name="lastname"
                                    placeholder="Last Name"
                                    className="form-control align-self-center"
                                    validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".lastname"
                                    show="touched"
                                    messages={{
                                        required: 'Required. ',
                                        minLength: 'Must be greater than 1 characters. ',
                                        maxLength: 'Must be 15 characters or less.'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={3}>Phone Number</Label>
                            <Col md={9}>
                            <Control.text model=".telnum" id="telnum" name="telnum"
                                    placeholder="Phone Number"
                                    className="form-control align-self-center"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".telnum"
                                    show="touched"
                                    messages={{
                                        required: 'Required. ',
                                        minLength: 'Must be greater than 2 numbers. ',
                                        maxLength: 'Must be 15 numbers or less. ',
                                        isNumber: 'Must be a number.'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={3}>Email</Label>
                            <Col md={9}>
                            <Control.text model=".email" id="email" name="email"
                                    placeholder="Email"
                                    className="form-control align-self-center"
                                    validators={{
                                        required, validEmail
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required: 'Required. ',
                                        validEmail: 'Invalid Email Address.'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 9, offset: 3}}>
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox model=".agree" name="agree"
                                            className="form-check-input" /> {' '}
                                            <strong>Agree to our <a href='/termsofuse'>Terms of Use</a></strong>
                                    </Label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 6, offset: 3}}>
                                <Button type="submit" color="secondary">
                                    Sign-up
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignupForm
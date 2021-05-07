import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';

class Signup extends Component {

    //Render Method
    render() {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Sign-up</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 mt-3">
                        <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>Sign-up</h3>
                        <hr />
                    </div>
                </div>
                { !this.props.auth.isAuthenticated ?
                    <SignupForm id="feedback-form" signup={this.props.signup} resetSignupForm={this.props.resetSignupForm}  />
                    :
                    <h4 className='mb-5'>You have already signed up.</h4>
                }
                {/* Signup Form */}
            </div>
        );
    }
}

export default Signup
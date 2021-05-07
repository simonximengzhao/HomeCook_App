import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import AboutContent from '../contents/aboutus';
import { baseUrl } from '../shared/baseUrl';

class About extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.fetchFavorites();
    }

    //Render Method
    render() {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 mt-3">
                        <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>About Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    {/* About us contents */}
                    <div className="col-12 col-md-7" >
                        <AboutContent />
                    </div>
                    <div className="col-12 col-md-4 offset-md-1">
                        { !this.props.auth.isAuthenticated ?
                            <p id="content">
                                Get in touch.
                                <br/><br/>
                                Want to say hi, ask a question, or work with us?
                                <br/><br/>
                                Please <a href="/signup">sign-up</a> for a user account and leave us a comment.
                            </p>
                            :
                            <>
                                { this.props.auth.isAdmin==='false' ?
                                    <p id="content">
                                        Get in touch.
                                        <br/><br/>
                                        Want to say hi, ask a question, or work with us?
                                        <br/><br/>
                                        Please leave us a comment from your <a href='/user' onClick={this.handleClick}>user portal</a>.
                                    </p>
                                    :
                                    <p id="content">
                                        Get in touch.
                                        <br/><br/>
                                        Want to say hi, ask a question, or work with us?
                                        <br/><br/>
                                        Please leave us a comment from your <a href="/home" onClick={() => {this.handleClick(); alert('You are an admin, redirecting back to home page.');}}>user portal</a>.
                                    </p>
                                }
                            </>
                        }
                    </div>
    
                    {/* Quotation and image */}
                    <div className="col-12">
                        <Card id='quote'>
                            <CardBody className="bg-faded">
                                <blockquote className="blockquote ml-4 mt-3">
                                    <p style={{fontFamily: "'Libre Baskerville', serif"}} className="mb-0">Cooking is like painting 
                                        or writing a song. Just as there are only so many notes or colors, there are only so many flavors 
                                        - it's how you combine them that sets you apart.</p>
                                    <footer className="blockquote-footer mt-4">Wolfgang Puck</footer>
                                </blockquote>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12" id="about-pic">
                        <img className="img-fluid" src={baseUrl + "/images/PIXNIO-207247-1900x1266.jpg"} alt="about-pic" id="about-pic" />
                    </div>
                </div>
            </div>
        );
    }
}

export default About
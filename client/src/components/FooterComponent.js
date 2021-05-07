import React from 'react';
import { Link } from 'react-router-dom';

//Functional footer element
const Footer = (props) => {

    const scrollToTop = () => {
        window.scrollTo(0,0);
    }

    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-4">
                        <ul className="list-unstyled">
                            { !props.auth.isAuthenticated ?
                                <>
                                <li id="footer-quote">If you like this page, sign-up!</li>
                                <li onClick={scrollToTop} id="footer-list"><Link to="/signup" id="footer-link">Sign-up Here</Link></li>
                                </>
                                :
                                <>
                                    { props.auth.isAdmin === 'false' ?
                                        <>
                                        <li id="footer-quote">If you like this page, don't forget to bookmark it!</li>
                                        <li onClick={() => {scrollToTop(); props.fetchFavorites();}} id="footer-list"><Link to="/user" id="footer-link">User Portal</Link></li>
                                        </>
                                        :
                                        <>
                                        <li id="footer-quote">If you like this page, don't forget to bookmark it!</li>
                                        <li onClick={() => {scrollToTop(); props.fetchFeedback();}} id="footer-list"><Link to="/admin" id="footer-link">Admin Portal</Link></li>
                                        </>
                                    }
                                </>
                            }
                        </ul>
                    </div>
                    <div className="col-12 col-sm-2 offset-sm-4">
                        <ul className="list-unstyled">
                            <li onClick={scrollToTop}><Link to="/home" id="footer-link">Home</Link></li>
                            <li onClick={scrollToTop} id="footer-list"><Link to="/aboutus" id="footer-link">About Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-2">
                        <ul className="list-unstyled">
                            <li onClick={scrollToTop}><Link to="/privacypolicy" id="footer-link">Privacy Policy</Link></li>
                            <li onClick={scrollToTop} id="footer-list"><Link to="/termsofuse" id="footer-link">Terms of Use</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2021 Home Cook</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
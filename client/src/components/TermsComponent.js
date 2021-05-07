import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TermsOfUse from '../contents/terms';

const Terms = (props) => {
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Terms of Use</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12 mt-3">
                    <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>Terms of Use</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                {/* Terms of use content */}
                <div className="col-12 col-md-4">
                    <p id="content">Last updated</p>
                    <p id="content">May 7, 2021</p>
                </div>
                <div className="col-12 col-md-7 offset-md-1">
                    <TermsOfUse />
                </div>
            </div>
        </div>
    );
}

export default Terms;
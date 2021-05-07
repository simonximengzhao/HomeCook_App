import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import EnhancedTable from './CommentsTable';

class Admin extends Component {


    render() {
        // loading comments
        if (this.props.feedbackLoading) {
            return(
                <div className="container">
                    <Loading />
                </div>
            );
        }
        // error occurred
        else if (this.props.feedbackErrMess) {
            return (
                <div className="container mt-3 mb-3">
                    <div className="row">
                        <h4>{this.props.feedbackErrMess}</h4>
                    </div>
                </div>
            );
        }
         // no comments found
        else if (this.props.feedback.length === 0) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Admin Portal</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12 mt-3 mb-3">
                            <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>Admin Portal</h3>
                            <hr />
                            <h4>User comments:</h4>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3 mb-3">
                        <h4>No comments found.</h4>
                    </div>
                </div>
            );
        }
        // display comments in a table
        else {
            console.log(this.props.feedback)

            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Admin Portal</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12 mt-3 mb-3">
                            <h3 style={{fontFamily: "'Libre Baskerville', serif"}}>Admin Portal</h3>
                            <hr />
                            <h4>User comments:</h4>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3 mb-3">
                        <EnhancedTable 
                            feedback={this.props.feedback}
                            deleteFeedback={this.props.deleteFeedback}
                            fetchFeedback={this.props.fetchFeedback} />
                    </div>
                </div>
            );
        }
    }
}

export default Admin;
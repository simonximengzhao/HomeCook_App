import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    //Constructors
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.adminClick = this.adminClick.bind(this);
    }

    //This is used to toggle the navbar for small screens
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    //These are the functions for login/logout
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        console.log(this.props.auth.isAdmin)
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    handleClick() {
        this.props.fetchFavorites();
    }

    adminClick() {
        this.props.fetchFeedback();
    }

    //Render method
    render() {
        return(
            <React.Fragment>
                <Navbar sticky='top' light expand="lg">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand href="/">
                            <h1 id="website-name">Home Cook</h1>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        About Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className='ml-auto'>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <NavLink className='nav-link' to='/signup'>
                                            Sign-up
                                        </NavLink>
                                        :
                                        <>
                                            { this.props.auth.isAdmin === 'false' ?
                                                <NavLink className='nav-link' to='/user' onClick={this.handleClick}>
                                                    {'Hi, ' + this.props.auth.user.username}
                                                </NavLink>
                                                :
                                                <NavLink className='nav-link' to='/admin' onClick={this.adminClick}>
                                                    {'Hi, ' + this.props.auth.user.username}
                                                </NavLink>
                                            }
                                        </>
                                    }
                                </NavItem>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button onClick={this.toggleModal}>
                                            Login
                                            {this.props.auth.isFetching ?
                                                <div className='loader'></div>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <Button onClick={this.handleLogout}>
                                            Logout
                                            {this.props.auth.isFetching ?
                                                <div className='loader'></div>
                                                : null
                                            }
                                        </Button>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username:</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password:</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="secondary" className="mt-4">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}

export default Header;
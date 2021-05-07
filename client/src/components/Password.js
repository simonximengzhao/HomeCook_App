import React, { Component } from 'react';
import { Control, Errors } from 'react-redux-form';
import { Button } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Password extends Component {
    //Constructors
    constructor(props) {
        super(props);

        this.state = {
            hidden: true,
            password: null
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    componentDidMount() {
        if (this.props.password) {
        this.setState({ password: this.props.password });
        }
    }

    render() {
        return (
            <>
                <Control type={this.state.hidden ? "password" : "text"}
                        model={this.props.model} id="password" name="password"
                        placeholder={this.props.placeholder} className="form-control"
                        value={this.state.password} onChange={this.handlePasswordChange}
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                        />
                    <Button onClick={this.toggleShow} id='show-hide' outline>Show / Hide</Button>
                    <Errors
                        className="text-danger"
                        model={this.props.model}
                        show="touched"
                        messages={{
                            required: 'Required. ',
                            minLength: 'Must be greater than 2 characters. ',
                            maxLength: 'Must be 15 characters or less.'
                        }}
                    />
            </>
        );
    }

}

export default Password;
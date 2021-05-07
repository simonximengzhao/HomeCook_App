import React, {Component} from 'react';
import { Button, Row } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const data = require('../shared/ingredient-list.json')

class Ingredients extends Component {

    constructor(props) {
        super(props);
        this.state = {input: ''};
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(value) {
        this.setState({input: value.term});
    }

    onClick() {
        this.props.onUpdate(this.state.input);
    }

    render() {
        return (
            <Row className="mt-5 align-self-center justify-content-center">
                <div>
                    <Autocomplete
                        id="ingredients"
                        options={data}
                        onChange={(event, value) => {
                            if (value != null) {
                                this.onChange(value);
                            }
                        }} // prints the selected value
                        getOptionLabel={(option) => option.term}
                        style={{ width: 350 }}
                        renderInput={(params) => <TextField {...params} label="Find your ingredients" variant="outlined" />}
                    />
                </div>
                <div className="mt-2">
                    <Button type="submit" color="secondary" onClick={this.onClick} className="ml-2">
                        Submit
                    </Button>
                </div>
            </Row>
        );
    }
}

export default Ingredients;
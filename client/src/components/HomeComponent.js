import React, { Component } from 'react';
import Ingredients from './AutoComplete';
import { Button, Card, CardHeader, CardBody, CardImg, Row, CardGroup,Form } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';

const List = ({ items }) => {
    const listItems = items.map((item, index) => <li key={index}>{item.value}</li>);
  
    return (
        <Row className="ingredient-box justify-content-center">
            <Card style={{width: "25rem"}}>
                <CardHeader>
                    <h3 style={{fontFamily: "'Libre Baskerville', serif", textAlign: 'center'}}>Ingredients:</h3>
                </CardHeader>
                <CardBody>
                    <ul className="list-unstyled justify-content-center" style={{fontSize: '20px', textAlign: 'center'}}>{listItems}</ul>
                </CardBody>
                <Button type="reset" style={{fontSize: "25px", backgroundColor: "#00e6e6", border: 'none'}} value='reset'>
                    CLEAR
                </Button>
                <Button type="submit" color="info" style={{fontSize: "25px"}} value='submit'>
                    SEARCH
                </Button>
            </Card>
        </Row>
    );
};

class Home extends Component {

    //Constructors
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            counter: 0
        };

        this.updateList = this.updateList.bind(this);
        this.repCheck = this.repCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    repCheck(value) {
        if (value === '') {
            return false;
        }
        if (this.state.items){
            for (var i=0; i < this.state.counter; i++){
                if (value === this.state.items[i].value){
                    return false;
                }
            }
        }
        return true;
    };

    updateList = (value) =>{
        if (this.state.counter === 10) {
            alert('You can only search up to 10 ingredients each time.')
            return false;
        }
        if (this.repCheck(value)) {
            this.setState({
                items: [
                    {
                        id: 1 + this.state.counter,
                        value: value
                    },
                    ...this.state.items
                ],
                counter: this.state.counter + 1
            });
        }
    }

    handleSubmit = (event) => {
        //Do nothing if there's nothing to search
        if (this.state.counter === 0) {
            alert('You need to search at least one ingredient.');
            event.preventDefault();
        }
        //otherwise, get all the ingredients
        else {
            let ingredients_list = [];
            for (var i=0; i<this.state.counter; i++){
                ingredients_list.push(this.state.items[i].value)
            }
            // convert ingredients from list to string
            let ingredients = ingredients_list.join();
            this.props.searchRecipes(ingredients);
            event.preventDefault();
        }
    }

    handleReset = (event) => {
        //Do nothing if there's nothing to search
        if (this.state.counter === 0) {
            event.preventDefault();
        }
        //Else reset the form
        else {
            this.setState({
                items: [],
                counter: 0
            });
        }
    }

    //Render method
    render() {
        return(
            <>
                <div className="container d-flex h-100">
                    <div className="row align-self-center w-150">
                        <div className="col-10 col-sm-8 mx-auto">
                            <h1 className="web-statement">"Anyone can be a great chef with the right ingredients."</h1>
                            <FadeTransform in 
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                                }}>
                                <h1 className="home-question">What should I make today?</h1>
                            </FadeTransform>
                        </div>
                        <div className="col-10 col-sm-8 mx-auto mb-5">
                            <Ingredients onUpdate={this.updateList} />
                            <hr/>
                            <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                                <List items={this.state.items} />
                            </Form>
                        </div>
                            <h4 className="ml-3">Here's a sneak peek of some sample recipes..</h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-12 col-md m-1">
                            <CardGroup className="mt-2 mb-5">
                                <Card className="mr-2">
                                    <CardImg src={ baseUrl + '/images/pasta.jpg'} alt='pasta' />
                                </Card>
                                <Card>
                                    <CardImg src={ baseUrl + '/images/sushi.jpg'} alt='sushi' />
                                </Card>
                                <Card className="ml-2">
                                    <CardImg src={ baseUrl + '/images/breakfast.jpg'} alt='breakfast' />
                                </Card>
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderDish(dishEntrada) {
    if (dishEntrada != null) {
      return (
        <Card>
          <CardImg
            width="100%"
            src={dishEntrada.image}
            alt={dishEntrada.name}
          />
          <CardBody>
            <CardTitle>
              <h4>{dishEntrada.name}</h4>
            </CardTitle>
            <CardText>{dishEntrada.description}</CardText>
          </CardBody>
        </Card>
      );
    } 
    else {
      return <div></div>;
    }
  }

  render() {
    if(this.props.dish != null){
      const dishActual = this.props.dish;
      const comments = this.props.dish.comments.map((element) =>{
        return(
          <div key={element.id} className="list-unstyled">
            <p>{element.comment}</p>
            <p>--{element.author}, {element.date}</p>
          </div>
        );
      });

      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">{this.renderDish(dishActual)}</div>
          <div className="col-12 col-md-5 m-1"><h4>Comments</h4>{comments}</div>
        </div>  
      );
    }
    else{
      return(
        <div></div>
      );
    } 
  }
}

export default Dishdetail;

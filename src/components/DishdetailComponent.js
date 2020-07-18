import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;



function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div>
        <FadeTransform in 
             transformProps={{
                 exitTransform: 'scale(0.5) translateY(-50%)'
             }}>
          <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>
                <h4>{dish.name}</h4>
              </CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    const commentsActual = comments.map((element) => {
      return (
        <div key={element.id}>
          <Fade in>
          <div className="list-unstyled">
            <p>{element.comment}</p>
            <p>
              --{element.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(element.date)))}
            </p> 
          </div>
          </Fade>
        </div>
      );
    });
    return (
      <div>
        <div>
          <Stagger in>
          {commentsActual}
          </Stagger>
        </div>
        <div>
          <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading></Loading>
        </div> 
      </div>
    );
  }
  else if(props.errMess){
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div> 
      </div>
    );
  }
  else if (props.dish != null && props.comments != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish}></RenderDish>
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            ></RenderComments>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleComment(values) {
    alert("Nuevo Comentario con dishId: " + this.props.dishId + ", rating: " + values.rating + ", author: " + values.name + ", comment: " + values.comment)
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    this.toggleModal();
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleComment(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" sm={12}>
                  Rating
                </Label>
                <Col sm={12}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" sm={12}>
                  Your Name
                </Label>
                <Col sm={12}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  ></Control.text>
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be >= 3 characters",
                      maxLength: "Must be <= 15 characters",
                    }}
                  ></Errors>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" sm={12}>
                  Your Feedback
                </Label>
                <Col sm={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  ></Control.textarea>
                </Col>
              </Row>
              <Button
                color="primary"
                active
                outline
                type="submit"
                value="submit"
              >
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;

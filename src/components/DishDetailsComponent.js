import React, { useState } from "react";
import { Component } from "react";
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
  Col,
  Row,
} from "reactstrap";

import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
// class DishDetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       otherValue: null,
//       dishDetail: null,
//     };
//   }

//   componentDidUpdate() {
//     console.log("this.props ", this.props.dish);
//     const otherInfo = this.props?.dish?.comments.map((val) => {
//       console.log("val ", val);
//       return (
//         <>
//           <p>{val.comment}</p>
//           <p>
//             --{val.author} ,{val.date}
//           </p>
//         </>
//       );
//     });
//     const dishDetails = this.props?.dish;
//     this.setState({
//       otherValue: otherInfo,
//       dishDetail: dishDetails,
//     });
//   }
//   render() {
//     return (
//       <div></div>
//       //   <div key={this.state?.dishDetail?.id} className="col-12   m-1 row">
//       //     <Card key={this.state?.dishDetail?.id} className=" col-md-5 m-1">
//       //       <CardImg
//       //         width="100%"
//       //         src={this.state?.dishDetail?.image}
//       //         alt={this.state?.dishDetail?.name}
//       //       />
//       //       <CardBody>
//       //         <CardTitle>{this.state?.dishDetail?.name}</CardTitle>
//       //         <CardText>{this.state?.dishDetail?.description}</CardText>
//       //       </CardBody>
//       //     </Card>
//       //     <Card className=" col-md-5 m-1">
//       //       <CardTitle>Comment</CardTitle>
//       //       {this.state?.otherValue}
//       //     </Card>
//       //   </div>
//     );
//   }

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5  m-1  ">
      <Card>
        <CardImg top src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      {/* <Card key={dish.dishDetail?.id} className=" col-md-5 m-1">
        <CardImg
          width="100%"
          src={dish.dishDetail?.image}
          alt={dish.dishDetail?.name}
        />
        <CardBody>
          <CardTitle>{dish.dishDetail?.name}</CardTitle>
          <CardText>{dish.dishDetail?.description}</CardText>
        </CardBody>
      </Card> */}
    </div>
  );
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    return (
      <Card className="col-12 col-md-5 m-1">
        <h4>Comment</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}</p>
              </li>
            );
          })}
        </ul>
        <CommentForm
          dishId={dishId}
          addComment={comments.addComment}
        ></CommentForm>
      </Card>
    );
  } else {
    <div></div>;
  }
}
class CommentForm extends Component {
  constructor(props) {
    console.log("props ", props);
    super(props);
    this.toggleModel = this.toggleModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.addComment = this.addComment.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }
  toggleModel() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    this.toggleModel();
    this.props.addComment(this.props.dishId, values);
  }
  render() {
    return (
      <div>
        <button color="primary" onClick={this.toggleModel}>
          Submit Comment
        </button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating"> </Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="Rating"
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
                <Col>
                  <Label htmlFor="author">Author</Label>
                  <Control.text
                    model=".auhor"
                    id="auhor"
                    name="auhor"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    rows="6"
                    model=".Comment"
                    id="Comment"
                    name="Comment"
                    placeholder="Comment"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    if (props.dish != null) {
      return (
        <div class="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            <RenderDish dish={props.dish}></RenderDish>
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            ></RenderComments>
            {/* <SubmitComments></SubmitComments> */}
          </div>
        </div>

        //     <RenderDish dish={props.dish}></RenderDish>
        //  <RenderComments comments={props.dish.comments}></RenderComments>
      );
    } else {
      return <div></div>;
    }
};

export default DishDetail;

{
  /* <button onClick={setModalIsOpenToTrue}>Submit Comment</button>
<Modal isOpen={modalIsOpen}>
  <ModalHeader isOpen={modalIsOpen}>Submit Comment</ModalHeader>
   
  <div className="col-12 col-md-9">
    <LocalForm onSubmit={setModalIsOpenToFalse}>
      <Row className="form-group">
        <Col md={10}>
          <Control.text
            model=".rating"
            id="rating"
            name="rating"
            placeholder="Rating"
            className="form-control"
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={10}>
          <Control.text
            model=".yourname"
            id="yourname"
            name="yourname"
            placeholder="Your Name"
            className="form-control"
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={10}>
          <Control.text
            model=".comment"
            id="comment"
            name="comment"
            placeholder="Comments"
            className="form-control"
          />
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={10}>
          <Button type="submit" color="primary">
            Send Feedback
          </Button>
        </Col>
      </Row>
    </LocalForm>
  </div>
  
</Modal> */
}
{
  /* <Button outline>
  <span className="fa fa-sign-in fa-lg"></span> Submit Comment
</Button> */
}

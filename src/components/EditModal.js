import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameModal: "",
      priceModal: "",
    };
  }

  handleName = (e) => {
    this.setState({
      nameModal: e.target.value,
    });
  };
  
  handlePrice = (e) => {
    this.setState({
      priceModal: e.target.value,
    });
  };

  updateFruit = async (e) => {
    e.preventDefault();

    let DataUpdate = {
      name: this.state.nameModal,
      price: this.state.priceModal,
    };

    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateFruit/${this.props.id}`, DataUpdate);
    this.props.handleClose();
    // document.location.reload(true);
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.handleClose}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Edit Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.updateFruit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fruit Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={this.props.name}
                    onChange={this.handleName}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Fruit Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={this.props.price}
                    onChange={this.handlePrice}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Fruit
                </Button>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  }
}

export default EditModal;

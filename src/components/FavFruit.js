import React from 'react';
import EditModal from './EditModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Row, Col, Button } from "react-bootstrap";

class FavFruit extends React.Component {

constructor(props){
  super(props);

this.state={
  FavData:[],
  showModal:false,
  name:'',
  id:'',
  price:0,
  image:''
}
}

handleShow=(e)=>{
  this.setState({
    showModal:true
  })
}
handleClose=(e)=>{
  this.setState({
    showModal:false
  })
}

componentDidMount= async ()=>{
  const fruits= await axios.get(`${process.env.REACT_APP_BACKEND_URL}/fruit`);

  this.setState({
    FavData:fruits.data
  })
}



  render() {
    console.log(this.state.FavData)
    return(
      <>
        <h1>My Favorite Fruits</h1>
        <Row>
          { this.state.FavData.map((e) => {
            return( <Col>
              <Card style={{width: "12rem", height:"30rem" }}>
                <Card.Img variant="top" src={e.image} />
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Text>Price: {e.price}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => {
                      this.setState({
                        name:e.name,
                        image:e.image,
                        price:e.price,
                        id:e._id
                      });
                      this.handleShow();
                    }}
                  >
                   Edit Fruit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletFruit/${e._id}`)
                    }}
                  >
                  Delete Fruit
                  </Button>
                </Card.Body>
              </Card>
            </Col>)
          })}
        </Row>


<EditModal id={this.state.id} name={this.state.name} price={this.state.price} image={this.state.image} showModal={this.state.showModal} handleClose={this.handleClose}/>
      </>
    )
  }
}

export default FavFruit;

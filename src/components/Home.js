import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Button } from "react-bootstrap";
const axios = require("axios");

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiData: [],
    };
  }

  componentDidMount = async () => {
    const fruits = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getFruit`
    );

     this.setState({
      apiData:fruits.data.fruits,
    });
  };

  addFav = async (e) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addFruit`, e);
  };

  render() {
   console.log(this.state.apiData)

    return (
      <>
        <h1>API Fruits</h1>
        <Row>
          { this.state.apiData.map((e) => {
            return( <Col>
              <Card style={{ width: "12rem", height:"20rem" }}>
                <Card.Img variant="top" src={e.image} />
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Text>Price: {e.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.addFav(e);
                    }}
                  >
                    add To Fav
                  </Button>
                </Card.Body>
              </Card>
            </Col>)
          })}
        </Row>
      </>
    );
  }
}

export default Home;

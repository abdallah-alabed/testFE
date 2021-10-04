import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FavFruit from "./components/FavFruit";
import Home from "./components/Home";
import LoginButton from './components/LoginButton';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log("app",isAuthenticated);

    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              
              {/* TODO: if the user is logged in, render the `Home` component, if they are not, render the `Login` component */}
              {isAuthenticated  ? <Home /> :<LoginButton /> }
            </Route>
            <Route exact path="/favFruit">
             {isAuthenticated  ? <FavFruit /> :<LoginButton /> }
              {/* TODO: if the user is logged in, render the `FavFruit` component, if they are not, render the `Login` component */}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);

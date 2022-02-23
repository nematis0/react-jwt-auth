import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Kereses from "./sajatosztalyok/Kereses";
import Anime from "./sajatosztalyok/Anime";
import Torles from "./sajatosztalyok/Torles";
import Uzenettorles from "./sajatosztalyok/Uzenettorles";
import Animefelvitel from "./sajatosztalyok/Animefelvitel";
import Upload from "./sajatosztalyok/Upload";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Anime World
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Anime">Animék</Nav.Link>
          <Nav.Link href="/Kereses">Keresés</Nav.Link>
          {showAdminBoard && (
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
            
            <NavDropdown.Item href="/Torles">Anime törlés</NavDropdown.Item>
            
            
            
            <NavDropdown.Item href="/Uzenettorles">Üzenet törlés</NavDropdown.Item>
            

            
            <NavDropdown.Item href="/Animefelvitel">Anime felvitel</NavDropdown.Item>
            

            <NavDropdown.Divider />
            
          </NavDropdown>
          )}  
        </Nav>
        <Nav>
        {currentUser ? (
          <Nav className="mr-auto">
          <Nav.Link href="/profile">
            {currentUser.username}
            </Nav.Link>
            <Nav.Link href="/login" onClick={this.logOut}>
            Kijelentkezés
            </Nav.Link>
            </Nav>
          ) : (
            
            <Nav className="mr-auto">
            <Nav.Link href="/login">
            Bejelentkezés
              </Nav.Link>
              <Nav.Link href="/register">
              Regisztráció
              </Nav.Link>
              </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Kereses" component={Kereses}/>
            <Route path="/Anime" component={Anime}/>
            <Route path="/Torles" component={Torles}/>
            <Route path="/Uzenettorles" component={Uzenettorles}/>
            <Route path="/Animefelvitel" component={Animefelvitel}/>
            <Route path="/Upload" component={Upload}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

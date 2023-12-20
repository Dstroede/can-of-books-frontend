import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './Auth/AuthButtons';

class Header extends React.Component {
  render() {
    let linkStyle = {
        color: 'white',
        margin: '1rem'
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link" style={linkStyle}>Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link" style={linkStyle}>About</Link></NavItem>
        <AuthButtons />
        
      </Navbar>
    )
  }
}

export default Header;
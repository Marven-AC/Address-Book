import React, { Component } from 'react';
import './App.css';
import NavbarMenu from './components/Navbar';
import Organizations from './components/Organizations';




class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <NavbarMenu />
        <br/>
        <Organizations />
      </div>
      
    );
  }

}

export default App;

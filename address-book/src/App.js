import React, { Component } from 'react';
import './App.css';
import NavbarMenu from './components/Navbar';
import Organizations from './components/Organizations';
import { ORGA } from './test';



class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      organizations: ORGA
    };
  }

  render() {
    return (
      <div className="container">
        <NavbarMenu />
        <br/>
        <Organizations organizations={this.state.organizations}/>
      </div>
      
    );
  }

}

export default App;

import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card,  CardTitle, CardText } from 'reactstrap';



class Organizations extends Component{
  constructor(props){
    super(props);
    this.state= {
      selectedOrganization: null
    }
  }

  onSelectedOrganization(org){
    this.setState({selectedOrganization: org});
  }

  render(){
    const organizations = this.props.organizations.map((organization) => {
      return(
        <div className="col-12 col-md-5 m-1">
          <Card key={organization.id} 
          onClick={() => this.onSelectedOrganization(organization)}>
            <CardTitle>{organization.name}</CardTitle>
            <CardText>
              <ul>
              <li>{organization.number}</li>
              <li>{organization.address}</li>
              </ul>
              </CardText>
          </Card>

        </div>
      );
    });

    return(
      <div className="container">
        <div className="row">
          {organizations}
        </div>
      </div>
    );
  }
}

export default Organizations;

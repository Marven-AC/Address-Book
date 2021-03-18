import React, { Component } from 'react';
import { Button, CardBody, Card,  CardTitle, CardText } from 'reactstrap';



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

  renderOrganization(organization){
    if(organization != null)
      return(
        <Card>
          <CardBody>
            <CardTitle>{"Employees of " + organization.name}</CardTitle>
            <CardText>{organization.employees[0].name}</CardText>
            <div className="row">
              <div className="col-4"><Button>Update</Button></div>
              <div className="col-4"><Button>Add</Button></div>
              <div className="col-4"><Button>Delete</Button></div>
            </div>
            
          </CardBody>
        </Card>
      );
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
        <div className="row">
          <div className="col-12  m-1">
            {this.renderOrganization(this.state.selectedOrganization)}
          </div>

        </div>
      </div>
    );
  }
}

export default Organizations;

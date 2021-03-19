import React, { Component } from 'react';
import { Button, CardBody, Card,  CardTitle, CardText } from 'reactstrap';
import Employees from './Employees';


class Organizations extends Component{
  constructor(props){
    super(props);
    this.state= {
      selectedOrganization: null,
      organizations: []
    }
  }

  onSelectedOrganization(org){
    this.setState({selectedOrganization: org});
    console.log(org._id);
  }

  componentDidMount(){
    this.refreshOrgs();
  }

  refreshOrgs(){
    fetch('/organizations')
    .then(resp => resp.json())
    .then(data => {
      this.setState({organizations: data});
    })
  }

  renderOrganization(organization){
    if(organization != null){
      if(organization.employees[0] == null){
        return(
          <Card>
          <CardBody>
            <CardTitle>{organization.name + " doesn't have employees yet!"}</CardTitle>
            <div className="row">
              <div className="col-4"><Button>Update</Button></div>
              <div className="col-4"><Button>Add</Button></div>
              <div className="col-4"><Button>Delete</Button></div>
            </div>
          </CardBody>
        </Card>
        );
      }
      return(
        <Card>
          <CardBody>
            <CardTitle>{"Employees at " + organization.name}</CardTitle>
            <CardText>{organization.employees[0].name}</CardText>
            <div className="row">
              <div className="col-4"><Button>Update</Button></div>
              <div className="col-4"><Button>Add</Button></div>
              <div className="col-4"><Button>Delete</Button></div>
              <Employees employees={organization.employees} />
            </div>
            
          </CardBody>
        </Card>
      );
    }
      else{
        return;
      }
  }

  render(){
    const organizations = this.state.organizations.map((organization) => {
      return(
        
          <Card key={organization._id}  className="col-12 col-md-5 m-1"
          onClick={() => this.onSelectedOrganization(organization)}>
            <CardTitle>{organization.name}</CardTitle>
            <ul>
            <CardText> 
              <li>{organization.number}</li>
              <li>{organization.address}</li>   
            </CardText>
            </ul>
          </Card>

       
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

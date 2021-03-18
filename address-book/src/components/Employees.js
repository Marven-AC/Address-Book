import React, { Component } from 'react';
import { Button, CardBody, Card,  CardTitle, CardText } from 'reactstrap';



class Employees extends Component{
  constructor(props){
    super(props);
    this.state= {
      selectedEmployee: null
    }
  }

  onSelectedEmployee(org){
    this.setState({selectedEmployee: org});
  }

 

  render(){
    const employees = this.props.employees.map((employee) => {
      return(
        <div className="col-12 m-1">
          <Card key={employee.id} 
          onClick={() => this.onSelectedEmployee(employee)}>
            <CardTitle>{employee.first_name + " " + employee.last_name}</CardTitle>
            <CardText>
              <ul>
              <li>{employee.number}</li>
              <li>{employee.address}</li>
              <li>{employee.email}</li>
              </ul>
              </CardText>
          </Card>

        </div>
      );
    });

    return(
      <div className="container">
        <div className="row">
          {employees}
        </div>
      </div>
    );
  }
}

export default Employees;

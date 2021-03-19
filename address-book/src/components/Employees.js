import React, { Component } from 'react';
import { Button, CardBody, Card,  CardTitle, CardText } from 'reactstrap';



class Employees extends Component{
  constructor(props){
    super(props);
    this.state= {
      selectedEmployee: null
    }
  }

  onSelectedEmployee(employee){
    this.setState({selectedEmployee: employee});
    console.log(employee._id);
  }

 

  render(){
    const employees = this.props.employees.map((employee) => {
      return(
       
          <Card key={employee._id} className="col-10" 
          onClick={() => this.onSelectedEmployee(employee)}>
            <CardTitle>{employee.first_name + " " + employee.last_name}</CardTitle>
            <ul>
            <CardText>
              
              <li>{employee.number}</li>
              <li>{employee.address}</li>
              <li>{employee.email}</li>
            </CardText>
            </ul>
            <div>
              <Button>Edit</Button>
              <Button className="offset-sm-10">Delete</Button>
            </div>
          </Card>

        
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

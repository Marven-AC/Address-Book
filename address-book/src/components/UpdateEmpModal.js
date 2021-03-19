import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const UpdateEmp = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (event) =>{
    event.preventDefault();
    fetch('/organizations/'+ props.orgId + '/employees/' + props.employee._id, {
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            first_name: event.target.fname.value,
            last_name: event.target.lname.value,
            number: event.target.number.value,
            email: event.target.email.value,
            address: event.target.address.value
        })
    })
    .then(res => res.json())
    .then((result) => {
        alert("Success!");
    },(error) => {
        console.log(props.orgId);
        console.log(error);
        alert('Failed!');
    }
    )
    toggle();
  }

  return (
    <div>
      <Button onClick={toggle}>Edit</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit employee</ModalHeader>
        <ModalBody>
            <Form onSubmit = {handleSubmit}>
            <FormGroup>
                <Label for="fNmae">Firstname</Label>
                <Input type="text" name="fname" id="fName" defaultValue={props.employee.first_name} />
            </FormGroup>
            <FormGroup>
                <Label for="lNmae">Last name</Label>
                <Input type="text" name="lname" id="lName" defaultValue={props.employee.last_name} />
            </FormGroup>
            <FormGroup>
                <Label for="orgNumber">Number</Label>
                <Input type="text" name="number" id="orgNumber" defaultValue={props.employee.number} />
            </FormGroup>
            <FormGroup>
                <Label for="orgAddress">Address</Label>
                <Input type="text" name="address" id="orgAddress" defaultValue={props.employee.address} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email" defaultValue={props.employee.email} />
            </FormGroup>
            <FormGroup>
                
                <Input type="submit" value="submit" />
            </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UpdateEmp;
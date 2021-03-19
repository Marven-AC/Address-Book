import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const AddEmp = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (event) =>{
    event.preventDefault();
    fetch('/organizations/'+ props.organization._id + '/employees', {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            first_name: event.target.fName.value,
            last_name: event.target.lName.value,
            number: event.target.number.value,
            email: event.target.email.value,
            address: event.target.address.value
        })
    })
    .then(res => res.json())
    .then((result) => {
        alert("Success!");
    },(error) => {
        console.log(event.target.fName.value);
        console.log(error);
        alert('Failed!');
    }
    )
    toggle();
  }

  return (
    <div>
      <Button  onClick={toggle}>Add employee</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add employee</ModalHeader>
        <ModalBody>
            <Form onSubmit = {handleSubmit}>
            <FormGroup>
                <Label for="fName">First name</Label>
                <Input type="text" name="fname" id="fName"  />
            </FormGroup>
            <FormGroup>
                <Label for="lName">Last name</Label>
                <Input type="text" name="lname" id="lName"  />
            </FormGroup>
            <FormGroup>
                <Label for="empNumber">Number</Label>
                <Input type="text" name="number" id="empNumber"  />
            </FormGroup>
            <FormGroup>
                <Label for="empAddress">Address</Label>
                <Input type="text" name="address" id="empAddress"  />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email"  />
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

export default AddEmp;
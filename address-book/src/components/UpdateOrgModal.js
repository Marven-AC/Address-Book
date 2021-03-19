import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const UpdateOrg = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (event) =>{
    event.preventDefault();
    fetch('/organizations/'+ props.organization._id, {
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name: event.target.orgName.value,
            number: event.target.number.value,
            address: event.target.address.value
        })
    })
    .then(res => res.json())
    .then((result) => {
        alert("Success!");
    },(error) => {
        
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
        <ModalHeader toggle={toggle}>Edit organization {props.organization._id}</ModalHeader>
        <ModalBody>
            <Form onSubmit = {handleSubmit}>
            <FormGroup>
                <Label for="orgName">Name</Label>
                <Input type="text" name="name" id="orgName" defaultValue={props.organization.name} />
            </FormGroup>
            <FormGroup>
                <Label for="orgNumber">Number</Label>
                <Input type="text" name="number" id="orgNumber" defaultValue={props.organization.number} />
            </FormGroup>
            <FormGroup>
                <Label for="orgAddress">Address</Label>
                <Input type="text" name="address" id="orgAddress" defaultValue={props.organization.address} />
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

export default UpdateOrg;
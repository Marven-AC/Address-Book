import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const AddOrg = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(event);
    alert(event.target.orgName.value + " " + event.target.number.value + " " + event.target.address.value);
    toggle();
  }

  return (
    <div>
      <Button  onClick={toggle}>Add organization</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add organization</ModalHeader>
        <ModalBody>
            <Form onSubmit = {handleSubmit}>
            <FormGroup>
                <Label for="orgName">Name</Label>
                <Input type="text" name="name" id="orgName"  />
            </FormGroup>
            <FormGroup>
                <Label for="orgNumber">Number</Label>
                <Input type="text" name="number" id="orgNumber"  />
            </FormGroup>
            <FormGroup>
                <Label for="orgAddress">Address</Label>
                <Input type="text" name="address" id="orgAddress"  />
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

export default AddOrg;
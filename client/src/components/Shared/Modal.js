import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function FormModal(props) {
    const [newName, setNewName] = useState();
    const [newAge, setNewAge] = useState();

    const handleSubmit = (e) => {
        updateUser();
        //e.preventDefault();
    }

    const updateUser = () => {
        let name  = (newName === undefined) ?  props.user.name : newName;
        let age  = (newAge === undefined) ?  props.user.age : newAge;
        axios.patch('/users',{ id : props.user.id, name : name, age : age}).then((response) => {
            alert('Update successful')
        }).catch(error => {
            console.error('Error', error);
        });
    }

    return (
        <>
            <Modal show={props.isHidden} onHide={props.onClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>User management</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" defaultValue={props.user.name} onChange={(e) => setNewName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Enter age" defaultValue={props.user.age} onChange={(e) => setNewAge(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit"  >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onClose}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default FormModal;
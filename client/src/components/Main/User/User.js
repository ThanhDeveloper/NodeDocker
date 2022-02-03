import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import axios from "axios";
import FormModal from '../../Shared/Modal'

function User() {
    const newUser = {
        name: 'user X',
        age: 22
    }

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const hideModel = () => {
        setShowModal(false); 
    }

    useEffect(() => {
        axios.get('/users').then((response) => {
            setUsers(response.data)
        }).catch(error => {
            console.error('Error', error);
        });
    }, [])

    const addUser = () => {
        axios.post('/users', newUser).then((response) => {
            const newList = users.concat(response.data);
            setUsers(newList);
            alert('Add successful')
        }).catch(error => {
            console.error('Error', error);
        });
    }

    const openModalUser = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    }

    const deleteUser = (id) => {
        axios.delete(`/users/${id}`)
            .then((response) => {
                setUsers(users.filter(user => user.id !== id));
                alert('Delete successful')
            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    return (
        <>
            <FormModal isHidden={showModal} onClose={hideModel} user= {currentUser} />
            <Button variant="primary" onClick={() => addUser()} >Add</Button>
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>
                                <Button variant="primary" onClick={() => openModalUser(user)}>Update</Button>
                                <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default User;
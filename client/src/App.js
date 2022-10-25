import './App.css';
import data from './fakedata.json';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '2% 0' }}>
        Welcome to DPS (Deal Processing System)
      </h1>
      <div>
        <Button
          style={{ position: 'absolute', right: '6%', top: '5%' }}
          onClick={handleShow}
        >
          Create New Deal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Creat New Deal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control />
            </InputGroup>
            <Form.Select className="mb-3">
              <option>Select a Relationship Manager for your deal</option>
              <option value="Davin Reid">Davin Reid</option>
              <option value="Nina Goldfarb">Nina Goldfarb</option>
            </Form.Select>
            <InputGroup>
              <Form.Control />
              <InputGroup.Text>Deal Amount</InputGroup.Text>
            </InputGroup>
          </Modal.Body>
        </Modal>
        <Table striped bordered hover style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Deal ID</th>
              <th>Name</th>
              <th>Relationship Manager</th>
              <th>Deal Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.deals.map((deal) => {
              return (
                <tr>
                  <td>{deal.id}</td>
                  <td>{deal.name}</td>
                  <td>{deal.relationshipManager}</td>
                  <td>{deal.dealAmount}</td>
                  <td>
                    <Button variant="danger">Edit Deal</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;

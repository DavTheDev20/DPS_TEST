import './App.css';
import data from './fakedata.json';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2%' }}>
        Welcome to DPS (Deal Processing System)
      </h1>
      <div>
        <Button
          style={{ position: 'absolute', right: '6%', top: '2.5%' }}
          onClick={handleShow}
        >
          Create New Deal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
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
